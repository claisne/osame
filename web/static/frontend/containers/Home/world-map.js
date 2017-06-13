
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './world-map.css';

import * as d3Request from 'd3-request';
import * as d3Geo from 'd3-geo';
import * as d3Timer from 'd3-timer';
import topojson from 'topojson';

class WorldMap extends React.Component {
  componentDidMount() {
    const radius = 200;
    const canvas = this.refs.canvas;
    const velocity = 0.01;

    const projection = d3Geo.geoOrthographic()
      .scale(radius - 2)
      .translate([radius, radius])
      .clipAngle(90)
      .precision(0);

    const path = d3Geo.geoPath()
      .projection(projection);

    d3Request.json('/raw/world.json', (error, world) => {
      if (error != null) return;
      const land = topojson.feature(world, world.objects.land);
      const globe = { type: 'Sphere' };

      const then = Date.now();

      d3Timer.timer(() => {
        const angle = velocity * (Date.now() - then);
        const context = canvas.getContext('2d');

        projection.rotate([angle, 0, 0]);

        context.clearRect(0, 0, radius * 2, radius * 2);

        context.beginPath();
        path.context(context)(land);
        context.fill();

        context.beginPath();
        path(globe);
        context.stroke();
      });
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <canvas ref="canvas" width="400" height="400" styleName="canvas" />
    );
  }
}

export default CSSModules(WorldMap, styles);

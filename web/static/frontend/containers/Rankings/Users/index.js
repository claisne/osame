
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

import Card from './card';

const Users = () =>
	<section styleName="content">
		<Card />
	</section>;

export default CSSModules(Users, styles);


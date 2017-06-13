
import _ from 'lodash';
import createReducer from '../utils/createReducer';

import * as CountriesConstants from '../constants/countries';

const initialState = {
};

export default createReducer(initialState, {
  [CountriesConstants.SET](state, action) {
    return _.keyBy(action.countries, 'id');
  },
});


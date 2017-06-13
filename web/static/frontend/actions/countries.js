
import * as types from '../constants/countries';

export function set(countries) {
  return { type: types.SET, countries };
}

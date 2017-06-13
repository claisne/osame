
import * as FetchUtils from '../utils/fetch';
import * as CountriesActions from './countries';
import * as AccountActions from './account';

export function load(callback) {
  return (dispatch, getState) => {
    const state = getState();
    const requests = [];

    const countryRequest = FetchUtils.fetchJson('/api/countries')
      .then(data => dispatch(CountriesActions.set(data.countries)));

    requests.push(countryRequest);

    if (state.auth.authenticated === true) {
      const userRequest = FetchUtils.fetchAuthenticated('/api/users/me', state.auth.jwt)
        .then(data => dispatch(AccountActions.setUser(data.user)))
        .catch(() => dispatch(AccountActions.unauthorized()));

      requests.push(userRequest);
    }

    Promise.all(requests).then(() => callback());
  };
}

export function loadCountries() {
}

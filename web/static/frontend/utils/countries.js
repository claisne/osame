
import _ from 'lodash';

export function sort(countries, count = -1) {
  const countriesSorted = _.chain(countries)
    .values()
    .orderBy(['elo', 'usersCount', 'name'], ['desc', 'desc', 'asc'])
    .value();

  if (count !== -1) {
    return _.take(countriesSorted, count);
  }

  return countriesSorted;
}

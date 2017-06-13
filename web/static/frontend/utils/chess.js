
import _ from 'lodash';

export const ranks = _.range(1, 9);
export const files = 'abcdefgh'.split('');

export const rankToIndex = (rank) => _.indexOf(ranks, rank);
export const fileToIndex = (file) => _.indexOf(files, file);

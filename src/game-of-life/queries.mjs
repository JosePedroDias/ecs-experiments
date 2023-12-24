import { defineQuery } from '../../vendor/bitecs/index.mjs';

import { Position, Conway } from './components.mjs';

export const positionQuery       = defineQuery([Position]);
export const conwayQuery         = defineQuery([Conway]);
export const positionConwayQuery = defineQuery([Position, Conway]);

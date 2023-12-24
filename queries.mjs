import { defineQuery } from 'https://cdn.jsdelivr.net/npm/bitecs@0.3.40/+esm';

import { Position, Conway } from './components.mjs';

export const positionQuery       = defineQuery([Position]);
export const conwayQuery         = defineQuery([Conway]);
export const positionConwayQuery = defineQuery([Position, Conway]);

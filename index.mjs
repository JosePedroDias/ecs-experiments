import {
    createWorld,
    addEntity,
    addComponent,
    pipe,
} from 'https://cdn.jsdelivr.net/npm/bitecs@0.3.40/+esm';

import { Canvas } from './res-canvas.mjs';

import { Position } from './components.mjs';

import { conwaySystem    } from './sys-conway.mjs';
import { renderingSystem } from './sys-rendering.mjs';
import { timeSystem      } from './sys-time.mjs';

const canvas = new Canvas([32, 32], 16);

const pipeline = pipe(renderingSystem, conwaySystem, timeSystem);

const world = createWorld();

// resources: canvas and time
world.canvas = canvas;

world.time = {
    generation: 0,
};

const eid = addEntity(world);
addComponent(world, Position, eid);

setInterval(() => {
    pipeline(world);
}, 100);

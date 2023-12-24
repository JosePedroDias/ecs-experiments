import {
    createWorld,
    addEntity,
    addComponent,
    pipe,
    //defineSerializer,
    //defineDeserializer,
} from 'https://cdn.jsdelivr.net/npm/bitecs@0.3.40/+esm';

import { Canvas } from './res-canvas.mjs';

import { wrap } from './utils.mjs';

import { Position, Conway } from './components.mjs';

import { positionConwayQuery } from './queries.mjs';

import { conwaySystem    } from './sys-conway.mjs';
import { renderingSystem } from './sys-rendering.mjs';
import { timeSystem      } from './sys-time.mjs';

const ZOOM = 16;
const L = 32;

// setup the pipeline of systems

const pipeline = pipe(conwaySystem, renderingSystem, timeSystem);

// create world and its resources

const world = createWorld();

world.canvas = new Canvas([L, L], ZOOM);

world.time = {
    generation: 0,
};

// const serialize = defineSerializer(world);
// const deserialize = defineDeserializer(world);

// helper game functions

function addCell(world, x, y, isAlive) {
    const eid = addEntity(world);
    addComponent(world, Position, eid);
    addComponent(world, Conway,   eid);
    Position.x[eid] = x;
    Position.y[eid] = y;
    Conway.alive[eid] = isAlive ? 1 : 0;
    // postpone neighbor calculation...
}

function findNeighbor(world, x, y, dx, dy) {
    const x1 = wrap(x + dx, L); // with wrap around
    const y1 = wrap(y + dy, L);
    const entities = positionConwayQuery(world);
    for (const eid of entities)
        if (Position.x[eid] === x1 && Position.y[eid] === y1) return eid;
}

function setCellNeighbors() {
    const entities = positionConwayQuery(world);
    for (const eid of entities) {
        const x = Position.x[eid];
        const y = Position.y[eid];
        Conway.neighbors[eid].set([
            findNeighbor(world, x, y, -1, -1),
            findNeighbor(world, x, y, -1,  0),
            findNeighbor(world, x, y, -1,  1),
            findNeighbor(world, x, y,  0, -1),
            findNeighbor(world, x, y,  0,  1),
            findNeighbor(world, x, y,  1, -1),
            findNeighbor(world, x, y,  1,  0),
            findNeighbor(world, x, y,  1,  1),
        ]);
        // console.log([x, y], Conway.neighbors[eid]);
    }
}

// bootstrap the world start entities

//const lookup = new Set(['0,0', '1,0', '0,1', '1,1']); // block
//const lookup = new Set(['0,1', '1,1', '2,1']); // blinker (period 2)
//const lookup = new Set(['0,0', '1,0', '0,1', '1,1', '2,2', '3,2', '2,3', '3,3']); // beacon (period 2)
//const lookup = new Set(['1,0', '2,0', '0,1', '1,1', '1,2']); // r-pentomino
const lookup = new Set(['2,0', '0,1', '2,1', '1,2', '2,2']); // glider

for (let y = 0; y < L; ++y) {
    for (let x = 0; x < L; ++x) {
        addCell(world, x, y, lookup.has(`${x},${y}`));
    }
}
setCellNeighbors();

// const packet = serialize(world); console.log(packet);

// go!

//console.log('go')

setInterval(() => {
    pipeline(world);
}, 100);

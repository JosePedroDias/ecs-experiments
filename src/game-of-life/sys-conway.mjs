import { Conway } from './components.mjs';
import { conwayQuery } from './queries.mjs';

/*
    1. live cell with < 2    live neighbors dies, as if by under-population
    2. live cell with [2, 3] live neighbors lives on to the next generation
    3. live cell with > 3    live neighbors dies, as if by overpopulation
    4. dead cell with == 3 neighbors becomes a live cell, as if by reproduction
*/

export const conwaySystem = (world) => {
    const entities = conwayQuery(world);
    for (const eid of entities) {
        const amIAlive = Conway.alive[eid];
        const neighbors = Array.from(Conway.neighbors[eid]);
        const livenessOfNeighbors = neighbors.map((eid2) => Conway.alive[eid2]);
        const numNeighborsAlive = livenessOfNeighbors.reduce((prev, curr) => prev + curr, 0);
        // console.log(`eid: ${eid} amIAlive: ${amIAlive} numNeighborsAlive: ${numNeighborsAlive}`);
        if (amIAlive) {
            if (numNeighborsAlive < 2 || numNeighborsAlive > 3) {
                Conway.nextAlive[eid] = 0; // console.log(`~> ${eid} died`);
            } else {
                Conway.nextAlive[eid] = amIAlive;
            }
        } else {
            if (numNeighborsAlive === 3) {
                Conway.nextAlive[eid] = 1; // console.log(`~> ${eid} became alive`);
            } else {
                Conway.nextAlive[eid] = amIAlive;
            }
        }
    }
    return world;
};

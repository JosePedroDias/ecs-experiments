import { positionQuery } from './queries.mjs';

export const conwaySystem = (world) => {
    const entities = positionQuery(world);
    for (const eid of entities) {
        //Position.x[eid] += delta * Velocity.x[eid];
        //Position.y[eid] += delta * Velocity.y[eid];
    }
    return world;
};

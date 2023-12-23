import { Position } from './components.mjs';
import { positionQuery } from './queries.mjs';

export const renderingSystem = (world) => {
    const { canvas } = world;
    const entities = positionQuery(world);
    canvas.clear();
    for (const eid of entities) {
        //console.log(`${eid} pos:[${Position.x[eid]}, ${Position.y[eid]}]`);
        canvas.setPixel([Position.x[eid], Position.y[eid]]);
    }
    return world;
}

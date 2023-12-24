import { Position, Conway } from './components.mjs';
import { positionConwayQuery } from './queries.mjs';

export const renderingSystem = (world) => {
    const { canvas } = world;
    const entities = positionConwayQuery(world);
    //canvas.clear();
    for (const eid of entities) {
        //console.log(`${eid} pos:[${Position.x[eid]}, ${Position.y[eid]}]`);
        // promote next alive...
        const isAlive = Conway.nextAlive[eid];
        Conway.alive[eid] = Conway.nextAlive[eid];
        canvas.setPixel(Position.x[eid], Position.y[eid], isAlive);
    }
    return world;
}

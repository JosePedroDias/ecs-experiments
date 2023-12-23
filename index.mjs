import {
    createWorld,
    Types,
    defineComponent,
    defineQuery,
    addEntity,
    addComponent,
    pipe,
} from 'https://cdn.jsdelivr.net/npm/bitecs@0.3.40/+esm';

const Vector3 = {
    x: Types.f32,
    y: Types.f32,
    z: Types.f32,
};

const Position = defineComponent(Vector3);
const Velocity = defineComponent(Vector3);

const movementQuery = defineQuery([Position, Velocity]);
const positionQuery = defineQuery([Position]);

const movementSystem = (world) => {
    const { time: { delta } } = world;
    const entities = movementQuery(world);
    for (const eid of entities) {
        Position.x[eid] += delta * Velocity.x[eid];
        Position.y[eid] += delta * Velocity.y[eid];
        Position.z[eid] += delta * Velocity.z[eid];
    }
    return world;
}

const timeSystem = (world) => {
    const { time } = world;
    const now = performance.now();
    const delta = now - time.then;
    time.delta = delta;
    time.elapsed += delta;
    time.then = now;
    return world;
};

const renderingSystem = (world) => {
    const entities = positionQuery(world);
    for (const eid of entities) {
        // console.log(Position.x[eid], Position.y[eid], Position.z[eid]);
    }
    return world;
}

const pipeline = pipe(movementSystem, renderingSystem, timeSystem);

const world = createWorld();

world.time = {
    delta: 0,
    elapsed: 0,
    then: performance.now(),
};

const eid = addEntity(world);
addComponent(world, Position, eid);
addComponent(world, Velocity, eid);
Velocity.x[eid] = 1.23;
Velocity.y[eid] = 1.23;

setInterval(() => {
    pipeline(world);
}, 16);

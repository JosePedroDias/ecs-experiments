export const timeSystem = (world) => {
    const { time } = world;
    ++time.generation;
    // console.log(time.generation);
    return world;
};

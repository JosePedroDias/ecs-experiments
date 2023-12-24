import {
    Types,
    defineComponent,
} from '../../vendor/bitecs/index.mjs';

////

export const Vector2i = {
    x: Types.ui32,
    y: Types.ui32,
};

export const Position = defineComponent(Vector2i);
export const Conway = defineComponent({
    alive:     Types.ui32,     // 0=dead, 1=alive
    nextAlive: Types.ui32,     // 0=dead, 1=alive
    neighbors: [Types.f32, 8], // tl t tr l r bl b br
});

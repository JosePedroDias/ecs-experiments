import {
    Types,
    defineComponent,
} from 'https://cdn.jsdelivr.net/npm/bitecs@0.3.40/+esm';

export const Vector2i = {
    x: Types.i32,
    y: Types.i32,
};

////

export const Position = defineComponent(Vector2i);

import { test } from 'node:test';
import { equal } from 'node:assert/strict';

import { wrap } from './utils.mjs';

test('wrap inside span', (_t) => {
    equal(wrap( 0, 5), 0);
    equal(wrap( 1, 5), 1);
    equal(wrap( 2, 5), 2);
    equal(wrap( 3, 5), 3);
    equal(wrap( 4, 5), 4);
});

test('wrap outside span', (_t) => {
    equal(wrap(-2, 5), 3);
    equal(wrap(-1, 5), 4);
    equal(wrap( 5, 5), 0);
    equal(wrap( 6, 5), 1);
});

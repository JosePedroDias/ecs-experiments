export function wrap(n, max) {
    if (n < 0)    return n + max;
    if (n >= max) return n - max;
    return n;
}

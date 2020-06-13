export function assertFunction(v, name) {
  if (typeof v !== 'function') {
    throw new Error(`${name || ''} must be a function`.trimLeft());
  }
}

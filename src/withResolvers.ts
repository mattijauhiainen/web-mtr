export function withResolvers<VALUE = void>() {
  let resolve: (value: VALUE) => void = () => {};
  let reject: (value: VALUE) => void = () => {};
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return { resolve, reject, promise };
}

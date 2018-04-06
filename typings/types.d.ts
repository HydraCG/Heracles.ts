declare namespace jasmine {
  interface Matchers<T> {
    toBeLike(expected: Object | Array<Object>): boolean;
    toHaveBeenCalledOnce(): boolean;
  }
}

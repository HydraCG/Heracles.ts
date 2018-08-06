/* tslint:disable:interface-name */
/* tslint:disable:no-namespace */
declare namespace jasmine {
  interface Matchers<T> {
    toBeLike(expected: object | object[]): boolean;
    toHaveBeenCalledOnce(): boolean;
    toHaveBeenCalledTwice(): boolean;
    toHaveBeenCalledThrice(): boolean;
  }
}

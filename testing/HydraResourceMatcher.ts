import "jasmine";

export default class HydraResourceMatcher {
  public compare: (actual: Iterable<object>, expected: Iterable<object>) => jasmine.CustomMatcherResult;

  public constructor() {
    this.compare = this.compareInternal.bind(this);
  }

  private compareInternal(actual: Iterable<object>, expected: Iterable<object>): jasmine.CustomMatcherResult {
    const result = {
      message: "",
      pass: true
    };

    this.compareAny(actual, expected, "", result, []);
    return result;
  }

  private compareAny(
    actual: any,
    expected: any,
    path: string,
    result: jasmine.CustomMatcherResult,
    visited: object[]
  ): void {
    if ((!!actual && !expected) || (!actual && !!expected)) {
      result.pass = false;
      result.message = `Expected ${actual} to be ${expected} at ${path}.`;
      return;
    }

    if ((actual === null && expected === null) || (actual === undefined && expected === undefined)) {
      result.pass = true;
      return;
    }

    if ((actual === null && expected === undefined) || (actual === undefined && expected === null)) {
      result.pass = false;
      result.message = `Expected ${actual} to be ${expected} at ${path}.`;
      return;
    }

    if (actual[Symbol.iterator] && typeof actual !== "string") {
      return this.compareIterable(actual, expected, path, result, visited);
    }

    if (["string", "number", "boolean"].indexOf(typeof actual) === -1) {
      return this.compareObject(actual, expected, path, result, visited);
    }

    return this.compareLiteral(actual, expected, path, result);
  }

  private compareIterable(
    actual: Iterable<object>,
    expected: Iterable<object>,
    path: string,
    result: jasmine.CustomMatcherResult,
    visited: object[]
  ): void {
    if (visited.indexOf(actual) !== -1) {
      return;
    }

    visited.push(actual);
    if (actual[Symbol.iterator] && !expected[Symbol.iterator]) {
      result.pass = false;
      result.message = `Expected ${actual} not to have an iterator as ${expected} at ${path}.`;
      return;
    }

    if (!actual[Symbol.iterator] && expected[Symbol.iterator]) {
      result.pass = false;
      result.message = `Expected ${actual} to have an iterator as ${expected} at ${path}.`;
      return;
    }

    if (actual instanceof Array && expected instanceof Array && actual.length !== expected.length) {
      result.pass = false;
      result.message = `Expected ${path} to have length of ${expected.length}, but ${actual.length} was present.`;
      return;
    }

    const actualArray = actual instanceof Array ? actual : [...actual];
    const expectedArray = expected instanceof Array ? expected : [...expected];
    for (let index = 0; index < actualArray.length; index++) {
      const actualItem = actualArray[index];
      const expectedItem = expectedArray[index];
      this.compareAny(actualItem, expectedItem, `${path}[${index}]`, result, visited);
      if (!result.pass) {
        return;
      }
    }
  }

  private compareObject(
    actual: object,
    expected: any,
    path: string,
    result: jasmine.CustomMatcherResult,
    visited: object[]
  ): void {
    if (visited.indexOf(actual) !== -1) {
      return;
    }

    visited.push(actual);
    if (expected.asymmetricMatch) {
      result.pass = expected.asymmetricMatch(actual);
      result.message = `Expected ${actual} to be ${expected.jasmineToString()} at ${path}.`;
      return;
    }

    if (typeof actual === "object" && typeof expected !== "object") {
      result.pass = false;
      result.message = `Expected ${actual} not to be an object like ${expected} at ${path}.`;
      return;
    }

    if (typeof actual !== "object" && typeof expected === "object") {
      result.pass = false;
      result.message = `Expected ${actual} to be an object like ${expected} at ${path}.`;
      return;
    }

    for (const property of Object.keys(actual)) {
      if (
        property === "@id" &&
        (typeof actual[property] === "string" &&
          actual[property].indexOf("_:") === 0 &&
          (typeof expected[property] === "string" && expected[property].indexOf("_:") === 0))
      ) {
        continue;
      }

      this.compareAny(actual[property], expected[property], `${path}.${property}`, result, visited);
      if (!result.pass) {
        return;
      }
    }
  }

  private compareLiteral(
    actual: string | number | boolean,
    expected: string | number | boolean,
    path: string,
    result: jasmine.CustomMatcherResult
  ): void {
    if (typeof actual === "function" || typeof expected === "function") {
      return;
    }

    if (actual !== expected) {
      result.pass = false;
      result.message = `Expected ${actual} to be ${expected} at ${path}.`;
    }
  }
}

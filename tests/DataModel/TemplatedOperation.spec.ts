import ResourceFilterableCollection from "../../src/DataModel/Collections/ResourceFilterableCollection";
import TypesCollection from "../../src/DataModel/Collections/TypesCollection";
import { IClass } from "../../src/DataModel/IClass";
import TemplatedOperation from "../../src/DataModel/TemplatedOperation";
import { hydra } from "../../src/namespaces";
import HydraResourceMatcher from "../../testing/HydraResourceMatcher";

describe("Given instance of the TemplatedOperation", () => {
  beforeEach(() => {
    jasmine.addMatchers({ toBeLike: () => new HydraResourceMatcher() });
    this.template = {
      template: "some-uri{?with_variable}"
    };
    this.originalOperation = {
      baseUrl: "http://temp.uri/",
      expects: new ResourceFilterableCollection<IClass>(),
      method: "GET",
      target: { iri: "test-url" },
      type: new TypesCollection(["http://schema.org/AddAction", hydra.Operation])
    };
    this.operation = new TemplatedOperation(this.originalOperation, this.template);
  });

  describe("when expanding URI with variable values", () => {
    beforeEach(() => {
      this.result = this.operation.expandTarget({ with_variable: "test-value" });
    });

    it("should provide an expanded URL", () => {
      expect(this.result.target).toBeLike({ iri: "http://temp.uri/some-uri?with_variable=test-value", type: [] });
    });

    it("should pass a correct method", () => {
      expect(this.result.method).toBe(this.originalOperation.method);
    });

    it("should copy original operation's types", () => {
      expect([...this.result.type]).toEqual(["http://schema.org/AddAction", hydra.Operation]);
    });
  });
});

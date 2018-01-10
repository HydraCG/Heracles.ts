import ResourceFilterableCollection from "../../src/DataModel/Collections/ResourceFilterableCollection";
import { IClass } from "../../src/DataModel/IClass";
import TemplatedOperation from "../../src/DataModel/TemplatedOperation";
import { hydra } from "../../src/namespaces";

describe("Given instance of the TemplatedOperation", () => {
  beforeEach(() => {
    this.template = {
      template: "some-uri{?with-variable}"
    };
    this.originalOperation = {
      baseUrl: "http://temp.uri/",
      expects: new ResourceFilterableCollection<IClass>([]),
      method: "GET",
      target: { iri: "test-url" },
      type: ["http://schema.org/AddAction", hydra.Operation]
    };
    this.operation = new TemplatedOperation(this.originalOperation, this.template);
  });

  describe("when expanding URI with variable values", () => {
    beforeEach(() => {
      this.result = this.operation.expandTarget({ "with-variable": "test-value" });
    });

    it("should provide an expanded URL", () => {
      expect(this.result.target).toEqual({ iri: "http://temp.uri/some-uri?with-variable=test-value", type: [] });
    });

    it("should pass a correct method", () => {
      expect(this.result.method).toBe(this.originalOperation.method);
    });

    it("should copy original operation's types", () => {
      expect(this.result.type).toEqual(["http://schema.org/AddAction", hydra.Operation]);
    });
  });
});

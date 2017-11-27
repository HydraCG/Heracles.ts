import TypedResourceFilteredCollection from "../../src/DataModel/Collections/TypedResourceFilterableCollection";
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
      expects: new TypedResourceFilteredCollection<IClass>([]),
      is: ["http://schema.org/AddAction", hydra.Operation],
      method: "GET",
      target: "test-url"
    };
    this.operation = new TemplatedOperation(this.originalOperation, this.template);
  });

  describe("when expanding URI with variable values", () => {
    beforeEach(() => {
      this.result = this.operation.expandTarget({ "with-variable": "test-value" });
    });

    it("should provide an expanded URL", () => {
      expect(this.result.target).toBe("http://temp.uri/some-uri?with-variable=test-value");
    });

    it("should pass a correct method", () => {
      expect(this.result.method).toBe(this.originalOperation.method);
    });

    it("should copy original operation's types", () => {
      expect(this.result.is).toEqual(["http://schema.org/AddAction", hydra.Operation]);
    });
  });
});

import * as sinon from "sinon";
import HeadersCollection from "../../src/DataModel/Collections/HeadersCollection";
import ResourceFilterableCollection from "../../src/DataModel/Collections/ResourceFilterableCollection";
import { IClass } from "../../src/DataModel/IClass";
import TemplatedOperation from "../../src/DataModel/TemplatedOperation";
import { hydra } from "../../src/namespaces";
import HydraResourceMatcher from "../../testing/HydraResourceMatcher";
/* tslint:disable:no-var-requires */
require("jasmine-sinon");

describe("Given instance of the TemplatedOperation", () => {
  beforeEach(() => {
    jasmine.addMatchers({ toBeLike: () => new HydraResourceMatcher() });
    this.template = { template: "some-uri{?with-variable}" };
    this.header = { name: "TEST", expand: sinon.stub().returns({ name: "TEST", value: "test" }) };
    this.originalOperation = {
      baseUrl: "http://temp.uri/",
      expectedHeaders: new HeadersCollection([this.header]),
      expects: new ResourceFilterableCollection<IClass>([]),
      method: "GET",
      returnedHeaders: new Array<string>(),
      returns: new ResourceFilterableCollection<IClass>([]),
      target: { iri: "test-url" },
      type: ["http://schema.org/AddAction", hydra.Operation]
    };
    this.operation = new TemplatedOperation(this.originalOperation, this.template);
  });

  describe("when expanding URI with variable values", () => {
    beforeEach(() => {
      this.result = this.operation.expand({ "with-variable": "test-value" });
    });

    it("should provide an expanded URL", () => {
      expect(this.result.target).toBeLike({ iri: "http://temp.uri/some-uri?with-variable=test-value", type: [] });
    });

    it("should pass a correct method", () => {
      expect(this.result.method).toBe(this.originalOperation.method);
    });

    it("should copy original operation's types", () => {
      expect([...this.result.type]).toEqual(["http://schema.org/AddAction", hydra.Operation]);
    });

    it("should expand headers", () => {
      expect(this.header.expand).toHaveBeenCalledOnce();
    });

    it("should pass an expanded header", () => {
      expect(this.result.expectedHeaders.ofName("TEST").value).toBe("test");
    });
  });
});

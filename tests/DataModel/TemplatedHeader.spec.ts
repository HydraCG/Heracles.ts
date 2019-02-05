import MappingsCollection from "../../src/DataModel/Collections/MappingsCollection";
import TemplatedHeader from "../../src/DataModel/TemplatedHeader";
import { rdfs } from "../../src/namespaces";

describe("Given instance of the TemplatedHeader", () => {
  beforeEach(() => {
    this.mapping = {
      property: { iri: rdfs.comment },
      variable: "with-variable"
    };
    this.template = {
      mappings: new MappingsCollection([this.mapping]),
      template: "some text {with-variable}"
    };
    this.originalHeader = { name: "TEST", value: "" };
    this.header = new TemplatedHeader(this.originalHeader, this.template);
  });

  describe("when expanding header value with variable values", () => {
    beforeEach(() => {
      this.result = this.header.expand(_ => _.withVariable("with-variable").havingValueOf("test value"));
    });

    it("should provide an expanded header value", () => {
      expect(this.result.value).toBe("some text test value");
    });

    it("should pass a correct method", () => {
      expect(this.result.name).toBe(this.originalHeader.name);
    });
  });
});

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
    this.templateless = {
      mappings: new MappingsCollection([this.mapping]),
      template: ""
    };
    this.originalHeader = { name: "TEST", value: "" };
    this.headerWithTemplate = new TemplatedHeader(this.originalHeader, this.template);
    this.headerWithMapping = new TemplatedHeader(this.originalHeader, this.templateless);
  });

  describe("when expanding templated header value with variable values", () => {
    beforeEach(() => {
      this.result = this.headerWithTemplate.expand(_ => _.withVariable("with-variable").havingValueOf("test value"));
    });

    it("should provide an expanded header value", () => {
      expect(this.result.value).toBe("some text test value");
    });

    it("should pass a correct header name", () => {
      expect(this.result.name).toBe(this.originalHeader.name);
    });
  });

  describe("when expanding templatless header value with variable values", () => {
    beforeEach(() => {
      this.result = this.headerWithMapping.expand(_ => _.withVariable("with-variable").havingValueOf("test value"));
    });

    it("should provide an expanded header value", () => {
      expect(this.result.value).toBe("test value");
    });

    it("should pass a correct header name", () => {
      expect(this.result.name).toBe(this.originalHeader.name);
    });
  });
});

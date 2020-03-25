/* tslint:disable:max-line-length */
import ApiDocumentationExtendingGraphTransformer from "../../../src/JsonLd/GraphTransformations/ApiDocumentationExtendingGraphTransformer";
import { hydra } from "../../../src/namespaces";

describe("Given instance of ApiDocumentationExtendingGraphTransformer class", () => {
  beforeEach(() => {
    this.entryPoint = { "@id": "http://temp.uri/" };
    this.resource = { "@id": "http://temp.uri/resource", "@type": [hydra.Collection] };
    this.graph = [this.resource];
    this.operation = { title: "title" };
    this.apiDocumentation = { supportedClasses: [{ iri: hydra.Collection, supportedOperations: [this.operation] }] };
    this.options = {
      apiDocumentations: [this.apiDocumentation]
    };
    this.processor = {};
    this.transformer = new ApiDocumentationExtendingGraphTransformer();
  });

  describe("when transforming", () => {
    beforeEach(() => {
      this.result = this.transformer.transform(this.graph, this.processor, this.options);
    });

    it("should add API documentation discovered operation", () => {
      expect(this.result[0][hydra.operation][0][hydra.title][0]["@value"]).toBe(this.operation.title);
    });
  });
});

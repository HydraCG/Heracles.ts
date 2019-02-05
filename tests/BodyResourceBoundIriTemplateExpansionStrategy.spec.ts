import * as sinon from "sinon";
import BodyResourceBoundIriTemplateExpansionStrategy from "../src/BodyResourceBoundIriTemplateExpansionStrategy";
import MappingsCollection from "../src/DataModel/Collections/MappingsCollection";
import { MappingBuilder } from "../src/DataModel/ITemplatedResource";
import MappingsBuilder from "../src/DataModel/MappingsBuilder";
/* tslint:disable:no-var-requires */
require("jasmine-sinon");

describe("Given instance of the BodyResourceBoundIriTemplateExpansionStrategy class", () => {
  beforeEach(() => {
    this.mappings = [
      {
        property: { iri: "http://schema.org/name" },
        variable: "eventName"
      },
      {
        property: { iri: "http://schema.org/description" },
        variable: "eventDescription"
      }
    ];
    this.builder = new MappingsBuilder(new MappingsCollection(this.mappings));
    this.strategy = new BodyResourceBoundIriTemplateExpansionStrategy();
    this.body = { "http://schema.org/description": "Some description" };
    this.parameters = { "http://schema.org/name": "the-name" };
  });

  describe("when handling a standard operation without a template", () => {
    beforeEach(() => {
      this.operation = {};

      this.result = this.strategy.createRequest(this.operation, this.body, this.paramters);
    });

    it("should provide an expanded operation", () => {
      expect(this.result).toBe(this.operation);
    });
  });

  describe("when handling a templated operation", () => {
    beforeEach(() => {
      this.operation = {
        expand: sinon.stub().callsFake((config: MappingBuilder) => {
          config(this.builder);
          this.variables = this.builder.complete();
          return {};
        })
      };

      this.result = this.strategy.createRequest(this.operation, this.body, this.parameters);
    });

    it("should expand target", () => {
      expect(this.operation.expand).toHaveBeenCalledOnce();
    });

    it("should use mappings from the body resource", () => {
      expect(this.variables.eventDescription).toBe(this.body["http://schema.org/description"]);
    });

    it("should use mappings from the auxiliary resource", () => {
      expect(this.variables.eventName).toBe(this.parameters["http://schema.org/name"]);
    });
  });
});

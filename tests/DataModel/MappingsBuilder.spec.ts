import MappingsCollection from "../../src/DataModel/Collections/MappingsCollection";
import MappingsBuilder from "../../src/DataModel/MappingsBuilder";

describe("Given instance of the MappingsBuilder class", () => {
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
  });

  describe("when defining mappings", () => {
    beforeEach(() => {
      this.mappedVariables = this.builder
        .withProperty("http://schema.org/name")
        .havingValueOf("name")
        .withVariable("eventDescription")
        .havingValueOf("description")
        .complete();
    });

    it("should map value by property correctly", () => {
      expect(this.mappedVariables.eventName).toBe("name");
    });

    it("should map value by variable name correctly", () => {
      expect(this.mappedVariables.eventDescription).toBe("description");
    });

    it("should throw on attempt to map unknown property", () => {
      expect(() => this.builder.withProperty("http://unknown.property/")).toThrow();
    });

    it("should throw on attempt to map unknown variable", () => {
      expect(() => this.builder.withVariable("unknownVariable")).toThrow();
    });
  });
});

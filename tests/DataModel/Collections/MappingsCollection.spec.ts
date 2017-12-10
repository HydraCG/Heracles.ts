import MappingsCollection from "../../../src/DataModel/Collections/MappingsCollection";

describe("Given instance of the MappingsCollection", () => {
  beforeEach(() => {
    this.mapping1 = { is: ["IriTemplateMapping"], variable: "variable1" };
    this.mapping2 = { is: ["IriTemplateMapping"], variable: "variable2" };
    this.allMappings = [this.mapping1, this.mapping2];
    this.mappings = new MappingsCollection(this.allMappings);
  });

  it("should provide all mappings", () => {
    expect([...this.mappings]).toEqual(this.allMappings);
  });

  describe("when narrowing filters with variable name", () => {
    beforeEach(() => {
      this.variableNameNorrowedOperations = this.mappings.ofVariableName("variable1");
    });

    it("should provide only variable name matching mappings", () => {
      expect([...this.variableNameNorrowedOperations]).toEqual([this.mapping1]);
    });
  });
});

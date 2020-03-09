import MappingsCollection from "../../../src/DataModel/Collections/MappingsCollection";
import { hydra } from "../../../src/namespaces";

describe("Given instance of the MappingsCollection", () => {
  beforeEach(() => {
    this.mapping1 = { type: [hydra.IriTemplate], variable: "variable1" };
    this.mapping2 = { type: [hydra.IriTemplate], variable: "variable2" };
    this.allMappings = [this.mapping1, this.mapping2];
    this.mappings = new MappingsCollection(this.allMappings);
  });

  it("should provide all mappings", () => {
    expect([...this.mappings]).toEqual(this.allMappings);
  });

  it("should provide only variable name matching mappings", () => {
    expect([...this.mappings.ofVariableName("variable1")]).toEqual([this.mapping1]);
  });
});

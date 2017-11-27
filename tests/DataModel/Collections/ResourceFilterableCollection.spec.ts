import ResourceFilteredCollection from "../../../src/DataModel/Collections/ResourceFilterableCollection";

describe("Given instance of the ResourceFilterableCollection", () => {
  beforeEach(() => {
    this.resource1 = { iri: "_:blank" };
    this.resource2 = { iri: "http://temp.uri/vocav#term" };
    this.allResources = [this.resource1, this.resource2];
    this.resources = new ResourceFilteredCollection(this.allResources);
  });

  it("should provide all resources", () => {
    expect([...this.resources]).toEqual(this.allResources);
  });

  describe("when narrowing filters with non-blank resources", () => {
    beforeEach(() => {
      this.nonBlankResources = this.resources.nonBlank();
    });

    it("should provide only non-blank resources", () => {
      expect([...this.nonBlankResources]).toEqual([this.resource2]);
    });
  });
});

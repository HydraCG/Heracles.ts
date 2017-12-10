import ResourceFilteredCollection from "../../../src/DataModel/Collections/ResourceFilterableCollection";
import TypesCollection from "../../../src/DataModel/Collections/TypesCollection";

describe("Given instance of the ResourceFilterableCollection", () => {
  beforeEach(() => {
    this.resource1 = {
      iri: "_:blank",
      type: new TypesCollection(["http://temp.uri/vocab#Class"])
    };
    this.resource2 = {
      iri: "http://temp.uri/vocav#term",
      type: new TypesCollection(["http://temp.uri/vocab#AnotherClass"])
    };
    this.allResources = [this.resource1, this.resource2];
    this.resources = new ResourceFilteredCollection(this.allResources);
  });

  it("should provide all resources", () => {
    expect([...this.resources]).toEqual(this.allResources);
  });

  describe("when narrowing filters to those of a specific types", () => {
    beforeEach(() => {
      this.typedResources = this.resources.ofType("http://temp.uri/vocab#Class");
    });

    it("should provide only resources of that type specified", () => {
      expect([...this.typedResources]).toEqual([this.resource1]);
    });

    describe("and when narrowing filters with non-blank resources", () => {
      beforeEach(() => {
        this.nonBlankResources = this.typedResources.nonBlank();
      });

      it("should provide an empty collection", () => {
        expect(this.nonBlankResources.any()).toBeFalsy();
      });
    });
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

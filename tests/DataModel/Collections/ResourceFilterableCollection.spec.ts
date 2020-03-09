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

  it("should provide only resources of type specified", () => {
    expect([...this.resources.ofType("http://temp.uri/vocab#Class")]).toEqual([this.resource1]);
  });

  it("should provide only non-blank resources of type specified", () => {
    expect(
      this.resources
        .ofType("http://temp.uri/vocab#Class")
        .nonBlank()
        .any()
    ).toBeFalsy();
  });

  it("should provide only non-blank resources", () => {
    expect([...this.resources.nonBlank()]).toEqual([this.resource2]);
  });
});

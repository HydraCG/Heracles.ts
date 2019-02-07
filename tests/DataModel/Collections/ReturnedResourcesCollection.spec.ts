import ReturnedResourcesCollection from "../../../src/DataModel/Collections/ReturnedResourcesCollection";
import TypesCollection from "../../../src/DataModel/Collections/TypesCollection";
import { hydra } from "../../../src/namespaces";

describe("Given instance of the ReturnedResourcesCollection", () => {
  beforeEach(() => {
    this.resource1 = {
      iri: "http://temp.uri/vocav#Class",
      type: new TypesCollection([hydra.Resource, hydra.Class])
    };
    this.resource2 = {
      iri: "_:blank",
      type: new TypesCollection([hydra.Resource])
    };
    this.resource3 = {
      iri: "http://temp.uri/vocav#Collection",
      type: new TypesCollection([hydra.Resource, hydra.CollectionSpecification])
    };
    this.allResources = [this.resource1, this.resource2, this.resource3];
    this.resources = new ReturnedResourcesCollection(this.allResources);
  });

  it("should provide all resources", () => {
    expect([...this.resources]).toEqual(this.allResources);
  });

  describe("when narrowing filters to", () => {
    describe("classes", () => {
      beforeEach(() => {
        this.classes = this.resources.classes();
      });

      it("should provide only classes", () => {
        expect([...this.classes]).toEqual([this.resource1]);
      });
    });

    describe("collections", () => {
      beforeEach(() => {
        this.collections = this.resources.collections();
      });

      it("should provide only collections", () => {
        expect([...this.collections]).toEqual([this.resource3]);
      });
    });

    describe("other resources", () => {
      beforeEach(() => {
        this.resources = this.resources.resources();
      });

      it("should provide only non-class and non-collection resources", () => {
        expect([...this.resources]).toEqual([this.resource2]);
      });
    });
  });
});

import LinksCollection from "../../../src/DataModel/Collections/LinksCollection";
import { hydra } from "../../../src/namespaces";

describe("Given instance of the LinksCollection", () => {
  beforeEach(() => {
    this.link1 = { iri: "some:resource-url", type: [hydra.Link] };
    this.link2 = { iri: "some:other-resource-url", type: [hydra.TemplatedLink] };
    this.link3 = { iri: "yet:another-url", type: [hydra.Link] };
    this.link4 = { iri: "yet:another-other-url", type: [hydra.Link] };
    this.allLinks = [this.link1, this.link2, this.link3, this.link4];
    this.links = new LinksCollection(this.allLinks);
  });

  it("should provide all links", () => {
    expect([...this.links]).toEqual(this.allLinks);
  });

  describe("when narrowing filters with relation type", () => {
    beforeEach(() => {
      this.relationTypeNorrowedOperations = this.links.withRelationOf("yet:another-url");
    });

    it("should provide only type matching links", () => {
      expect([...this.relationTypeNorrowedOperations]).toEqual([this.link3]);
    });
  });

  describe("when narrowing filters with template", () => {
    beforeEach(() => {
      this.templateNorrowedOperations = this.links.withTemplate();
    });

    it("should provide only type matching links", () => {
      expect([...this.templateNorrowedOperations]).toEqual([this.link2]);
    });
  });
});

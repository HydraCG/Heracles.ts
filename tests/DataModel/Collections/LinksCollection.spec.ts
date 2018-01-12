import LinksCollection from "../../../src/DataModel/Collections/LinksCollection";
import { hydra } from "../../../src/namespaces";

describe("Given instance of the LinksCollection", () => {
  beforeEach(() => {
    const target = "some:resource";
    this.link1 = { relation: "some:resource-url", target, type: [hydra.Link] };
    this.link2 = { relation: "some:other-url", target, type: [hydra.TemplatedLink] };
    this.link3 = { relation: "yet:another-url", target, type: [hydra.Link] };
    this.link4 = { relation: "yet:another-other-url", target, type: [hydra.Link] };
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

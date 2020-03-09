import LinksCollection from "../../../src/DataModel/Collections/LinksCollection";
import { hydra } from "../../../src/namespaces";

describe("Given instance of the LinksCollection", () => {
  beforeEach(() => {
    const target = { iri: "some:resource" };
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

  it("should provide only links matching required relation", () => {
    expect([...this.links.withRelationOf("yet:another-url")]).toEqual([this.link3]);
  });

  it("should provide only links with template", () => {
    expect([...this.links.withTemplate()]).toEqual([this.link2]);
  });
});

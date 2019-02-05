import TemplatedLink from "../../src/DataModel/TemplatedLink";
import { hydra } from "../../src/namespaces";
import HydraResourceMatcher from "../../testing/HydraResourceMatcher";

describe("Given instance of the TemplatedLink", () => {
  beforeEach(() => {
    jasmine.addMatchers({ toBeLike: () => new HydraResourceMatcher() });
    this.template = {
      template: "some-uri{?with-variable}"
    };
    this.originalLink = {
      baseUrl: "http://temp.uri/",
      method: "GET",
      target: { iri: "test-url" },
      type: [hydra.Link]
    };
    this.link = new TemplatedLink(this.originalLink, this.template);
  });

  it("should provide link of correct type", () => {
    expect([...this.link.type]).toEqual([hydra.TemplatedLink]);
  });

  describe("when expanding URI with variable values", () => {
    beforeEach(() => {
      this.result = this.link.expand({ "with-variable": "test-value" });
    });

    it("should provide an expanded URL", () => {
      expect(this.result.target).toBeLike({ iri: "http://temp.uri/some-uri?with-variable=test-value", type: [] });
    });

    it("should copy original operation's types", () => {
      expect([...this.result.type]).toEqual([hydra.Link]);
    });
  });
});

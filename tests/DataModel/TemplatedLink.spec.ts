import TemplatedLink from "../../src/DataModel/TemplatedLink";
import { hydra } from "../../src/namespaces";

describe("Given instance of the TemplatedLink", () => {
  beforeEach(() => {
    this.template = {
      template: "some-uri{?with-variable}"
    };
    this.originalLink = {
      baseUrl: "http://temp.uri/",
      method: "GET",
      target: "test-url",
      type: [hydra.Link]
    };
    this.link = new TemplatedLink(this.originalLink, this.template);
  });

  it("should provide link of correct type", () => {
    expect(this.link.type).toEqual([hydra.Link, hydra.TemplatedLink]);
  });

  describe("when expanding URI with variable values", () => {
    beforeEach(() => {
      this.result = this.link.expandTarget({ "with-variable": "test-value" });
    });

    it("should provide an expanded URL", () => {
      expect(this.result.target).toBe("http://temp.uri/some-uri?with-variable=test-value");
    });

    it("should copy original operation's types", () => {
      expect(this.result.type).toEqual([hydra.Link]);
    });
  });
});

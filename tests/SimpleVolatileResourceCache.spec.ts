import SimpleVolatileResourceCache from "../src/SimpleVolatileResourceCache";

describe("Given instance of SimpleVolatileResourceCache class", () => {
  beforeEach(() => {
    this.uri = "some:uri";
    this.cache = new SimpleVolatileResourceCache();
    this.resource = {};
  });

  describe("when operating", () => {
    beforeEach(() => {
      this.cache.setItem(this.uri, this.resource);
    });

    it("should store resource within cache", () => {
      expect(this.cache.getItem(this.uri)).toBe(this.resource);
    });

    it("should provide all resource of given type", () => {
      expect(this.cache.all(_ => true)).toContain(this.resource);
    });
  });
});

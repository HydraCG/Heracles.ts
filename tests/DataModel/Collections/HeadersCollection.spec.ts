import HeadersCollection from "../../../src/DataModel/Collections/HeadersCollection";

describe("Given instance of the HeadersCollection", () => {
  beforeEach(() => {
    this.header1 = { name: "HEADER1", value: "VALUE1" };
    this.header2 = { name: "HEADER2", value: "VALUE2", template: "VALUE2" };
    this.allHeaders = [this.header1, this.header2];
    this.header = new HeadersCollection(this.allHeaders);
  });

  it("should provide all headers", () => {
    expect([...this.header]).toEqual(this.allHeaders);
  });

  describe("when checking whether a collection has a given header name", () => {
    it("should confirm an existing type", () => {
      expect(this.header.ofName(this.header1.name)).not.toBeNull();
      expect(this.header.ofName(this.header1.name).value).toBe(this.header1.value);
    });

    it("should not confirm an existing header", () => {
      expect(this.header.ofName("whatever name")).toBeNull();
    });

    it("should confirm an existing header with template", () => {
      expect(this.header.withTemplate().first()).toBe(this.header2);
    });
  });
});

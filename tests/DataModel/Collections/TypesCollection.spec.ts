import TypesCollection from "../../../src/DataModel/Collections/TypesCollection";

describe("Given instance of the TypesCollection", () => {
  beforeEach(() => {
    this.type1 = "type1";
    this.type2 = "type2";
    this.allTypes = [this.type1, this.type2];
    this.is = new TypesCollection(this.allTypes);
  });

  it("should provide all types", () => {
    expect([...this.is]).toEqual(this.allTypes);
  });

  describe("when checking whether a collection has a given type", () => {
    it("should confirm an existing type", () => {
      expect(this.is.a(this.type1)).toBeTruthy();
    });

    it("should not confirm an existing type", () => {
      expect(this.is.a("whatever type")).toBeFalsy();
    });
  });
});

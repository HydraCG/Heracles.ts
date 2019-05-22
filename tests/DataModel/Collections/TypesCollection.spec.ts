import TypesCollection from "../../../src/DataModel/Collections/TypesCollection";

describe("Given instance of the TypesCollection", () => {
  beforeEach(() => {
    this.type1 = "type1";
    this.type2 = "type2";
    this.allTypes = [this.type1, this.type2];
    this.type = new TypesCollection(this.allTypes);
  });

  it("should create an empty collection if no types are provided", () => {
    expect(new TypesCollection().toArray()).toEqual([]);
  });

  it("should provide all types", () => {
    expect([...this.type]).toEqual(this.allTypes);
  });

  describe("when checking whether a collection has a given type", () => {
    it("should confirm an existing type", () => {
      expect(this.type.contains(this.type1)).toBeTruthy();
    });

    it("should not confirm an existing type", () => {
      expect(this.type.contains("whatever type")).toBeFalsy();
    });
  });

  describe("when excluding a type", () => {
    it("should actually exclude that type", () => {
      expect(this.type.except(this.type1).toArray()).toEqual([this.type2]);
    });
  });
});

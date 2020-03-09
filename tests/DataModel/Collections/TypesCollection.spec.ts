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

  it("should confirm a contained type", () => {
    expect(this.type.contains(this.type1)).toBeTruthy();
  });

  it("should not confirm not contained type", () => {
    expect(this.type.contains("whatever type")).toBeFalsy();
  });

  it("should exclude required type", () => {
    expect(this.type.except(this.type1).toArray()).toEqual([this.type2]);
  });
});

import CollectionsCollection from "../../../src/DataModel/Collections/CollectionsCollection";
import ResourceFilterableCollection from "../../../src/DataModel/Collections/ResourceFilterableCollection";
import {IStatement} from "../../../src/DataModel/IStatement";
import {hydra, rdf} from "../../../src/namespaces";

const schema = { knows: "http://schema.org/knows" };
const gh = { alienMcl: "http://github.com/alien-mcl/" };

describe("Given instance of CollectionsCollection class", () => {
  beforeEach(() => {
    this.statement1 = { property: { iri: rdf.type }, object: { iri: hydra.Class } };
    this.collection1 = { manages: new ResourceFilterableCollection<IStatement>([this.statement1]) };
    this.statement2 = { subject: { iri: gh.alienMcl }, property: { iri: schema.knows } };
    this.collection2 = { manages: new ResourceFilterableCollection<IStatement>([this.statement2]) };
    this.collection = new CollectionsCollection([this.collection1, this.collection2]);
  });

  it("should narrow collection to those describing members of type hydra:Class", () => {
    expect([...this.collection.withMembersOfType(hydra.Class)]).toEqual([this.collection1]);
  });

  it("should narrow collection to those describing members in relation of schema:knowns", () => {
    expect([...this.collection.withMembersInRelationWith(gh.alienMcl, schema.knows)]).toEqual([this.collection2]);
  });
});
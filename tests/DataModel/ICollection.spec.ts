import * as sinon from "sinon";
import LinksCollection from "../../src/DataModel/Collections/LinksCollection";
import TypesCollection from "../../src/DataModel/Collections/TypesCollection";
import { IResource } from "../../src/DataModel/IResource";
import { factories } from "../../src/JsonLd/factories";
import { hydra } from "../../src/namespaces";
import { run } from "../../testing/AsyncHelper";

describe("Given an instance of the ICollection interface", () => {
  beforeEach(function() {
    this.client = { getResource: sinon.stub() };
    this.firstPage = { iri: "page:first" };
    const setup: any = {
      links: new LinksCollection([{ relation: hydra.first, target: this.firstPage } as any]),
      type: new TypesCollection([hydra.PartialCollectionView])
    };
    this.collection = factories[hydra.PartialCollectionView](setup as IResource, this.client);
  });

  describe("when obtaining all collection members", () => {
    beforeEach(function() {
      this.lastPage = { iri: "page:last" };
      this.firstBatch = {
        hypermedia: {
          links: new LinksCollection([{ relation: hydra.next, target: this.lastPage } as any]),
          members: [{ iri: "item:1" }]
        }
      };
      this.lastBatch = {
        hypermedia: {
          links: new LinksCollection([]),
          members: [{ iri: "item:2" }]
        }
      };
      this.client.getResource
        .onFirstCall().returns(this.firstBatch)
        .onSecondCall().returns(this.lastBatch);
    });

    it(
      "should call the client for first page",
      run(async function() {
        await this.collection.getAllMembers();

        expect(this.client.getResource).toHaveBeenCalledWith(this.firstPage);
      })
    );

    it(
      "should call the client for last page",
      run(async function() {
        await this.collection.getAllMembers();

        expect(this.client.getResource).toHaveBeenCalledWith(this.lastPage);
      })
    );

    it(
      "should provide a correct result",
      run(async function() {
        expect(await this.collection.getAllMembers())
          .toEqual([
            this.firstBatch.hypermedia.members[0],
            this.lastBatch.hypermedia.members[0]]);
      })
    );
  });
});

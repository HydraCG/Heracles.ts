import * as sinon from "sinon";
import LinksCollection from "../../src/DataModel/Collections/LinksCollection";
import TypesCollection from "../../src/DataModel/Collections/TypesCollection";
import { IResource } from "../../src/DataModel/IResource";
import { factories } from "../../src/JsonLd/factories";
import { hydra } from "../../src/namespaces";
import { run } from "../../testing/AsyncHelper";

describe("Given an instance of the ICollection interface", () => {
  beforeEach(() => {
    this.client = { getResource: sinon.stub() };
  });

  describe("when obtaining all collection members", () => {
    describe("of a collection", () => {
      beforeEach(() => {
        this.members = [];
        this.client.getResource.returns(this.members);
        const setup: any = {
          links: new LinksCollection([]),
          members: this.members,
          type: new TypesCollection([hydra.Collection])
        };
        this.collection = factories[hydra.Collection](setup as IResource, this.client);
      });

      it(
        "should not call the collection once again",
        run(async () => {
          await this.collection.getAllMembers();

          expect(this.client.getResource).not.toHaveBeenCalled();
        })
      );

      it("should provide members already obtained", () => {
        run(async () => {
          expect(await this.collection.getAllMembers()).toBe(this.members);
        });
      });
    });

    describe("of a partial collection view", () => {
      beforeEach(() => {
        this.firstPage = { iri: "page:first" };
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
          .onFirstCall()
          .returns(this.firstBatch)
          .onSecondCall()
          .returns(this.lastBatch);
        const setup: any = {
          links: new LinksCollection([{ relation: hydra.first, target: this.firstPage } as any]),
          type: new TypesCollection([hydra.Collection])
        };
        this.collection = factories[hydra.Collection](setup as IResource, this.client);
      });

      it(
        "should call the client for first page",
        run(async () => {
          await this.collection.getAllMembers();

          expect(this.client.getResource).toHaveBeenCalledWith(this.firstPage);
        })
      );

      it(
        "should call the client for last page",
        run(async () => {
          await this.collection.getAllMembers();

          expect(this.client.getResource).toHaveBeenCalledWith(this.lastPage);
        })
      );

      it(
        "should provide a correct result",
        run(async () => {
          expect(await this.collection.getAllMembers()).toEqual([
            this.firstBatch.hypermedia.members[0],
            this.lastBatch.hypermedia.members[0]
          ]);
        })
      );
    });
  });
});

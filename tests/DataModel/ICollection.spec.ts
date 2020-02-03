import * as sinon from "sinon";
import LinksCollection from "../../src/DataModel/Collections/LinksCollection";
import ResourceFilterableCollection from "../../src/DataModel/Collections/ResourceFilterableCollection";
import TypesCollection from "../../src/DataModel/Collections/TypesCollection";
import { IResource } from "../../src/DataModel/IResource";
import { factories } from "../../src/JsonLd/factories";
import { hydra } from "../../src/namespaces";
import { run } from "../../testing/AsyncHelper";

function collectionOf(iri: string, next: IResource, previous: IResource, ...iris: string[]) {
  const members: IResource[] = [];
  for (const item of iris) {
    members.push({ iri: item } as any);
  }

  const collection = {
    members: new ResourceFilterableCollection(members),
    view: { iri }
  };

  if (!!next) {
    (collection.view as any).next = next;
  }

  if (!!previous) {
    (collection.view as any).previous = previous;
  }

  const result = {
    hypermedia: collection
  };

  return result;
}

describe("Given an instance of the ICollection interface", () => {
  beforeEach(() => {
    this.client = { getResource: sinon.stub() };
  });

  describe("which has no view associated", () => {
    beforeEach(() => {
      const setup: any = {
        links: LinksCollection.empty,
        members: this.members,
        type: new TypesCollection([hydra.Collection])
      };
      this.collection = factories[hydra.Collection](setup as IResource, this.client, { processedObject: {} } as any);
    });

    it("should not have that view available", () => {
      expect(this.collection.getIterator()).toBeNull();
    });
  });

  describe("when obtaining members of a partial collection view", () => {
    beforeEach(() => {
      this.firstPage = { iri: "page:1" };
      this.secondPage = { iri: "page:2" };
      this.lastPage = { iri: "page:3" };
      this.firstBatch = collectionOf("view:1", this.secondPage, null, "some:item");
      this.secondBatch = collectionOf("view:2", this.lastPage, this.firstPage, "some:another-item");
      this.lastBatch = collectionOf("view:3", null, this.secondPage, "yet:another-item");
      this.initialLink = this.secondPage;
      this.initialMembers = [];
      const collectionResource = {};
      collectionResource[hydra.view] = [{ "@id": "view:1" }];
      const setup: any = {
        members: this.initialMembers,
        type: new TypesCollection([hydra.Collection]),
        view: {
          iri: collectionResource[hydra.view][0]["@id"],
          next: this.initialLink,
          previous: this.initialLink
        }
      };
      this.result = [];
      this.collection = factories[hydra.Collection](setup as IResource, this.client, {
        processedObject: collectionResource
      } as any);
    });

    describe("by following next links", () => {
      beforeEach(
        run(async () => {
          Array.from(this.firstBatch.hypermedia.members).forEach(item =>
            this.initialMembers.push(item)
          );
          this.client.getResource
            .onFirstCall()
            .returns(this.secondBatch)
            .onSecondCall()
            .returns(this.lastBatch);

          const iterator = this.collection.getIterator();
          while (iterator.hasNextPart) {
            for (const member of await iterator.getNextPart()) {
              this.result.push(member);
            }
          }
        })
      );

      it("should not call the client for first part", () => {
        expect(this.client.getResource).not.toHaveBeenCalledWith(this.firstPage);
      });

      it("should call the client for second part", () => {
        expect(this.client.getResource).toHaveBeenCalledWith(this.secondPage);
      });

      it("should call the client for last part", () => {
        expect(this.client.getResource).toHaveBeenCalledWith(this.lastPage);
      });

      it("should provide a correct result", () => {
        expect(this.result).toEqual([
          this.secondBatch.hypermedia.members.first(),
          this.lastBatch.hypermedia.members.first()
        ]);
      });
    });

    describe("by following previous links", () => {
      beforeEach(
        run(async () => {
          Array.from(this.lastBatch.hypermedia.members).forEach(item =>
            this.initialMembers.push(item)
          );
          this.client.getResource
            .onFirstCall()
            .returns(this.secondBatch)
            .onSecondCall()
            .returns(this.firstBatch);

          const iterator = this.collection.getIterator();
          while (iterator.hasPreviousPart) {
            for (const member of await iterator.getPreviousPart()) {
              this.result.push(member);
            }
          }
        })
      );

      it("should not call the client for last part", () => {
        expect(this.client.getResource).not.toHaveBeenCalledWith(this.lastPage);
      });

      it("should call the client for second part", () => {
        expect(this.client.getResource).toHaveBeenCalledWith(this.secondPage);
      });

      it("should call the client for first part", () => {
        expect(this.client.getResource).toHaveBeenCalledWith(this.firstPage);
      });

      it("should provide a correct result", () => {
        expect(this.result).toEqual([
          this.secondBatch.hypermedia.members.first(),
          this.firstBatch.hypermedia.members.first()
        ]);
      });
    });
  });
});

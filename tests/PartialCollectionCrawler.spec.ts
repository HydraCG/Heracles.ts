import * as sinon from "sinon";
import PartialCollectionCrawler, { CrawlingDirection } from "../src/PartialCollectionCrawler";
import { run } from "../testing/AsyncHelper";
/* tslint:disable:no-var-requires */
require("jasmine-sinon");

describe("Given instance of the PartialCollectionCrawler class", () => {
  beforeEach(() => {
    this.part = 2;
    this.iterator = {
      first: "page:1",
      getFirstPart: sinon.stub().callsFake(() => [{ iri: `item:${(this.part = 1)}` }]),
      getLastPart: sinon.stub().callsFake(() => [{ iri: `item:${(this.part = 4)}` }]),
      getNextPart: sinon.stub(),
      getPreviousPart: sinon.stub(),
      last: "page:4"
    };
    Object.defineProperty(this.iterator, "current", { get: () => `page:${this.part}` });
    Object.defineProperty(this.iterator, "next", { get: () => (this.part >= 4 ? null : `page:${this.part + 1}`) });
    Object.defineProperty(this.iterator, "previous", { get: () => (this.part <= 1 ? null : `page:${this.part - 1}`) });
    this.initialCollection = {
      getIterator: sinon.stub().returns(this.iterator),
      iri: "collection",
      members: [{ iri: "item:2" }],
      view: { iri: "page:2" }
    };
    this.crawler = PartialCollectionCrawler.from(this.initialCollection);
  });

  describe("while starting from middle of the collection", () => {
    describe("and fast-forwarding", () => {
      beforeEach(() => {
        this.iterator.getNextPart
          .onFirstCall()
          .callsFake(() => [{ iri: `item:${(this.part = 3)}` }])
          .onSecondCall()
          .callsFake(() => [{ iri: `item:${(this.part = 4)}` }]);
      });

      describe("through all members with loop", () => {
        beforeEach(
          run(async () => {
            this.result = await this.crawler.getMembers({ rewind: true });
          })
        );

        it("should obtain all members in the correct order", () => {
          expect(this.result).toEqual([{ iri: "item:2" }, { iri: "item:3" }, { iri: "item:4" }, { iri: "item:1" }]);
        });

        it("should request an iterator", () => {
          expect(this.initialCollection.getIterator).toHaveBeenCalledOnce();
        });

        it("should request page 3 and 4", () => {
          expect(this.iterator.getNextPart).toHaveBeenCalledTwice();
        });

        it("should rewind back to page 1", () => {
          expect(this.iterator.getFirstPart).toHaveBeenCalledOnce();
        });
      });

      describe("and forwarding only once", () => {
        beforeEach(
          run(async () => {
            this.result = await this.crawler.getMembers({ requestLimit: 1 });
          })
        );

        it("should obtain 2 members", () => {
          expect(this.result).toEqual([{ iri: "item:2" }, { iri: "item:3" }]);
        });

        it("should request page 3", () => {
          expect(this.iterator.getNextPart).toHaveBeenCalledOnce();
        });

        it("should not rewind back to page 1", () => {
          expect(this.iterator.getFirstPart).not.toHaveBeenCalled();
        });
      });

      describe("and obtaining only 2 members", () => {
        beforeEach(
          run(async () => {
            this.result = await this.crawler.getMembers({ memberLimit: 2 });
          })
        );

        it("should obtain 2 members", () => {
          expect(this.result).toEqual([{ iri: "item:2" }, { iri: "item:3" }]);
        });

        it("should request page 3", () => {
          expect(this.iterator.getNextPart).toHaveBeenCalledOnce();
        });

        it("should not rewind back to page 1", () => {
          expect(this.iterator.getFirstPart).not.toHaveBeenCalled();
        });
      });
    });

    describe("and moving backward", () => {
      beforeEach(() => {
        this.iterator.getPreviousPart
          .onFirstCall()
          .callsFake(() => [{ iri: `item:${(this.part = 1)}` }])
          .onSecondCall()
          .callsFake(() => [{ iri: `item:${(this.part = 3)}` }]);
      });

      describe("through all members with loop", () => {
        beforeEach(
          run(async () => {
            this.result = await this.crawler.getMembers({ direction: CrawlingDirection.backward, rewind: true });
          })
        );

        it("should obtain all members in the correct order", () => {
          expect(this.result).toEqual([{ iri: "item:2" }, { iri: "item:1" }, { iri: "item:4" }, { iri: "item:3" }]);
        });

        it("should request an iterator", () => {
          expect(this.initialCollection.getIterator).toHaveBeenCalledOnce();
        });

        it("should request page 1 and 3", () => {
          expect(this.iterator.getPreviousPart).toHaveBeenCalledTwice();
        });

        it("should fast-forward to page 4", () => {
          expect(this.iterator.getLastPart).toHaveBeenCalledOnce();
        });
      });
    });
  });
});

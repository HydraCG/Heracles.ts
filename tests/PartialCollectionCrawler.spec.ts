import * as sinon from "sinon";
import PartialCollectionCrawler, { CrawlingDirection } from "../src/PartialCollectionCrawler";
import { run } from "../testing/AsyncHelper";
/* tslint:disable:no-var-requires */
require("jasmine-sinon");

describe("Given instance of the PartialCollectionCrawler class", () => {
  beforeEach(() => {
    this.part = 2;
    this.view = {
      first: "page:1",
      getFirstPage: sinon.stub().callsFake(() => [{ iri: `item:${(this.part = 1)}` }]),
      getLastPage: sinon.stub().callsFake(() => [{ iri: `item:${(this.part = 4)}` }]),
      getNextPage: sinon.stub(),
      getPreviousPage: sinon.stub(),
      last: "page:4"
    };
    Object.defineProperty(this.view, "iri", { get: () => `page:${this.part}` });
    Object.defineProperty(this.view, "next", { get: () => (this.part >= 4 ? null : `page:${this.part + 1}`) });
    Object.defineProperty(this.view, "previous", { get: () => (this.part <= 1 ? null : `page:${this.part - 1}`) });
    this.initialCollection = {
      getView: sinon.stub().returns(this.view),
      iri: "page:2",
      members: [{ iri: "item:2" }]
    };
    this.crawler = PartialCollectionCrawler.from(this.initialCollection);
  });

  describe("while starting from middle of the collection", () => {
    describe("and fast-forwarding", () => {
      beforeEach(() => {
        this.view.getNextPage
          .onFirstCall()
          .callsFake(() => [{ iri: `item:${(this.part = 3)}` }])
          .onSecondCall()
          .callsFake(() => [{ iri: `item:${(this.part = 4)}` }]);
      });

      describe("through all members with loop", () => {
        beforeEach(
          run(async () => {
            this.result = await this.crawler.getMoreMembers({ rewind: true });
          })
        );

        it("should obtain all members in the correct order", () => {
          expect(this.result).toEqual([{ iri: "item:2" }, { iri: "item:3" }, { iri: "item:4" }, { iri: "item:1" }]);
        });

        it("should request view", () => {
          expect(this.initialCollection.getView).toHaveBeenCalledOnce();
        });

        it("should request page 3 and 4", () => {
          expect(this.view.getNextPage).toHaveBeenCalledTwice();
        });

        it("should rewind back to page 1", () => {
          expect(this.view.getFirstPage).toHaveBeenCalledOnce();
        });
      });

      describe("and forwarding only once", () => {
        beforeEach(
          run(async () => {
            this.result = await this.crawler.getMoreMembers({ requestLimit: 1 });
          })
        );

        it("should obtain 2 members", () => {
          expect(this.result).toEqual([{ iri: "item:2" }, { iri: "item:3" }]);
        });

        it("should request page 3", () => {
          expect(this.view.getNextPage).toHaveBeenCalledOnce();
        });

        it("should not rewind back to page 1", () => {
          expect(this.view.getFirstPage).not.toHaveBeenCalled();
        });
      });

      describe("and obtaining only 2 members", () => {
        beforeEach(
          run(async () => {
            this.result = await this.crawler.getMoreMembers({ memberLimit: 2 });
          })
        );

        it("should obtain 2 members", () => {
          expect(this.result).toEqual([{ iri: "item:2" }, { iri: "item:3" }]);
        });

        it("should request page 3", () => {
          expect(this.view.getNextPage).toHaveBeenCalledOnce();
        });

        it("should not rewind back to page 1", () => {
          expect(this.view.getFirstPage).not.toHaveBeenCalled();
        });
      });
    });

    describe("and moving backward", () => {
      beforeEach(() => {
        this.view.getPreviousPage
          .onFirstCall()
          .callsFake(() => [{ iri: `item:${(this.part = 1)}` }])
          .onSecondCall()
          .callsFake(() => [{ iri: `item:${(this.part = 3)}` }]);
      });

      describe("through all members with loop", () => {
        beforeEach(
          run(async () => {
            this.result = await this.crawler.getMoreMembers({ direction: CrawlingDirection.backward, rewind: true });
          })
        );

        it("should obtain all members in the correct order", () => {
          expect(this.result).toEqual([{ iri: "item:2" }, { iri: "item:1" }, { iri: "item:4" }, { iri: "item:3" }]);
        });

        it("should request view", () => {
          expect(this.initialCollection.getView).toHaveBeenCalledOnce();
        });

        it("should request page 1 and 3", () => {
          expect(this.view.getPreviousPage).toHaveBeenCalledTwice();
        });

        it("should fast-forward to page 4", () => {
          expect(this.view.getLastPage).toHaveBeenCalledOnce();
        });
      });
    });
  });
});

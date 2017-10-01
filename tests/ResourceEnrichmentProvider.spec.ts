import { hydra } from "../src/namespaces";
import ResourceEnrichmentProvider from "../src/ResourceEnrichmentProvider";

describe("Given instance of ResourceEnrichmentProvider class", () => {
  beforeEach(() => {
    this.provider = new ResourceEnrichmentProvider();
    this.resource = {
      hypermedia: [
        {
          isA: [hydra.Collection],
          members: [{ iri: "test" }]
        }
      ]
    };
  });

  describe("when enriching resource", () => {
    beforeEach(() => {
      this.result = this.provider.enrichHypermedia(this.resource);
    });

    describe("with collection specific accessors", () => {
      it("should enrich with members property", () => {
        expect(this.result.hypermedia.members).toEqual(jasmine.any(Array));
      });

      it("should obtain all members from that members property", () => {
        expect(this.result.hypermedia.members).toEqual([{ iri: "test" }]);
      });
    });
  });
});

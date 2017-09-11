import ResourceEnrichmentProvider from "../src/ResourceEnrichmentProvider";
import {hydra} from "../src/namespaces";

describe("Given instance of ResourceEnrichmentProvider class", function() {
    beforeEach(function() {
        this.provider = new ResourceEnrichmentProvider();
        this.resource =
            {
                hypermedia:
                    [
                        {
                            isA: [hydra.Collection],
                            members: [{ iri: "test" }]
                        }
                    ]
            };
    });

    describe("when enriching resource", function() {
        beforeEach(function() {
            this.result = this.provider.enrichHypermedia(this.resource);
        });

        describe("with collection specific accessors", function() {
            it("should enrich with members property", function() {
                expect(this.result.hypermedia.members).toEqual(jasmine.any(Array));
            });

            it("should obtain all members from that members property", function() {
                expect(this.result.hypermedia.members).toEqual([{ iri: "test" }]);
            })
        });
    });
});
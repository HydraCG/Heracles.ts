import HydraClient from "../src/HydraClient";
import {run} from "../testing/AsyncHelper";

describe("Having a Hydra client", function() {
    beforeEach(function() {
        this.url = "http://localhost:3000/";
        this.client = new HydraClient();
    });

    describe("while browsing a website", function() {
        beforeEach(run(async function() {
            this.apiDocumentation = await this.client.getApiDocumentation(this.url);
        }));

        describe("and obtaining it's entry point as in use case 1.entry-point", function() {
            beforeEach(run(async function() {
                this.entryPoint = await this.apiDocumentation.getEntryPoint();
            }));

            it("should obtain two hypermedia", function() {
                expect(this.entryPoint.hypermedia.length).toBe(2);
            });

            it("should obtain a schema:CreateAction operation", function() {
                expect(this.entryPoint.hypermedia[0].isA).toBe("Operation");
            });

            it("should obtain a collection of events", function() {
                expect(this.entryPoint.hypermedia[1].iri).toMatch("\/api\/events$");
                expect(this.entryPoint.hypermedia[1].isA).toContain("Collection");
            });
        });

        describe("and obtaining it's API documentation as in use case 2.api-documentation", function() {
            it("should obtain an API documentation", function() {
                expect(this.apiDocumentation).not.toBeNull();
            });

            it("should have access an entry point", function() {
                expect(this.apiDocumentation.entryPoint.iri).toMatch(".*/api$");
            });
        });
    });
});
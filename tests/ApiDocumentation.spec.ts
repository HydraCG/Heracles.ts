import * as sinon from "sinon";
import {run} from "../testing/AsyncHelper";
import {returnOk, returnNotFound} from "../testing/ResponseHelper";
import HydraClient from "../src/HydraClient";
import ApiDocumentation from "../src/ApiDocumentation";

describe("Given an instance of the ApiDocumentation class", function() {
    beforeEach(function() {
        this.metadataProvider = {
            supportedMediaTypes: ["application/json+ld"],
            parse: sinon.stub()
        };
        (<any>HydraClient)._metadataProviders.length = 0;
        HydraClient.registerMetadataProvider(this.metadataProvider);
        let setup = {
            client: { value: HydraClient.instance },
            entryPoint: { value: "http://temp.uri/api" }
        };
        this.apiDocumentation = Object.create(ApiDocumentation.prototype, setup);
    });

    describe("when fetching an entry point", function() {
        beforeEach(function() {
            this.fetch = sinon.stub(window, "fetch");
        });

        describe("and that entry point was not found", function() {
            beforeEach(function() {
                this.fetch.withArgs(this.apiDocumentation.entryPoint).returns(Promise.resolve(returnNotFound()));
            });

            it("should throw", run(async function() {
                try { await this.apiDocumentation.getEntryPoint(); }
                catch (e) { expect(e.message).toBe(HydraClient.invalidResponse + "404"); }
            }));
        });

        describe("and that entry point was provided in an unsupported format", function() {
            beforeEach(function() {
                this.entryPointResponse = returnOk({}, { "Content-Type": "text/turtle" });
                this.fetch.withArgs(this.apiDocumentation.entryPoint).returns(Promise.resolve(this.entryPointResponse));
            });

            it("should throw", run(async function() {
                try { await this.apiDocumentation.getEntryPoint(); }
                catch (e) { expect(e.message).toBe(HydraClient.responseFormatNotSupported); }
            }));
        });

        describe("and that entry point was provided correctly", function() {
            beforeEach(function() {
                this.entryPoint = { metadata: {} };
                this.entryPointResponse = returnOk(this.entryPoint);
                this.fetch.withArgs(this.apiDocumentation.entryPoint).returns(Promise.resolve(this.entryPointResponse));
                this.metadataProvider.parse.withArgs(this.entryPointResponse).returns(Promise.resolve(this.entryPoint));
            });

            it("should parse the response", run(async function() {
                await this.apiDocumentation.getEntryPoint();

                expect(this.metadataProvider.parse).toHaveBeenCalledWith(this.entryPointResponse, true);
            }));

            it("should return a correct result", run(async function() {
                let result = await this.apiDocumentation.getEntryPoint();

                expect(result).toBe(this.entryPoint);
            }));
        });

        afterEach(function() {
            this.fetch.restore();
        });
    });
});
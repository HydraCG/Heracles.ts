import * as sinon from "sinon";
import {run} from "../testing/AsyncHelper";
import {returnOk, returnNotFound} from "../testing/ResponseHelper";
import {hydra} from "../src/namespaces";
import HydraClient from "../src/HydraClient";
import ApiDocumentation from "../src/ApiDocumentation";

describe("Given an instance of the HydraClient class", function() {
    beforeEach(function() {
        this.expectedUrl = "http://temp.uri/";
        this.metadataProvider = {
            supportedMediaTypes: ["application/json+ld"],
            parse: sinon.stub()
        };
        this.client = HydraClient.instance;
        (<any>HydraClient)._metadataProviders.length = 0;
        HydraClient.registerMetadataProvider(this.metadataProvider);
    });

    it("should provide a default instance", function() {
        expect(this.client).toEqual(jasmine.any(HydraClient));
    });

    it("should register a metadata provider", function() {
        expect(this.client.getMetadataProvider(returnOk())).toBe(this.metadataProvider);
    });

    describe("when obtaining an API documentation", function() {
        beforeEach(function() {
            this.fetch = sinon.stub(window, "fetch");
        });

        describe("of which site's main document is not found", function() {
            beforeEach(function() {
                this.fetch.withArgs(this.expectedUrl).returns(Promise.resolve(returnNotFound()));
            });

            it("should throw", run(async function() {
                try { await this.client.getApiDocumentation(this.expectedUrl); }
                catch (e) { expect(e.message).toBe(HydraClient.invalidResponse + "404"); }
            }));
        });

        describe("which has no LINK header returned", function() {
            beforeEach(function() {
                this.fetch.withArgs(this.expectedUrl).returns(Promise.resolve(returnOk()));
            });

            it("should throw", run(async function() {
                try { await this.client.getApiDocumentation(this.expectedUrl); }
                catch (e) { expect(e.message).toBe(HydraClient.apiDocumentationNotProvided); }
            }));
        });

        describe("which is not provided within the LINK header", function() {
            beforeEach(function() {
                this.urlResponse = returnOk({}, { "Link": `<${this.expectedUrl}api/documentation>; rel="next"` });
                this.fetch.withArgs(this.expectedUrl).returns(Promise.resolve(this.urlResponse));
            });

            it("should throw", run(async function() {
                try { this.client.getApiDocumentation(this.expectedUrl); }
                catch (e) { expect(e.message).toBe(HydraClient.apiDocumentationNotProvided); }
            }));
        });

        describe("from a valid site", function() {
            beforeEach(function() {
                this.urlResponse = returnOk({}, { "Link": `<${this.expectedUrl}api/documentation>; rel="${hydra.apiDocumentation}"` });
                this.fetch.withArgs(this.expectedUrl).returns(Promise.resolve(this.urlResponse));
            });

            describe("and that documentation is not found", function() {
                beforeEach(function() {
                    this.apiDocumentationResponse = returnNotFound();
                    this.fetch.withArgs(`${this.expectedUrl}api/documentation`).returns(this.apiDocumentationResponse);
                });

                it("should throw", run(async function() {
                    try { this.client.getApiDocumentation(this.expectedUrl); }
                    catch (e) { expect(e.message).toBe(HydraClient.invalidResponse); }
                }));
            });

            describe("and that documentation is provided in an unsupported format", function() {
                beforeEach(function() {
                    this.apiDocumentationResponse = returnOk({}, { "Content-Type": "text/turtle" });
                    this.fetch.withArgs(`${this.expectedUrl}api/documentation`).returns(this.apiDocumentationResponse);
                });

                it("should throw", run(async function() {
                    try { this.client.getApiDocumentation(this.expectedUrl); }
                    catch (e) { expect(e.message).toBe(HydraClient.responseFormatNotSupported); }
                }));
            });

            describe("and that documentation has no entry point provided", function() {
                beforeEach(function() {
                    this.apiDocumentationResponse = returnOk();
                    this.fetch.withArgs(`${this.expectedUrl}api/documentation`).returns(this.apiDocumentationResponse);
                    this.metadataProvider.parse.returns({});
                });

                it("should throw", run(async function() {
                    try { this.client.getApiDocumentation(this.expectedUrl); }
                    catch (e) { expect(e.message).toBe(HydraClient.noEntryPointDefined); }
                }));
            });

            describe("which is provided correctly", function() {
                beforeEach(function() {
                    this.apiDocumentation = { entryPoint: `${this.expectedUrl}api` };
                    this.data = [this.apiDocumentation];
                    this.apiDocumentationResponse = returnOk(this.data);
                    this.fetch.withArgs(`${this.expectedUrl}api/documentation`).returns(this.apiDocumentationResponse);
                    this.metadataProvider.parse.returns(Promise.resolve({ metadata: this.data }));
                });

                it("should call the given site url", run(async function() {
                    await this.client.getApiDocumentation(this.expectedUrl);

                    expect(this.fetch).toHaveBeenCalledWith(this.expectedUrl);
                }));

                it("should fetch the API documentation", run(async function() {
                    await this.client.getApiDocumentation(this.expectedUrl);

                    expect(this.fetch).toHaveBeenCalledWith(`${this.expectedUrl}api/documentation`);
                }));

                it("should parse API documentation with a metadata provider", run(async function() {
                    await this.client.getApiDocumentation(this.expectedUrl);

                    (<any>expect(this.metadataProvider.parse)).toHaveBeenCalledWith(this.apiDocumentationResponse);
                }));

                it("should return a correct ApiDocumentation instance", run(async function() {
                    let result = await this.client.getApiDocumentation(this.expectedUrl);

                    expect(result).toEqual(jasmine.any(ApiDocumentation));
                    expect(result.client).toBe(this.client);
                }));
            });
        });

        afterEach(function() {
            this.fetch.restore();
        });
    });
});
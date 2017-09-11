import * as sinon from "sinon";
import {run} from "../testing/AsyncHelper";
import {returnOk, returnNotFound} from "../testing/ResponseHelper";
import {hydra} from "../src/namespaces";
import HydraClient from "../src/HydraClient";
import ApiDocumentation from "../src/ApiDocumentation";

describe("Given an instance of the HydraClient class", function() {
    beforeEach(function() {
        this.baseUrl = "http://temp.uri/";
        this.hypermediaProcessor = {
            supportedMediaTypes: ["application/ld+json"],
            process: sinon.stub()
        };
        this.resourceEnrichmentProvider = { enrichHypermedia: sinon.stub() };
        this.client = new HydraClient(true);
        this.currentHypermediaProcessors = (<any>HydraClient)._hypermediaProcessors;
        this.currentResourceEnrichmentProvider = (<any>HydraClient)._resourceEnrichmentProvider;
        (<any>HydraClient)._hypermediaProcessors = [];
        HydraClient.registerHypermediaProcessor(this.hypermediaProcessor);
        HydraClient.registerResourceEnrichmentProvider(this.resourceEnrichmentProvider);
        this.fetch = sinon.stub(window, "fetch");
    });

    it("should create an instance", function() {
        expect(this.client).toEqual(jasmine.any(HydraClient));
    });

    it("should register a hypermedia processor", function() {
        expect(this.client.getHypermediaProcessor(returnOk())).toBe(this.hypermediaProcessor);
    });

    it("should register a resource enrichment provider", function() {
        expect((<any>HydraClient)._resourceEnrichmentProvider).toBe(this.resourceEnrichmentProvider);
    });

    describe("when obtaining an API documentation", function() {
        describe("and no valid Url is given", function() {
            it("should throw", run(async function() {
                try { await this.client.getApiDocumentation({ iri: null }); }
                catch (e) { expect(e.message).toBe(HydraClient.noUrlProvided); }
            }));
        });

        describe("of which site's main document is not found", function() {
            beforeEach(function() {
                this.fetch.withArgs(this.baseUrl).returns(Promise.resolve(returnNotFound()));
            });

            it("should throw", run(async function() {
                try { await this.client.getApiDocumentation(this.baseUrl); }
                catch (e) { expect(e.message).toBe(HydraClient.invalidResponse + "404"); }
            }));
        });

        describe("which has no LINK header returned", function() {
            beforeEach(function() {
                this.fetch.withArgs(this.baseUrl).returns(Promise.resolve(returnOk()));
            });

            it("should throw", run(async function() {
                try { await this.client.getApiDocumentation(this.baseUrl); }
                catch (e) { expect(e.message).toBe(HydraClient.apiDocumentationNotProvided); }
            }));
        });

        describe("which is not provided within the LINK header", function() {
            beforeEach(function() {
                this.urlResponse = returnOk(this.baseUrl, {}, { "Link": `<${this.baseUrl}api/documentation>; rel="next"` });
                this.fetch.withArgs(this.baseUrl).returns(Promise.resolve(this.urlResponse));
            });

            it("should throw", run(async function() {
                try { this.client.getApiDocumentation(this.baseUrl); }
                catch (e) { expect(e.message).toBe(HydraClient.apiDocumentationNotProvided); }
            }));
        });

        describe("from a valid site", function() {
            beforeEach(function() {
                this.urlResponse = returnOk(this.baseUrl, {}, { "Link": `<${this.baseUrl}api/documentation>; rel="${hydra.apiDocumentation}"` });
                this.fetch.withArgs(this.baseUrl).returns(Promise.resolve(this.urlResponse));
            });

            describe("and that documentation is not found", function() {
                beforeEach(function() {
                    this.apiDocumentationResponse = returnNotFound();
                    this.fetch.withArgs(`${this.baseUrl}api/documentation`).returns(this.apiDocumentationResponse);
                });

                it("should throw", run(async function() {
                    try { this.client.getApiDocumentation({ iri: this.baseUrl }); }
                    catch (e) { expect(e.message).toBe(HydraClient.invalidResponse); }
                }));
            });

            describe("and that documentation is provided in an unsupported format", function() {
                beforeEach(function() {
                    let apiDocumentationUrl = `${this.baseUrl}api/documentation`;
                    this.apiDocumentationResponse = returnOk(apiDocumentationUrl, {}, { "Content-Type": "text/turtle" });
                    this.fetch.withArgs(apiDocumentationUrl).returns(this.apiDocumentationResponse);
                });

                it("should throw", run(async function() {
                    try { this.client.getApiDocumentation({ iri: this.baseUrl }); }
                    catch (e) { expect(e.message).toBe(HydraClient.responseFormatNotSupported); }
                }));
            });

            describe("and that documentation has no entry point provided", function() {
                beforeEach(function() {
                    this.apiDocumentationResponse = returnOk();
                    this.fetch.withArgs(`${this.baseUrl}api/documentation`).returns(this.apiDocumentationResponse);
                    this.hypermediaProcessor.process.returns({});
                });

                it("should throw", run(async function() {
                    try { this.client.getApiDocumentation({ iri: this.baseUrl }); }
                    catch (e) { expect(e.message).toBe(HydraClient.noEntryPointDefined); }
                }));
            });

            describe("which is provided correctly", function() {
                beforeEach(function() {
                    let apiDocumentationUrl = `${this.baseUrl}api/documentation`;
                    this.apiDocumentation = { entryPoint: `${this.baseUrl}api` };
                    this.resourceEnrichmentProvider.enrichHypermedia.callsFake(resource => resource);
                    this.data = [this.apiDocumentation];
                    this.apiDocumentationResponse = returnOk(apiDocumentationUrl, this.data);
                    this.fetch.withArgs(apiDocumentationUrl).returns(this.apiDocumentationResponse);
                    this.hypermediaProcessor.process.returns(Promise.resolve({ hypermedia: this.data }));
                });

                it("should call the given site url", run(async function() {
                    await this.client.getApiDocumentation(this.baseUrl);

                    expect(this.fetch).toHaveBeenCalledWith(this.baseUrl);
                }));

                it("should fetch the API documentation", run(async function() {
                    await this.client.getApiDocumentation(this.baseUrl);

                    expect(this.fetch).toHaveBeenCalledWith(`${this.baseUrl}api/documentation`);
                }));

                it("should process API documentation with a hypermedia processor", run(async function() {
                    await this.client.getApiDocumentation(this.baseUrl);

                    (<any>expect(this.hypermediaProcessor.process)).toHaveBeenCalledWith(this.apiDocumentationResponse);
                }));

                it("should return a correct ApiDocumentation instance", run(async function() {
                    let result = await this.client.getApiDocumentation(this.baseUrl);

                    expect(result).toEqual(jasmine.any(ApiDocumentation));
                    expect(result.client).toBe(this.client);
                }));
            });
        });
    });

    describe("when fetching a resource", function() {
        beforeEach(function() {
            this.resourceUrl = "http://temp.uri/resource2";
        });

        describe("and no valid url was provided", function() {
            it("should throw", run(async function() {
                try { await this.client.getResource({ iri: null }); }
                catch (e) { expect(e.message).toBe(HydraClient.noUrlProvided); }
            }));
        });

        describe("and that resource was not found", function() {
            beforeEach(function() {
                this.fetch.withArgs(this.resourceUrl).returns(Promise.resolve(returnNotFound()));
            });

            it("should throw", run(async function() {
                try { await this.client.getResource(this.resourceUrl); }
                catch (e) { expect(e.message).toBe(HydraClient.invalidResponse + "404"); }
            }));
        });

        describe("and that resource was provided in an unsupported format", function() {
            beforeEach(function() {
                this.resourceResponse = returnOk(this.resourceUrl, {}, { "Content-Type": "text/turtle" });
                this.fetch.withArgs(this.resourceUrl).returns(Promise.resolve(this.resourceResponse));
            });

            it("should throw", run(async function() {
                try { await this.client.getResource(this.resourceUrl); }
                catch (e) { expect(e.message).toBe(HydraClient.responseFormatNotSupported); }
            }));
        });

        describe("and that resource was provided correctly", function() {
            beforeEach(run(async function() {
                this.resource = { hypermedia: {} };
                this.resourceEnrichmentProvider.enrichHypermedia.callsFake(resource => resource);
                this.resourceResponse = returnOk(this.resource);
                this.fetch.withArgs(this.resourceUrl).returns(Promise.resolve(this.resourceResponse));
                this.hypermediaProcessor.process.withArgs(this.resourceResponse, true)
                    .returns(Promise.resolve(this.resource));
                this.result = await this.client.getResource(this.resourceUrl);
            }));

            it("should process the response", run(async function() {
                expect(this.hypermediaProcessor.process).toHaveBeenCalledWith(this.resourceResponse, true);
            }));

            it("should enrich hypermedia", function() {
                expect(this.resourceEnrichmentProvider.enrichHypermedia).toHaveBeenCalledWith(this.resource);
            });

            it("should return a correct result", run(async function() {
                expect(this.result).toBe(this.resource);
            }));
        });
    });

    afterEach(function() {
        (<any>HydraClient)._hypermediaProcessors = this.currentHypermediaProcessors;
        (<any>HydraClient)._resourceEnrichmentProvider = this.currentResourceEnrichmentProvider;
        this.fetch.restore();
    });
});
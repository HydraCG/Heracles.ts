import * as sinon from "sinon";
import { ApiDocumentationPolicy } from "../src/ApiDocumentationPolicy";
import TypesCollection from "../src/DataModel/Collections/TypesCollection";
import HydraClient from "../src/HydraClient";
import { Level } from "../src/Level";
import { LinksPolicy } from "../src/LinksPolicy";
import { hydra } from "../src/namespaces";
import { run } from "../testing/AsyncHelper";
import { returnNotFound, returnOk } from "../testing/ResponseHelper";

describe("Given an instance of the HydraClient class", () => {
  beforeEach(() => {
    this.baseUrl = "http://temp.uri/";
    this.hypermediaProcessor = {
      process: sinon.stub(),
      supports: (response: Response) =>
        response.headers.get("Content-Type") === "application/ld+json" ? Level.FullSupport : Level.None
    };
    this.iriTemplateExpansionStrategy = {};
    this.httpCall = sinon.stub();
    this.cache = {};
    this.client = new HydraClient(
      [this.hypermediaProcessor],
      this.iriTemplateExpansionStrategy,
      LinksPolicy.Strict,
      ApiDocumentationPolicy.None,
      this.httpCall,
      this.cache
    );
  });

  it("should register a hypermedia processor", () => {
    expect(this.client.getHypermediaProcessor(returnOk())).toBe(this.hypermediaProcessor);
  });

  describe("when obtaining an API documentation", () => {
    beforeEach(() => {
      this.cache.getItem = sinon.stub().returns(null);
    });

    describe("and no valid Url is given", () => {
      it(
        "should throw",
        run(async () => {
          try {
            await this.client.getApiDocumentation({ iri: null, type: TypesCollection.empty });
          } catch (e) {
            expect(e.message).toBe(HydraClient.noUrlProvided);
          }
        })
      );
    });

    describe("of which site's main document is not found", () => {
      beforeEach(() => {
        this.httpCall.withArgs(this.baseUrl).returns(Promise.resolve(returnNotFound()));
      });

      it(
        "should throw",
        run(async () => {
          try {
            await this.client.getApiDocumentation(this.baseUrl);
          } catch (e) {
            expect(e.message).toBe(HydraClient.invalidResponse + "404");
          }
        })
      );
    });

    describe("which has no LINK header returned", () => {
      beforeEach(() => {
        this.httpCall.withArgs(this.baseUrl).returns(Promise.resolve(returnOk()));
      });

      it(
        "should throw",
        run(async () => {
          try {
            await this.client.getApiDocumentation(this.baseUrl);
          } catch (e) {
            expect(e.message).toBe(HydraClient.apiDocumentationNotProvided);
          }
        })
      );
    });

    describe("which is not provided within the LINK header", () => {
      beforeEach(() => {
        this.urlResponse = returnOk(this.baseUrl, {}, { Link: `<${this.baseUrl}api/documentation>; rel="next"` });
        this.httpCall.withArgs(this.baseUrl).returns(Promise.resolve(this.urlResponse));
      });

      it(
        "should throw",
        run(async () => {
          try {
            await this.client.getApiDocumentation(this.baseUrl);
          } catch (e) {
            expect(e.message).toBe(HydraClient.apiDocumentationNotProvided);
          }
        })
      );
    });

    describe("from a valid site", () => {
      beforeEach(() => {
        this.urlResponse = returnOk(
          this.baseUrl,
          {},
          {
            Link: `<${this.baseUrl}api/documentation>; rel="${hydra.apiDocumentation}"`
          }
        );
        this.httpCall.withArgs(this.baseUrl).returns(Promise.resolve(this.urlResponse));
      });

      describe("and that documentation is not found", () => {
        beforeEach(() => {
          this.apiDocumentationResponse = returnNotFound();
          this.httpCall.withArgs(`${this.baseUrl}api/documentation`).returns(this.apiDocumentationResponse);
        });

        it(
          "should throw",
          run(async () => {
            try {
              await this.client.getApiDocumentation({ iri: this.baseUrl, type: TypesCollection.empty });
            } catch (e) {
              expect(e.message).toMatch(HydraClient.invalidResponse);
            }
          })
        );
      });

      describe("and that documentation is provided in an unsupported format", () => {
        beforeEach(() => {
          const apiDocumentationUrl = `${this.baseUrl}api/documentation`;
          this.apiDocumentationResponse = returnOk(apiDocumentationUrl, {}, { "Content-Type": "text/turtle" });
          this.httpCall.withArgs(apiDocumentationUrl).returns(this.apiDocumentationResponse);
        });

        it(
          "should throw",
          run(async () => {
            try {
              await this.client.getApiDocumentation({ iri: this.baseUrl, type: TypesCollection.empty });
            } catch (e) {
              expect(e.message).toBe(HydraClient.responseFormatNotSupported);
            }
          })
        );
      });

      describe("and that documentation has no entry point provided", () => {
        beforeEach(() => {
          this.apiDocumentationResponse = returnOk();
          this.httpCall.withArgs(`${this.baseUrl}api/documentation`).returns(this.apiDocumentationResponse);
          this.hypermediaProcessor.process.returns({ ofType: () => ({ first: () => null }) });
          this.cache.all = sinon.stub().returns([]);
        });

        it(
          "should throw",
          run(async () => {
            try {
              await this.client.getApiDocumentation({ iri: this.baseUrl, type: TypesCollection.empty });
            } catch (e) {
              expect(e.message).toBe(HydraClient.noEntryPointDefined);
            }
          })
        );
      });

      describe("which is provided correctly", () => {
        beforeEach(
          run(async () => {
            this.apiDocumentationUrl = `${this.baseUrl}api/documentation`;
            this.apiDocumentation = { entryPoint: `${this.baseUrl}api`, type: [hydra.ApiDocumentation] };
            this.data = [this.apiDocumentation];
            (this.data as any).ofType = sinon.stub().returns({ first: sinon.stub().returns(this.apiDocumentation) });
            this.apiDocumentationResponse = returnOk(this.apiDocumentationUrl, this.data);
            this.httpCall.withArgs(this.apiDocumentationUrl).returns(this.apiDocumentationResponse);
            this.hypermediaProcessor.process.returns(Promise.resolve(this.data));
            this.cache.all = sinon.stub().returns([]);
            this.cache.setItem = sinon.stub();
            await this.client.getApiDocumentation(this.baseUrl);
          })
        );

        it("should call the given site url", () => {
          expect(this.httpCall).toHaveBeenCalledWith(this.baseUrl);
        });

        it("should fetch the API documentation", () => {
          expect(this.httpCall).toHaveBeenCalledWith(`${this.baseUrl}api/documentation`);
        });

        it("should process API documentation with a hypermedia processor", () => {
          (expect(this.hypermediaProcessor.process) as any).toHaveBeenCalledWith(
            this.apiDocumentationResponse,
            this.client,
            {
              apiDocumentationPolicy: ApiDocumentationPolicy.None,
              apiDocumentations: [],
              auxiliaryOriginalUrl: this.baseUrl,
              auxiliaryResponse: this.urlResponse,
              linksPolicy: LinksPolicy.Strict,
              originalUrl: this.apiDocumentationUrl
            }
          );
        });

        it("should try obtaining an API documentation from cache", () => {
          expect(this.cache.getItem).toHaveBeenCalledWith(this.apiDocumentationUrl);
        });

        it("should store obtained API documentation in cache", () => {
          expect(this.cache.setItem).toHaveBeenCalledWith(this.apiDocumentationUrl, this.apiDocumentation);
        });

        it("should obtain all cached API documentations so far", () => {
          expect(this.cache.all).toHaveBeenCalledOnce();
        });
      });
    });
  });

  describe("when fetching a resource", () => {
    beforeEach(() => {
      this.resourceUrl = "http://temp.uri/resource2";
    });

    describe("and no valid url was provided", () => {
      it(
        "should throw",
        run(async () => {
          try {
            await this.client.getResource({ iri: null, type: TypesCollection.empty });
          } catch (e) {
            expect(e.message).toBe(HydraClient.noUrlProvided);
          }
        })
      );
    });

    describe("and that resource was not found", () => {
      beforeEach(() => {
        this.httpCall.withArgs(this.resourceUrl).returns(Promise.resolve(returnNotFound()));
      });

      it(
        "should throw",
        run(async () => {
          try {
            await this.client.getResource(this.resourceUrl);
          } catch (e) {
            expect(e.message).toBe(HydraClient.invalidResponse + "404");
          }
        })
      );
    });

    describe("and that resource was provided in an unsupported format", () => {
      beforeEach(() => {
        this.resourceResponse = returnOk(this.resourceUrl, {}, { "Content-Type": "text/turtle" });
        this.httpCall.withArgs(this.resourceUrl).returns(Promise.resolve(this.resourceResponse));
      });

      it(
        "should throw",
        run(async () => {
          try {
            await this.client.getResource(this.resourceUrl);
          } catch (e) {
            expect(e.message).toBe(HydraClient.responseFormatNotSupported);
          }
        })
      );
    });

    describe("and that resource was provided correctly", () => {
      beforeEach(
        run(async () => {
          this.resource = {};
          this.resourceResponse = returnOk(this.resourceUrl, this.resource);
          this.httpCall.withArgs(this.resourceUrl).returns(Promise.resolve(this.resourceResponse));
          this.hypermediaProcessor.process.withArgs(this.resourceResponse).returns(Promise.resolve(this.resource));
          this.cache.all = sinon.stub().returns([]);
          this.result = await this.client.getResource(this.resourceUrl);
        })
      );

      it("should process the response", () => {
        expect(this.hypermediaProcessor.process).toHaveBeenCalledWith(this.resourceResponse);
      });

      it("should return a correct result", () => {
        expect(this.result).toBe(this.resource);
      });

      it("should obtain all cached API documentations", () => {
        expect(this.cache.all).toHaveBeenCalledOnce();
      });
    });
  });

  describe("when invoking an operation", () => {
    beforeEach(() => {
      this.operation = { target: { iri: "some:iri" } };
      this.body = {};
      this.parameters = {};
      this.iriTemplateExpansionStrategy.createRequest = sinon.stub().returns(this.operation);
    });

    describe("and valid operation was provided", () => {
      beforeEach(
        run(async () => {
          await this.client.invoke(this.operation, this.body, this.parameters);
        })
      );

      it("should create a request operation with the strategy provided", () => {
        expect(this.iriTemplateExpansionStrategy.createRequest).toHaveBeenCalledWith(
          this.operation,
          this.body,
          this.parameters
        );
      });

      it("should execute the request", () => {
        expect(this.httpCall).toHaveBeenCalledWith(this.operation.target.iri);
      });
    });

    describe("and no valid operation was provided", () => {
      it(
        "should throw",
        run(async () => {
          try {
            await this.client.invoke(null);
          } catch (e) {
            expect(e.message).toBe(HydraClient.noOperationProvided);
          }
        })
      );
    });
  });
});

import * as sinon from "sinon";
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
    this.fetch = sinon.stub();
    this.client = new HydraClient(
      [this.hypermediaProcessor],
      this.iriTemplateExpansionStrategy,
      LinksPolicy.Strict,
      this.fetch
    );
  });

  it("should create an instance", () => {
    expect(this.client).toEqual(jasmine.any(HydraClient));
  });

  it("should register a hypermedia processor", () => {
    expect(this.client.getHypermediaProcessor(returnOk())).toBe(this.hypermediaProcessor);
  });

  describe("when obtaining an API documentation", () => {
    describe("and no valid Url is given", () => {
      it(
        "should throw",
        run(async () => {
          try {
            await this.client.getApiDocumentation({ iri: null });
          } catch (e) {
            expect(e.message).toBe(HydraClient.noUrlProvided);
          }
        })
      );
    });

    describe("of which site's main document is not found", () => {
      beforeEach(() => {
        this.fetch.withArgs(this.baseUrl).returns(Promise.resolve(returnNotFound()));
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
        this.fetch.withArgs(this.baseUrl).returns(Promise.resolve(returnOk()));
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
        this.fetch.withArgs(this.baseUrl).returns(Promise.resolve(this.urlResponse));
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
        this.fetch.withArgs(this.baseUrl).returns(Promise.resolve(this.urlResponse));
      });

      describe("and that documentation is not found", () => {
        beforeEach(() => {
          this.apiDocumentationResponse = returnNotFound();
          this.fetch.withArgs(`${this.baseUrl}api/documentation`).returns(this.apiDocumentationResponse);
        });

        it(
          "should throw",
          run(async () => {
            try {
              await this.client.getApiDocumentation({ iri: this.baseUrl });
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
          this.fetch.withArgs(apiDocumentationUrl).returns(this.apiDocumentationResponse);
        });

        it(
          "should throw",
          run(async () => {
            try {
              await this.client.getApiDocumentation({ iri: this.baseUrl });
            } catch (e) {
              expect(e.message).toBe(HydraClient.responseFormatNotSupported);
            }
          })
        );
      });

      describe("and that documentation has no entry point provided", () => {
        beforeEach(() => {
          this.apiDocumentationResponse = returnOk();
          this.fetch.withArgs(`${this.baseUrl}api/documentation`).returns(this.apiDocumentationResponse);
          this.hypermediaProcessor.process.returns({ hypermedia: { ofType: () => ({ first: () => null }) } });
        });

        it(
          "should throw",
          run(async () => {
            try {
              await this.client.getApiDocumentation({ iri: this.baseUrl });
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
            this.apiDocumentation = { entryPoint: `${this.baseUrl}api` };
            this.data = [this.apiDocumentation];
            (this.data as any).ofType = sinon.stub().returns({ first: sinon.stub().returns(this.apiDocumentation) });
            this.apiDocumentationResponse = returnOk(this.apiDocumentationUrl, this.data);
            this.fetch.withArgs(this.apiDocumentationUrl).returns(this.apiDocumentationResponse);
            this.hypermediaProcessor.process.returns(Promise.resolve({ hypermedia: this.data }));
            await this.client.getApiDocumentation(this.baseUrl);
          })
        );

        it("should call the given site url", () => {
          expect(this.fetch).toHaveBeenCalledWith(this.baseUrl);
        });

        it("should fetch the API documentation", () => {
          expect(this.fetch).toHaveBeenCalledWith(`${this.baseUrl}api/documentation`);
        });

        it("should process API documentation with a hypermedia processor", () => {
          (expect(this.hypermediaProcessor.process) as any).toHaveBeenCalledWith(
            this.apiDocumentationResponse,
            this.client,
            {
              auxiliaryResponse: this.urlResponse,
              linksPolicy: LinksPolicy.Strict,
              originalUrl: this.apiDocumentationUrl
            }
          );
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
            await this.client.getResource({ iri: null });
          } catch (e) {
            expect(e.message).toBe(HydraClient.noUrlProvided);
          }
        })
      );
    });

    describe("and that resource was not found", () => {
      beforeEach(() => {
        this.fetch.withArgs(this.resourceUrl).returns(Promise.resolve(returnNotFound()));
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
        this.fetch.withArgs(this.resourceUrl).returns(Promise.resolve(this.resourceResponse));
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
          this.resource = { hypermedia: {} };
          this.resourceResponse = returnOk(this.resource);
          this.fetch.withArgs(this.resourceUrl).returns(Promise.resolve(this.resourceResponse));
          this.hypermediaProcessor.process.withArgs(this.resourceResponse).returns(Promise.resolve(this.resource));
          this.result = await this.client.getResource(this.resourceUrl);
        })
      );

      it("should process the response", () => {
        expect(this.hypermediaProcessor.process).toHaveBeenCalledWith(this.resourceResponse);
      });

      it("should return a correct result", () => {
        expect(this.result).toBe(this.resource);
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
        expect(this.fetch).toHaveBeenCalledWith(this.operation.target.iri);
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

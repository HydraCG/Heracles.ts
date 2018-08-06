import * as sinon from "sinon";
import JsonLdHypermediaProcessor from "../../src/JsonLd/JsonLdHypermediaProcessor";
import { hydra } from "../../src/namespaces";
import { run } from "../../testing/AsyncHelper";
import HydraResourceMatcher from "../../testing/HydraResourceMatcher";
import { returnOk } from "../../testing/ResponseHelper";
import * as jsonLdContext from "./context.json";
import * as inputJsonLd from "./input.json";
import * as nestedResourcesInputJsonLd from "./nestedResourcesInput.json";

describe("Given instance of the JsonLdHypermediaProcessor class", () => {
  beforeEach(() => {
    jasmine.addMatchers({ toBeLike: () => new HydraResourceMatcher() });
    this.indirectTypingProvider = {
      isOfType: (expectedType, processingState) =>
        processingState.processedObject["@type"] instanceof Array &&
        processingState.processedObject["@type"].indexOf(expectedType) !== -1
    };
    this.hypermediaProcessor = new JsonLdHypermediaProcessor(this.indirectTypingProvider);
  });

  it("should expose supported media types", () => {
    expect(this.hypermediaProcessor.supportedMediaTypes).toEqual(["application/ld+json", "application/json"]);
  });

  describe("when parsing", () => {
    describe("JSON response", () => {
      beforeEach(
        run(async () => {
          this.fetch = sinon.stub(window, "fetch");
          this.fetch.returns(Promise.resolve(jsonLdContext));
          this.response = returnOk(
            "http://temp.uri/api",
            {},
            {
              "Content-Type": "application/json",
              "Link": "<context.jsonld>; rel=\"http://www.w3.org/ns/json-ld#context\"; type=\"application/ld+json\""
            }
          );
          this.result = await this.hypermediaProcessor.process(this.response, null);
        })
      );

      it("should obtain JSON-LD context", () => {
        expect(this.fetch).toHaveBeenCalledOnce();
        expect(this.fetch.firstCall.args[0]).toBe("http://temp.uri/api/context.jsonld");
        expect(this.fetch.firstCall.args[1]).toEqual({ headers: { Accept: "application/ld+json" } });
      });

      afterEach(() => {
        this.fetch.restore();
      });
    });

    describe("JSON-LD response", () => {
      beforeEach(
        run(async () => {
          this.response = returnOk("http://temp.uri/api", inputJsonLd);
          this.result = await this.hypermediaProcessor.process(this.response, null);
        })
      );

      it("should process data", () => {
        expect(this.result).toEqual(inputJsonLd);
      });

      it("should discover all collections", () => {
        expect(this.result.hypermedia.collections.length).toBe(2);
      });

      it("should discover people collection", () => {
        expect(this.result.hypermedia.collections.first().iri).toMatch("/api/people$");
      });

      it("should discover events collection", () => {
        expect(this.result.hypermedia.collections.last().iri).toMatch("/api/events$");
      });

      it("should separate hypermedia", () => {
        expect(this.result.hypermedia).toBeLike([
          {
            collections: [
              {
                collections: [],
                iri: "http://temp.uri/api/people",
                links: [],
                operations: [],
                type: []
              },
              {
                collections: [],
                getIterator: jasmine.any(Function),
                iri: "http://temp.uri/api/events",
                links: [
                  {
                    baseUrl: "http://temp.uri/api",
                    collections: [],
                    iri: "http://temp.uri/api/events/closed",
                    links: [],
                    operations: [],
                    relation: "http://temp.uri/vocab/closed-events",
                    target: { iri: "http://temp.uri/api/events/closed", type: [] },
                    type: [hydra.Link]
                  },
                  {
                    baseUrl: "http://temp.uri/api",
                    collections: [],
                    iri: "_:b0",
                    links: [],
                    mappings: [
                      {
                        collections: [],
                        iri: "_:b1",
                        links: [],
                        operations: [],
                        property: {
                          collections: [],
                          description: "",
                          displayName: "",
                          iri: hydra.freetextQuery,
                          links: [],
                          operations: [],
                          type: [],
                          valuesOfType: []
                        },
                        required: false,
                        type: [hydra.IriTemplateMapping],
                        variable: "searchPhrase",
                        variableRepresentation: {
                          collections: [],
                          iri: hydra.BasicRepresentation,
                          links: [],
                          operations: [],
                          type: []
                        }
                      }
                    ],
                    operations: [],
                    relation: hydra.search,
                    target: null,
                    template: "http://temp.uri/api/events{?searchPhrase}",
                    type: [hydra.TemplatedLink]
                  },
                  {
                    baseUrl: "http://temp.uri/api",
                    collections: [],
                    iri: "http://temp.uri/api/events?page=1",
                    links: [
                      {
                        baseUrl: "http://temp.uri/api",
                        collections: [],
                        iri: "http://temp.uri/api/events?page=1",
                        links: [],
                        operations: [],
                        relation: hydra.first,
                        target: { iri: "http://temp.uri/api/events?page=1", type: [] },
                        type: [hydra.Link]
                      },
                      {
                        baseUrl: "http://temp.uri/api",
                        collections: [],
                        iri: "http://temp.uri/api/events?page=9",
                        links: [],
                        operations: [],
                        relation: hydra.last,
                        target: { iri: "http://temp.uri/api/events?page=9", type: [] },
                        type: [hydra.Link]
                      }
                    ],
                    operations: [],
                    relation: hydra.view,
                    target: { iri: "_:b2", type: [] },
                    type: [hydra.Link]
                  },
                  {
                    baseUrl: "http://temp.uri/api",
                    collections: [],
                    iri: hydra.first,
                    links: [],
                    operations: [],
                    relation: hydra.first,
                    target: { iri: "http://temp.uri/api/events?page=1", type: [] },
                    type: [hydra.Link]
                  },
                  {
                    baseUrl: "http://temp.uri/api",
                    collections: [],
                    iri: hydra.last,
                    links: [],
                    operations: [],
                    relation: hydra.last,
                    target: { iri: "http://temp.uri/api/events?page=9", type: [] },
                    type: [hydra.Link]
                  }
                ],
                members: [
                  {
                    collections: [],
                    iri: "http://temp.uri/api/events/1",
                    links: [],
                    operations: [],
                    type: []
                  }
                ],
                operations: [],
                totalItems: 1,
                type: [hydra.Collection],
                view: {
                  collections: [],
                  first: {
                    baseUrl: "http://temp.uri/api",
                    collections: [],
                    iri: "http://temp.uri/api/events?page=1",
                    links: [],
                    operations: [],
                    relation: hydra.first,
                    target: { iri: "http://temp.uri/api/events?page=1", type: [] },
                    type: [hydra.Link]
                  },
                  iri: "http://temp.uri/api/events?page=1",
                  last: {
                    baseUrl: "http://temp.uri/api",
                    collections: [],
                    iri: "http://temp.uri/api/events?page=9",
                    links: [],
                    operations: [],
                    relation: hydra.last,
                    target: { iri: "http://temp.uri/api/events?page=9", type: [] },
                    type: [hydra.Link]
                  },
                  links: [
                    {
                      baseUrl: "http://temp.uri/api",
                      collections: [],
                      iri: "http://temp.uri/api/events?page=1",
                      links: [],
                      operations: [],
                      relation: hydra.first,
                      target: { iri: "http://temp.uri/api/events?page=1", type: [] },
                      type: [hydra.Link]
                    },
                    {
                      baseUrl: "http://temp.uri/api",
                      collections: [],
                      iri: "http://temp.uri/api/events?page=9",
                      links: [],
                      operations: [],
                      relation: hydra.last,
                      target: { iri: "http://temp.uri/api/events?page=9", type: [] },
                      type: [hydra.Link]
                    }
                  ],
                  operations: [],
                  type: [hydra.PartialCollectionView]
                }
              }
            ],
            iri: "http://temp.uri/api",
            links: [],
            operations: [],
            type: [hydra.EntryPoint]
          }
        ]);
      });

      describe("response with nested resources", () => {
        beforeEach(
          run(async () => {
            this.response = returnOk("http://temp.uri/api/people/markus", nestedResourcesInputJsonLd);
            const result = await this.hypermediaProcessor.process(this.response, false);
            this.markus = result.hypermedia.where(control => control.iri.match(/markus/)).first();
            this.karol = this.markus.links.withRelationOf("http://schema.org/knows").first().target;
          })
        );

        it("should gain access to outer resource's links", () => {
          expect(this.markus.links.withRelationOf("http://xmlns.com/foaf/0.1/homepage").first().target.iri).toBe(
            "http://temp.uri/api/people/markus/home-page"
          );
        });

        it("should gain access to inner resource's links", () => {
          expect(this.karol.links.withRelationOf("http://xmlns.com/foaf/0.1/homepage").first().target.iri).toBe(
            "http://temp.uri/api/people/karol/home-page"
          );
        });

        it("should have a nested resource's link", () => {
          expect(this.markus.links.withRelationOf("http://schema.org/knows").first().target).toBe(this.karol);
        });
      });
    });
  });
});

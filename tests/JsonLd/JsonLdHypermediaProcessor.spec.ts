import * as sinon from "sinon";
import { ITemplatedOperation } from "../../src/DataModel/ITemplatedOperation";
import JsonLdHypermediaProcessor from "../../src/JsonLd/JsonLdHypermediaProcessor";
import { hydra } from "../../src/namespaces";
import { run } from "../../testing/AsyncHelper";
import HydraResourceMatcher from "../../testing/HydraResourceMatcher";
import { returnOk } from "../../testing/ResponseHelper";
import * as collectionsInputJsonLd from "./collectionsInput.json";
import * as jsonLdContext from "./context.json";
import * as inputJsonLd from "./input.json";
import * as nestedResourcesInputJsonLd from "./nestedResourcesInput.json";
import * as operationInputJsonLd from "./operationInput.json";

const foaf = {
  homePage: "http://xmlns.com/foaf/0.1/homepage"
};

const schema = {
  Person: "http://schema.org/Person",
  knows: "http://schema.org/knows"
};

const api = {
  people: {
    karol: "http://temp.uri/api/people/karol",
    markus: "http://temp.uri/api/people/markus"
  }
};

describe("Given instance of the JsonLdHypermediaProcessor class", () => {
  beforeEach(() => {
    jasmine.addMatchers({ toBeLike: () => new HydraResourceMatcher() });
    this.indirectTypingProvider = {
      isOfType: (expectedType, processingState) =>
        processingState.processedObject["@type"] instanceof Array &&
        processingState.processedObject["@type"].indexOf(expectedType) !== -1
    };
    this.client = {};
    this.httpCall = sinon.stub();
    this.graphTransformer = { transform: sinon.stub().callsFake(_ => _) };
    this.hypermediaProcessor = new JsonLdHypermediaProcessor(
      this.indirectTypingProvider,
      this.httpCall,
      this.graphTransformer
    );
  });

  it("should expose supported media types", () => {
    expect(this.hypermediaProcessor.supportedMediaTypes).toEqual(["application/ld+json", "application/json"]);
  });

  describe("when parsing", () => {
    describe("JSON response", () => {
      beforeEach(
        run(async () => {
          this.httpCall.returns(Promise.resolve(jsonLdContext));
          this.response = returnOk(
            "http://temp.uri/api",
            {},
            {
              "Content-Type": "application/json",
              "Link": "<context.jsonld>; rel=\"http://www.w3.org/ns/json-ld#context\"; type=\"application/ld+json\""
            }
          );
          this.result = await this.hypermediaProcessor.process(this.response, this.client);
        })
      );

      it("should obtain JSON-LD context", () => {
        expect(this.httpCall).toHaveBeenCalledOnce();
        expect(this.httpCall.firstCall.args[0]).toBe("http://temp.uri/context.jsonld");
        expect(this.httpCall.firstCall.args[1]).toEqual({ headers: { Accept: "application/ld+json" } });
      });
    });

    describe("JSON-LD response", () => {
      beforeEach(
        run(async () => {
          this.response = returnOk("http://temp.uri/api", inputJsonLd);
          this.result = await this.hypermediaProcessor.process(this.response, this.client);
        })
      );

      it("should transform graph", () => {
        expect(this.graphTransformer.transform).toHaveBeenCalledOnce();
      });

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

      it("should provide response headers", () => {
        expect(this.result.hypermedia.headers.get("Content-Type")).toBe("application/ld+json");
      });

      it("should separate hypermedia", () => {
        expect(this.result.hypermedia).toBeLike([
          {
            collections: [
              {
                collections: [],
                iri: "http://temp.uri/api/people",
                links: [],
                manages: [],
                members: [],
                operations: [],
                totalItems: 0,
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
                    supportedOperations: [],
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
                    supportedOperations: [],
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
                    supportedOperations: [],
                    target: { iri: "_:b2", type: [] },
                    type: [hydra.Link]
                  },
                  {
                    baseUrl: "http://temp.uri/api",
                    collections: [],
                    iri: "http://temp.uri/api/events/1",
                    links: [],
                    operations: [],
                    relation: hydra.member,
                    supportedOperations: [],
                    target: { iri: "http://temp.uri/api/events/1", type: [] },
                    type: [hydra.Link]
                  },
                  {
                    baseUrl: "http://temp.uri/api",
                    collections: [],
                    iri: hydra.first,
                    links: [],
                    operations: [],
                    relation: hydra.first,
                    supportedOperations: [],
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
                    supportedOperations: [],
                    target: { iri: "http://temp.uri/api/events?page=9", type: [] },
                    type: [hydra.Link]
                  }
                ],
                manages: [],
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
            links: [
              {
                baseUrl: "http://temp.uri/api",
                collections: [],
                iri: "http://temp.uri/api/people",
                links: [],
                operations: [],
                relation: hydra.collection,
                supportedOperations: [],
                target: { iri: "http://temp.uri/api/people", type: [] },
                type: [hydra.Link]
              },
              {
                baseUrl: "http://temp.uri/api",
                collections: [],
                iri: "http://temp.uri/api/events",
                links: [],
                operations: [],
                relation: hydra.collection,
                supportedOperations: [],
                target: { iri: "http://temp.uri/api/events", type: [] },
                type: [hydra.Link]
              }
            ],
            operations: [],
            type: []
          }
        ]);
      });
    });

    describe("JSON-LD response with nested resources", () => {
      beforeEach(
        run(async () => {
          this.response = returnOk(api.people.markus, nestedResourcesInputJsonLd);
          const result = await this.hypermediaProcessor.process(this.response, this.client);
          this.markus = result.hypermedia.where(control => control.iri.match(/markus/)).first();
          this.karol = this.markus.links.withRelationOf(schema.knows).first().target;
        })
      );

      it("should gain access to outer resource's links", () => {
        expect(this.markus.links.withRelationOf(foaf.homePage).first().target.iri).toBe(
          `${api.people.markus}/home-page`
        );
      });

      it("should gain access to inner resource's links", () => {
        expect(this.karol.links.withRelationOf(foaf.homePage).first().target.iri).toBe(`${api.people.karol}/home-page`);
      });

      it("should have a nested resource's link", () => {
        expect(this.markus.links.withRelationOf(schema.knows).first().target).toBe(this.karol);
      });
    });

    describe("JSON-LD response with templated operation", () => {
      beforeEach(
        run(async () => {
          this.response = returnOk("http://temp.uri/api/people", operationInputJsonLd);
          const result = await this.hypermediaProcessor.process(this.response, this.client);
          this.addPerson = result.hypermedia.operations.withTemplate().first();
        })
      );

      it("should point to the collection", () => {
        expect((this.addPerson as ITemplatedOperation).expandTarget({ name: "test" }).target.iri).toBe(
          "http://temp.uri/api/people/test"
        );
      });
    });

    describe("JSON-LD response with collections", () => {
      beforeEach(
        run(async () => {
          this.indirectTypingProvider.isOfType = (expectedType, processingState) =>
            (processingState.processedObject["@type"] instanceof Array &&
              processingState.processedObject["@type"].indexOf(expectedType) !== -1) ||
            processingState.processedObject["@id"].indexOf("http://temp.uri/api/people") === 0;

          this.response = returnOk("http://temp.uri/api", collectionsInputJsonLd);
          const result = await this.hypermediaProcessor.process(this.response, this.client);
          this.people = result.hypermedia.collections.withMembersOfType(schema.Person).first();
          this.known = result.hypermedia.collections.withMembersInRelationWith(api.people.karol, schema.knows).first();
        })
      );

      it("should trim collections expecting schema:Person to people", () => {
        expect(this.people.iri).toBe("http://temp.uri/api/people");
      });

      it("should trim collections expecting schema:Person to known", () => {
        expect(this.known.iri).toBe("http://temp.uri/api/people/karol/knows");
      });
    });
  });
});

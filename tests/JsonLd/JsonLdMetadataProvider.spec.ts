import HydraClient from "../../src/HydraClient";
import JsonLdHypermediaProcessor from "../../src/JsonLd/JsonLdHypermediaProcessor";
import { hydra } from "../../src/namespaces";
import { run } from "../../testing/AsyncHelper";
import HydraResourceMatcher from "../../testing/HydraResourceMatcher";
import { returnOk } from "../../testing/ResponseHelper";
import * as inputJsonLd from "./input.json";
import * as nestedResourcesInputJsonLd from "./nestedResourcesInput.json";

describe("Given instance of the JsonLdHypermediaProcessor class", () => {
  beforeEach(() => {
    jasmine.addMatchers({ toBeLike: () => new HydraResourceMatcher() });
    this.hypermediaProcessors = HydraClient.hypermediaProcessors;
    HydraClient.hypermediaProcessors = [];
    HydraClient.registerHypermediaProcessor(new JsonLdHypermediaProcessor());
    this.hypermediaProcessor = new HydraClient().getHypermediaProcessor(returnOk());
  });

  it("should get itself registered", () => {
    expect(this.hypermediaProcessor).toEqual(jasmine.any(JsonLdHypermediaProcessor));
  });

  it("should expose supported media types", () => {
    expect(this.hypermediaProcessor.supportedMediaTypes).toEqual(["application/ld+json"]);
  });

  describe("when parsing", () => {
    beforeEach(
      run(async () => {
        this.response = returnOk("http://temp.uri/api", inputJsonLd);
        this.result = await this.hypermediaProcessor.process(this.response, false);
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
              iri: "http://temp.uri/api/events",
              links: [
                {
                  baseUrl: "http://temp.uri/api",
                  collections: [],
                  iri: "http://temp.uri/vocab/closed-events",
                  links: [],
                  operations: [],
                  relation: "http://temp.uri/vocab/closed-events",
                  target: { iri: "http://temp.uri/api/events/closed", type: [] },
                  type: [hydra.Link]
                },
                {
                  baseUrl: "http://temp.uri/api",
                  collections: [],
                  iri: "http://www.w3.org/ns/hydra/core#first",
                  links: [],
                  operations: [],
                  relation: "http://www.w3.org/ns/hydra/core#first",
                  target: { iri: "http://temp.uri/api/events?page=1", type: [] },
                  type: [hydra.Link]
                },
                {
                  baseUrl: "http://temp.uri/api",
                  collections: [],
                  iri: "http://www.w3.org/ns/hydra/core#last",
                  links: [],
                  operations: [],
                  relation: "http://www.w3.org/ns/hydra/core#last",
                  target: { iri: "http://temp.uri/api/events?page=9", type: [] },
                  type: [hydra.Link]
                },
                {
                  baseUrl: "http://temp.uri/api",
                  collections: [],
                  iri: "http://www.w3.org/ns/hydra/core#search",
                  links: [],
                  operations: [],
                  relation: "http://www.w3.org/ns/hydra/core#search",
                  target: null,
                  template: "http://temp.uri/api/events{?searchPhrase}",
                  type: [hydra.TemplatedLink]
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
              type: [hydra.Collection]
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

  afterEach(() => {
    HydraClient.hypermediaProcessors = this.hypermediaProcessors;
  });
});

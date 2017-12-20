import HydraClient from "../../src/HydraClient";
import JsonLdHypermediaProcessor from "../../src/JsonLd/JsonLdHypermediaProcessor";
import { hydra } from "../../src/namespaces";
import { run } from "../../testing/AsyncHelper";
import HydraResourceMatcher from "../../testing/HydraResourceMatcher";
import { returnOk } from "../../testing/ResponseHelper";
import * as inputJsonLd from "./input.json";

describe("Given instance of the JsonLdHypermediaProcessor class", () => {
  beforeEach(function() {
    jasmine.addMatchers({ toBeLike: () => new HydraResourceMatcher() });
    this.hypermediaProcessors = HydraClient.hypermediaProcessors;
    HydraClient.hypermediaProcessors = [];
    HydraClient.registerHypermediaProcessor(new JsonLdHypermediaProcessor());
    this.hypermediaProcessor = new HydraClient().getHypermediaProcessor(returnOk());
  });

  it("should get itself registered", function() {
    expect(this.hypermediaProcessor).toEqual(jasmine.any(JsonLdHypermediaProcessor));
  });

  it("should expose supported media types", function() {
    expect(this.hypermediaProcessor.supportedMediaTypes).toEqual(["application/ld+json"]);
  });

  describe("when parsing", () => {
    beforeEach(
      run(async function() {
        this.response = returnOk("http://temp.uri/", inputJsonLd);
        this.result = await this.hypermediaProcessor.process(this.response, false);
      })
    );

    it("should process data", function() {
      expect(this.result).toEqual(inputJsonLd);
    });

    it("should separate hypermedia", function() {
      expect(this.result.hypermedia).toBeLike([
        {
          iri: "http://temp.uri/api/events",
          links: [
            {
              baseUrl: "http://temp.uri/",
              iri: "http://temp.uri/vocab/closed-events",
              links: [],
              operations: [],
              target: "http://temp.uri/api/events/closed",
              type: [hydra.Link]
            },
            {
              baseUrl: "http://temp.uri/",
              iri: "http://www.w3.org/ns/hydra/core#search",
              links: [],
              operations: [],
              target: null,
              template: "http://temp.uri/api/events{?searchPhrase}",
              type: [hydra.Link]
            }
          ],
          members: [
            {
              iri: "http://temp.uri/api/events/1",
              links: [],
              operations: [],
              type: []
            }
          ],
          operations: [],
          totalItems: 1,
          type: [hydra.Collection]
        },
        {
          iri: "http://temp.uri/",
          links: [],
          operations: [],
          type: []
        }
      ]);
    });
  });

  afterEach(function() {
    HydraClient.hypermediaProcessors = this.hypermediaProcessors;
  });
});

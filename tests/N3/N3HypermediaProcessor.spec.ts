import * as sinon from "sinon";
import TypesCollection from "../../src/DataModel/Collections/TypesCollection";
import N3HypermediaProcessor from "../../src/N3/N3HypermediaProcessor";
import { run } from "../../testing/AsyncHelper";
import HydraResourceMatcher from "../../testing/HydraResourceMatcher";
import { returnOk } from "../../testing/ResponseHelper";
import { default as inputTurtle } from "./input.ttl";

describe("Given instance of N3HypermediaProcessor class", () => {
  beforeEach(() => {
    jasmine.addMatchers({ toBeLike: () => new HydraResourceMatcher() });
    this.options = { originalUrl: "http://temp.uri/api" };
    this.resource = { hypermedia: {}, iri: this.options.originalUrl, type: TypesCollection.empty };
    this.jsonLdProcessor = { process: sinon.stub().returns(this.resource) };
    this.processor = new N3HypermediaProcessor(this.jsonLdProcessor);
    this.response = returnOk(this.options.originalUrl, inputTurtle, { "Content-Type": "text/turtle" });
    this.client = {};
  });

  describe("when extracting hypermedia", () => {
    beforeEach(
      run(async () => {
        this.result = await this.processor.process(this.response, this.client, this.options);
      })
    );

    it("should call JSON-LD hypermedia processor", () => {
      expect(this.jsonLdProcessor.process).toHaveBeenCalledOnce();
    });

    it(
      "should pass JSON-LD for hypermedia extraction",
      run(async () => {
        expect(await this.jsonLdProcessor.process.firstCall.args[0].json()).toBeLike([
          { "@id": "_:b0", "@type": "http://schema.org/Person" },
          { "@id": "_:b0", "http://schema.org/jobTitle": "Professor" },
          { "@id": "_:b0", "http://schema.org/name": "Jane Doe" },
          { "@id": "_:b0", "http://schema.org/telephone": "(425) 123-4567" },
          { "@id": "_:b0", "http://schema.org/url": { "@id": "http://www.janedoe.com" } }
        ]);
      })
    );

    it("should provide statements set", () => {
      expect(this.result.length).toBe(5);
    });

    it("should provide hypermedia container", () => {
      expect(this.result.hypermedia).not.toBeUndefined();
      expect(this.result.hypermedia).not.toBeNull();
    });

    it("should pass the client", () => {
      expect(this.jsonLdProcessor.process.firstCall.args[1]).toBe(this.client);
    });

    it("should pas original options", () => {
      expect(this.jsonLdProcessor.process.firstCall.args[2]).toBe(this.options);
    });
  });
});

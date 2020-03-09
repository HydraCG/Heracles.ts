import * as sinon from "sinon";
import TypesCollection from "../../src/DataModel/Collections/TypesCollection";
import { linksExtractor } from "../../src/JsonLd/linksExtractor";
import { LinksPolicy } from "../../src/LinksPolicy";
import { hydra } from "../../src/namespaces";
import HydraResourceMatcher from "../../testing/HydraResourceMatcher";

const baseUrl = "http://temp.uri/api/resource";

function linkOf(predicate: string, resource: string = null): object {
  const iri = predicate.indexOf("http:") === -1 ? `http://temp.uri/vocab#${predicate}` : predicate;
  return {
    baseUrl,
    collections: [],
    iri,
    links: [],
    operations: [],
    relation: iri,
    supportedOperations: [],
    target: resource != null ? { iri: resource, type: [] } : null,
    type: [resource !== null ? hydra.Link : hydra.TemplatedLink]
  };
}

describe("Given a resources with relations", () => {
  beforeEach(() => {
    jasmine.addMatchers({ toBeLike: () => new HydraResourceMatcher() });
    this.processingState = {
      baseUrl,
      createResource(iri, type) {
        return { iri, type: new TypesCollection(type || []) };
      },
      findRawResource: iri => this.graph.find(_ => _["@id"] === iri),
      getVisitedResource: () => null,
      markAsOwned: sinon.stub(),
      processedObject: this.resource,
      rootUrl: "http://temp.uri/"
    };
    this.explicitLink = { "@id": "http://temp.uri/vocab#explicit_link", "@type": [hydra.Link] };
    this.processingState.processedObject = this.resource = {};
    this.resource[this.explicitLink["@id"]] = [{ "@id": "some:explicit_link" }];
    this.resource["http://temp.uri/vocab#same_root_link"] = [{ "@id": `${this.processingState.rootUrl}some_resource` }];
    this.resource["http://temp.uri/vocab#http_link"] = [{ "@id": "http://other.uri/some_http_resource" }];
    this.resource["http://temp.uri/vocab#ftp_link"] = [{ "@id": "ftp://temp.uri/some_ftp_resource" }];
    this.resource["http://temp.uri/vocab#link"] = [{ "@id": "urn:name" }];
    this.resource[hydra.freetextQuery] = [{ "@id": "some:hydra_link" }];
    this.graph = [this.resource, this.explicitLink];
  });

  describe("when using strict links policy", () => {
    beforeEach(() => {
      this.processingState.linksPolicy = LinksPolicy.Strict;
    });

    it("should provide only explicitly marked links in strict mode", () => {
      expect(linksExtractor(this.graph, this.processingState)).toBeLike([
        linkOf(this.explicitLink["@id"], "some:explicit_link"),
        linkOf(hydra.freetextQuery)
      ]);
    });
  });

  describe("when using same root links policy", () => {
    beforeEach(() => {
      this.processingState.linksPolicy = LinksPolicy.SameRoot;
    });

    it("should provide only explicitly marked and same root url links", () => {
      expect(linksExtractor(this.graph, this.processingState)).toBeLike([
        linkOf(this.explicitLink["@id"], "some:explicit_link"),
        linkOf("same_root_link", `${this.processingState.rootUrl}some_resource`),
        linkOf(hydra.freetextQuery)
      ]);
    });
  });

  describe("when using all http links policy", () => {
    beforeEach(() => {
      this.processingState.linksPolicy = LinksPolicy.AllHttp;
    });

    it("should provide only explicitly marked links, same root urls and all HTTP links", () => {
      expect(linksExtractor(this.graph, this.processingState)).toBeLike([
        linkOf(this.explicitLink["@id"], "some:explicit_link"),
        linkOf("same_root_link", `${this.processingState.rootUrl}some_resource`),
        linkOf("http_link", "http://other.uri/some_http_resource"),
        linkOf(hydra.freetextQuery)
      ]);
    });
  });

  describe("when using all links policy", () => {
    beforeEach(() => {
      this.processingState.linksPolicy = LinksPolicy.All;
    });

    it("should provide all links", () => {
      expect(linksExtractor(this.graph, this.processingState)).toBeLike([
        linkOf(this.explicitLink["@id"], "some:explicit_link"),
        linkOf("same_root_link", `${this.processingState.rootUrl}some_resource`),
        linkOf("http_link", "http://other.uri/some_http_resource"),
        linkOf("ftp_link", "ftp://temp.uri/some_ftp_resource"),
        linkOf("link", "urn:name"),
        linkOf(hydra.freetextQuery)
      ]);
    });
  });
});

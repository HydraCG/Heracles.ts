import * as sinon from "sinon";
import TypesCollection from "../../src/DataModel/Collections/TypesCollection";
import { linksExtractor } from "../../src/JsonLd/linksExtractor";
import { LinksPolicy } from "../../src/LinksPolicy";
import { hydra } from "../../src/namespaces";
import HydraResourceMatcher from "../../testing/HydraResourceMatcher";

const baseUrl = "http://temp.uri/api/resource";

function linkOf(predicate: string, resource: any): object {
  resource.baseUrl = baseUrl;
  resource.collections = [];
  resource.links = [];
  resource.operations = [];
  resource.supportedOperations = [];
  resource.relation = predicate.indexOf("http:") === -1 ? `http://temp.uri/vocab#${predicate}` : predicate;
  resource.target = { iri: resource.iri, type: [] };
  return resource;
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
    this.resource[hydra.freetextQuery] = [{ "@id": "some:hydra_link" }];
    this.resource[this.explicitLink["@id"]] = [{ "@id": "some:explicit_link" }];
    this.resource["http://temp.uri/vocab#same_root_link"] = [{ "@id": `${this.processingState.rootUrl}some_resource` }];
    this.resource["http://temp.uri/vocab#http_link"] = [{ "@id": "http://other.uri/some_http_resource" }];
    this.resource["http://temp.uri/vocab#ftp_link"] = [{ "@id": "ftp://temp.uri/some_ftp_resource" }];
    this.resource["http://temp.uri/vocab#link"] = [{ "@id": "urn:name" }];
    this.graph = [this.resource, this.explicitLink];
  });

  describe("when using strict links policy", () => {
    beforeEach(() => {
      this.processingState.linksPolicy = LinksPolicy.Strict;
    });

    it("should provide only explicitly marked links in strict mode", () => {
      expect(linksExtractor(this.graph, this.processingState)).toBeLike([
        linkOf(this.explicitLink["@id"], { iri: "some:explicit_link", type: [hydra.Link] }),
        linkOf(hydra.freetextQuery, { iri: "some:hydra_link", type: [hydra.Link] })
      ]);
    });
  });

  describe("when using same root links policy", () => {
    beforeEach(() => {
      this.processingState.linksPolicy = LinksPolicy.SameRoot;
    });

    it("should provide only explicitly marked and same root url links", () => {
      expect(linksExtractor(this.graph, this.processingState)).toBeLike([
        linkOf(this.explicitLink["@id"], { iri: "some:explicit_link", type: [hydra.Link] }),
        linkOf("same_root_link", { iri: `${this.processingState.rootUrl}some_resource`, type: [hydra.Link] }),
        linkOf(hydra.freetextQuery, { iri: "some:hydra_link", type: [hydra.Link] })
      ]);
    });
  });

  describe("when using all http links policy", () => {
    beforeEach(() => {
      this.processingState.linksPolicy = LinksPolicy.AllHttp;
    });

    it("should provide only explicitly marked links, same root urls and all HTTP links", () => {
      expect(linksExtractor(this.graph, this.processingState)).toBeLike([
        linkOf(this.explicitLink["@id"], { iri: "some:explicit_link", type: [hydra.Link] }),
        linkOf("same_root_link", { iri: `${this.processingState.rootUrl}some_resource`, type: [hydra.Link] }),
        linkOf("http_link", { iri: "http://other.uri/some_http_resource", type: [hydra.Link] }),
        linkOf(hydra.freetextQuery, { iri: "some:hydra_link", type: [hydra.Link] })
      ]);
    });
  });

  describe("when using all links policy", () => {
    beforeEach(() => {
      this.processingState.linksPolicy = LinksPolicy.AllHttp;
    });

    it("should provide all links", () => {
      expect(linksExtractor(this.graph, this.processingState)).toBeLike([
        linkOf(this.explicitLink["@id"], { iri: "some:explicit_link", type: [hydra.Link] }),
        linkOf("same_root_link", { iri: `${this.processingState.rootUrl}some_resource`, type: [hydra.Link] }),
        linkOf("http_link", { iri: "http://other.uri/some_http_resource", type: [hydra.Link] }),
        linkOf("ftp_link", { iri: "ftp://temp.uri/some_ftp_resource", type: [hydra.Link] }),
        linkOf("link", { iri: "urn:name", type: [hydra.Link] }),
        linkOf(hydra.freetextQuery, { iri: "some:hydra_link", type: [hydra.Link] })
      ]);
    });
  });
});

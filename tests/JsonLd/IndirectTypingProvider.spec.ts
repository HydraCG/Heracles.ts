import * as sinon from "sinon";
import IndirectTypingProvider from "../../src/JsonLd/IndirectTypingProvider";
import { hydra } from "../../src/namespaces";
import { run } from "../../testing/AsyncHelper";

describe("Given instance of the IndirectTypingProvider class", () => {
  beforeEach(() => {
    this.ontologyProvider = {};
    const processedObject = { "@id": "some:resource", "@type": [hydra.ApiDocumentation] };
    const payload = [{ "@id": "some:iri", "some:predicate": [processedObject] }];
    this.processingState = {
      findRawResource: iri => payload.find(_ => _["@id"] === iri),
      parentIri: "some:iri",
      processedObject
    };
    this.processingState.processedObject[hydra.entrypoint] = { "@value": "http://temp.uri/" };
    this.provider = new IndirectTypingProvider(this.ontologyProvider);
  });

  it(
    "should check direct class typing",
    run(async () => {
      expect(await this.provider.isOfType(hydra.ApiDocumentation, this.processingState)).toBeTruthy();
    })
  );

  describe("when checking against domain", () => {
    beforeEach(
      run(async () => {
        this.processingState.processedObject["@type"] = [];
        this.ontologyProvider.getDomainFor = sinon.stub().returns(hydra.ApiDocumentation);

        this.result = await this.provider.isOfType(hydra.ApiDocumentation, this.processingState);
      })
    );

    it("should confirm that type", () => {
      expect(this.result).toBeTruthy();
    });

    it("should check domain", () => {
      expect(this.ontologyProvider.getDomainFor).toHaveBeenCalledWith(hydra.entrypoint);
    });
  });

  describe("when checking against range", () => {
    beforeEach(
      run(async () => {
        this.processingState.processedObject["@type"] = [];
        this.ontologyProvider.getDomainFor = sinon.stub().returns(null);
        this.ontologyProvider.getRangeFor = sinon.stub().returns(hydra.ApiDocumentation);

        this.result = await this.provider.isOfType(hydra.ApiDocumentation, this.processingState);
      })
    );

    it("should confirm that type", () => {
      expect(this.result).toBeTruthy();
    });

    it("should check domain", () => {
      expect(this.ontologyProvider.getRangeFor).toHaveBeenCalledWith("some:predicate");
    });
  });
});

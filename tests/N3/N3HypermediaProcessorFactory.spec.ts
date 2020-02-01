import * as sinon from "sinon";
import { IHydraClientFactory } from "../../src/IHydraClientFactory";
import N3HypermediaProcessorFactory from "../../src/N3/N3HypermediaProcessorFactory";

describe("Given instance of the N3HypermediaProcessorFactory class", () => {
  describe("when creating a hypermedia processor", () => {
    beforeEach(() => {
      this.hydraClientFactory = { createProcessorToHandle: sinon.stub().returns(null) };
      this.hypermediaProcessor = N3HypermediaProcessorFactory.instance(this.hydraClientFactory as IHydraClientFactory);
    });

    it("should obtain JSON-LD hypermedia processor", () => {
      expect(this.hydraClientFactory.createProcessorToHandle).toHaveBeenCalledWith("application/ld+json");
    });
  });
});

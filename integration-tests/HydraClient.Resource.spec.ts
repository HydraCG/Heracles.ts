import HydraClientFactory from "../src/HydraClientFactory";
import N3HypermediaProcessorFactory from "../src/N3/N3HypermediaProcessorFactory";
import { run } from "../testing/AsyncHelper";

describe("Having a Hydra client", () => {
  beforeEach(() => {
    this.url = "http://localhost:3000/";
    this.client = HydraClientFactory.configure()
      .withDefaults()
      .withFactory(N3HypermediaProcessorFactory.instance)
      .andCreate();
  });

  describe("while browsing a website", () => {
    describe("and obtaining some resource", () => {
      beforeEach(
        run(async () => {
          this.resource = await this.client.getResource(`${this.url}resource`);
        })
      );

      it("should obtain four hypermedia controls", () => {
        expect(this.resource.hypermedia.length).toBe(4);
      });

      it("should obtain a schema:AddAction operations", () => {
        const operations = this.resource.hypermedia.where(_ =>
          _.operations.ofType("http://schema.org/AddAction").any()
        );
        expect(operations.length).toBe(2);
      });

      it("should obtain a collection of events", () => {
        const collection = this.resource.hypermedia.collections.where(item => item.iri.match("/api/events$")).first();
        expect(collection).toBeDefined();
        expect(collection).not.toBeNull();
      });
    });
  });
});

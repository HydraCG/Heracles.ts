import * as sinon from "sinon";
import HydraClientFactory from "../src/HydraClientFactory";
import { Level } from "../src/Level";
import { LinksPolicy } from "../src/LinksPolicy";

describe("Given instance of HydraClientFactory class", () => {
  beforeEach(() => {
    this.factory = HydraClientFactory.configure().withDefaults();
    this.processor = { process: sinon.stub(), supports: sinon.stub().returns(Level.FullSupport) };
    this.response = { headers: { get: sinon.stub().returns([]) } };
  });

  it("should create a client interpreting all relations as links", () => {
    expect((this.factory.withAllLinks().andCreate() as any).linksPolicy).toBe(LinksPolicy.All);
  });

  it("should create a client interpreting all HTTP related resources as links", () => {
    expect((this.factory.withAllHttpLinks().andCreate() as any).linksPolicy).toBe(LinksPolicy.AllHttp);
  });

  it("should create a client interpreting all related resources with same root URL as links", () => {
    expect((this.factory.withSameRootLinks().andCreate() as any).linksPolicy).toBe(LinksPolicy.SameRoot);
  });

  it("should create a client with customer hypermedia processor", () => {
    expect(
      this.factory
        .with(this.processor)
        .andCreate()
        .getHypermediaProcessor(this.response)
    ).toBe(this.processor);
  });
});

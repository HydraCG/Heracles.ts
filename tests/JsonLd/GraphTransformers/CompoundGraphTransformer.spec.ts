import * as sinon from "sinon";
import CompoundGraphTransformer from "../../../src/JsonLd/GraphTransformations/CompoundGraphTransformer";
import { run } from "../../../testing/AsyncHelper";

describe("Given instance of CompoundGraphTransformer class", () => {
  beforeEach(() => {
    this.graph = [];
    this.processor = {};
    this.primaryGraphTransformer = { transform: sinon.stub().callsFake(_ => _) };
    this.secondaryGraphTransformer = { transform: sinon.stub().callsFake(_ => _) };
    this.transformer = new CompoundGraphTransformer(this.primaryGraphTransformer, this.secondaryGraphTransformer);
  });

  describe("when transforming", () => {
    beforeEach(
      run(async () => {
        this.result = await this.transformer.transform(this.graph, this.processor);
      })
    );

    it("should call all underlying graph transformers", () => {
      expect(this.primaryGraphTransformer.transform).toHaveBeenCalledWith(this.graph, this.processor);
      expect(this.secondaryGraphTransformer.transform).toHaveBeenCalledWith(this.graph, this.processor);
    });

    it("should provide resulting graph", () => {
      expect(this.result).toBe(this.graph);
    });
  });
});

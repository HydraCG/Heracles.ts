import FlatteningGraphTransformer from "../../../src/JsonLd/GraphTransformations/FlatteningGraphTransformer";
import { run } from "../../../testing/AsyncHelper";

describe("Given instance of FlatteningGraphTransformer class", () => {
  beforeEach(() => {
    this.graph = [{ "@graph": [{ "@id": "default", "@graph": [] }] }];
    this.processor = {};
    this.transformer = new FlatteningGraphTransformer();
  });

  describe("when transforming", () => {
    beforeEach(
      run(async () => {
        this.result = await this.transformer.transform(this.graph, this.processor);
      })
    );

    it("flatten graphs", () => {
      expect(this.result.find(_ => _["@graph"])).toBeUndefined();
    });
  });
});

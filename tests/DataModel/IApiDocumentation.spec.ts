import * as sinon from "sinon";
import TypesCollection from "../../src/DataModel/Collections/TypesCollection";
import { IResource } from "../../src/DataModel/IResource";
import { factories } from "../../src/JsonLd/factories";
import { hydra } from "../../src/namespaces";
import { run } from "../../testing/AsyncHelper";
import { returnOk } from "../../testing/ResponseHelper";

describe("Given an instance of the IApiDocumentation interface", () => {
  beforeEach(() => {
    this.client = { getResource: sinon.stub() };
    const setup: any = {
      entryPoint: "http://temp.uri/api",
      type: new TypesCollection([hydra.ApiDocumentation])
    };
    this.apiDocumentation = factories[hydra.ApiDocumentation](setup as IResource, this.client, null);
  });

  describe("when obtaining an entry point", () => {
    beforeEach(() => {
      this.client.getResource.returns((this.entryPoint = returnOk()));
    });

    it(
      "should call the client",
      run(async () => {
        await this.apiDocumentation.getEntryPoint();

        expect(this.client.getResource).toHaveBeenCalledWith(this.apiDocumentation.entryPoint);
      })
    );

    it(
      "should provide a correct result",
      run(async () => {
        expect(await this.apiDocumentation.getEntryPoint()).toBe(this.entryPoint);
      })
    );
  });
});

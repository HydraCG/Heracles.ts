import * as sinon from "sinon";
import {run} from "../testing/AsyncHelper";
import {returnOk} from "../testing/ResponseHelper";
import ApiDocumentation from "../src/ApiDocumentation";

describe("Given an instance of the ApiDocumentation class", function() {
    beforeEach(function() {
        this.client = { getResource: sinon.stub() };
        let setup = {
            client: { value: this.client },
            entryPoint: { value: "http://temp.uri/api" }
        };
        this.apiDocumentation = Object.create(ApiDocumentation.prototype, setup);
    });

    describe("when obtaining an entry point", function() {
        beforeEach(function() {
            this.client.getResource.returns(this.entryPoint = returnOk());
        });

        it("should call the client", run(async function() {
            await this.apiDocumentation.getEntryPoint();

            expect(this.client.getResource).toHaveBeenCalledWith(this.apiDocumentation.entryPoint);
        }));

        it("should provide a correct result", run(async function() {
            expect(await this.apiDocumentation.getEntryPoint()).toBe(this.entryPoint);
        }));
    });
});
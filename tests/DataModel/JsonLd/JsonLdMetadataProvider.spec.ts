import HydraClient from "../../../src/HydraClient";
import {returnOk} from "../../../testing/ResponseHelper";
import JsonLdMetadataProvider from "../../../src/DataModel/JsonLd/JsonLdMetadataProvider";
import {run} from "../../../testing/AsyncHelper";
const inputJsonLd = require("./input.json");
const metadataJsonLd = require("./metadata.json");
const dataJsonLd = require("./data.json");

describe("Given instance of the JsonLdMetadataProvider class", function() {
    beforeEach(function() {
        (<any>HydraClient)._metadataProviders.length = 0;
        HydraClient.registerMetadataProvider(new JsonLdMetadataProvider());
        this.metadataProvider = HydraClient.instance.getMetadataProvider(returnOk());
    });

    it("should get itself registered", function() {
        expect(this.metadataProvider).toEqual(jasmine.any(JsonLdMetadataProvider));
    });

    it("should expose supported media types", function() {
        expect(this.metadataProvider.supportedMediaTypes).toEqual(["application/json+ld"]);
    });

    describe("when parsing", function() {
        beforeEach(function() {
            this.response = returnOk(inputJsonLd);
        });

        it("should parse data", run(async function() {
            let result = await this.metadataProvider.parse(this.response, true);

            expect(result).toEqual(dataJsonLd);
        }));

        it("should separate metadata", run(async function() {
            let result = await this.metadataProvider.parse(this.response, true);

            expect(result.metadata).toEqual(metadataJsonLd);
        }));
    });
});
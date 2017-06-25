import HydraClient from "../../../src/HydraClient";
import {returnOk} from "../../../testing/ResponseHelper";
import JsonLdHypermediaProcessor from "../../../src/DataModel/JsonLd/JsonLdHypermediaProcessor";
import {run} from "../../../testing/AsyncHelper";
const inputJsonLd = require("./input.json");
const hypermediaJsonLd = require("./hypermedia.json");
const webResourceJsonLd = require("./webResource.json");

describe("Given instance of the JsonLdHypermediaProcessor class", function() {
    beforeEach(function() {
        (<any>HydraClient)._hypermediaProcessors.length = 0;
        HydraClient.registerHypermediaProcessor(new JsonLdHypermediaProcessor());
        this.hypermediaProcessor = new HydraClient().getHypermediaProcessor(returnOk());
    });

    it("should get itself registered", function() {
        expect(this.hypermediaProcessor).toEqual(jasmine.any(JsonLdHypermediaProcessor));
    });

    it("should expose supported media types", function() {
        expect(this.hypermediaProcessor.supportedMediaTypes).toEqual(["application/json+ld"]);
    });

    describe("when parsing", function() {
        beforeEach(function() {
            this.response = returnOk(inputJsonLd);
        });

        it("should process data", run(async function() {
            let result = await this.hypermediaProcessor.process(this.response, true);

            expect(result).toEqual(webResourceJsonLd);
        }));

        it("should separate hypermedia", run(async function() {
            let result = await this.hypermediaProcessor.process(this.response, true);

            expect(result.hypermedia).toEqual(hypermediaJsonLd);
        }));
    });
});
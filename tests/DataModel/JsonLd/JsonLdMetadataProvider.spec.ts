import HydraClient from "../../../src/HydraClient";
import {returnOk} from "../../../testing/ResponseHelper";
import JsonLdHypermediaProcessor from "../../../src/DataModel/JsonLd/JsonLdHypermediaProcessor";
import {run} from "../../../testing/AsyncHelper";
import {hydra} from "../../../src/namespaces";
const inputJsonLd = require("./input.json");

describe("Given instance of the JsonLdHypermediaProcessor class", function() {
    beforeEach(function() {
        this.hypermediaProcessors = (<any>HydraClient)._hypermediaProcessors;
        (<any>HydraClient)._hypermediaProcessors = [];
        HydraClient.registerHypermediaProcessor(new JsonLdHypermediaProcessor());
        this.hypermediaProcessor = new HydraClient().getHypermediaProcessor(returnOk());
    });

    it("should get itself registered", function() {
        expect(this.hypermediaProcessor).toEqual(jasmine.any(JsonLdHypermediaProcessor));
    });

    it("should expose supported media types", function() {
        expect(this.hypermediaProcessor.supportedMediaTypes).toEqual(["application/ld+json"]);
    });

    describe("when parsing", function() {
        beforeEach(function() {
            this.response = returnOk("http://temp.uri/", inputJsonLd);
        });

        describe("without removing hypermedia controls", function() {
            beforeEach(run(async function() {
                this.result = await this.hypermediaProcessor.process(this.response, false);
            }));

            it("should process data", function() {
                expect(this.result).toEqual(inputJsonLd);
            });

            it("should separate hypermedia", function() {
                expect(this.result.hypermedia).toEqual([
                    {
                        iri: "http://temp.uri/api/events",
                        isA: [hydra.Collection],
                        totalItems: 1,
                        members: [
                            {
                                iri: "http://temp.uri/api/events/1",
                                isA: [],
                                "http://schema.org/endDate": "2017-04-19",
                                "http://schema.org/eventDescription": "Some event 1",
                                "http://schema.org/eventName": "Event 1",
                                "http://schema.org/startDate": "2017-04-19"
                            }
                        ]
                    }, {
                        iri: "http://temp.uri/api/events/1",
                        isA: [],
                        "http://schema.org/endDate": "2017-04-19",
                        "http://schema.org/eventDescription": "Some event 1",
                        "http://schema.org/eventName": "Event 1",
                        "http://schema.org/startDate": "2017-04-19"
                    }, {
                        iri: 'some:named.graph',
                        isA: []
                    }
                ]);
            });
        });

        describe("and removing hypermedia controls", function() {
            it("should process data", run(async function() {
                let result = await this.hypermediaProcessor.process(this.response, true);

                expect(result).toEqual([
                    {
                        "@id": "some:named.graph",
                        "@graph": [
                            {
                                "@id": "http://temp.uri/api/events/1",
                                "http://schema.org/eventName": [{ "@value": "Event 1" }],
                                "http://schema.org/eventDescription": [{ "@value": "Some event 1" }],
                                "http://schema.org/startDate": [{ "@value": "2017-04-19" }],
                                "http://schema.org/endDate": [{ "@value": "2017-04-19" }]
                            }
                        ]
                    }
                ]);
            }));

            it("should separate hypermedia", run(async function() {
                let result = await this.hypermediaProcessor.process(this.response, true);

                expect(result.hypermedia).toEqual([
                    {
                        "iri": "http://temp.uri/api/events",
                        "isA": [hydra.Collection],
                        "totalItems": 1,
                        "members": [
                            { "iri": "http://temp.uri/api/events/1" }
                        ]
                    }
                ]);
            }));
        });
    });

    afterEach(function() {
        (<any>HydraClient)._hypermediaProcessors = this.hypermediaProcessors;
    });
});

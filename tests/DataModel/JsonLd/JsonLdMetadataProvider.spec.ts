import JsonLdHypermediaProcessor from "../../../src/DataModel/JsonLd/JsonLdHypermediaProcessor";
import HydraClient from "../../../src/HydraClient";
import { hydra } from "../../../src/namespaces";
import { run } from "../../../testing/AsyncHelper";
import { returnOk } from "../../../testing/ResponseHelper";
import * as inputJsonLd from "./input.json";

describe("Given instance of the JsonLdHypermediaProcessor class", () => {
  beforeEach(function() {
    this.hypermediaProcessors = HydraClient.hypermediaProcessors;
    HydraClient.hypermediaProcessors = [];
    HydraClient.registerHypermediaProcessor(new JsonLdHypermediaProcessor());
    this.hypermediaProcessor = new HydraClient().getHypermediaProcessor(
      returnOk()
    );
  });

  it("should get itself registered", function() {
    expect(this.hypermediaProcessor).toEqual(
      jasmine.any(JsonLdHypermediaProcessor)
    );
  });

  it("should expose supported media types", function() {
    expect(this.hypermediaProcessor.supportedMediaTypes).toEqual([
      "application/ld+json"
    ]);
  });

  describe("when parsing", () => {
    beforeEach(function() {
      this.response = returnOk("http://temp.uri/", inputJsonLd);
    });

    describe("without removing hypermedia controls", () => {
      beforeEach(
        run(async function() {
          this.result = await this.hypermediaProcessor.process(
            this.response,
            false
          );
        })
      );

      it("should process data", function() {
        expect(this.result).toEqual(inputJsonLd);
      });

      it("should separate hypermedia", function() {
        expect(this.result.hypermedia).toEqual([
          {
            iri: "http://temp.uri/api/events",
            isA: [hydra.Collection],
            members: [
              {
                "http://schema.org/endDate": "2017-04-19",
                "http://schema.org/eventDescription": "Some event 1",
                "http://schema.org/eventName": "Event 1",
                "http://schema.org/startDate": "2017-04-19",
                iri: "http://temp.uri/api/events/1",
                isA: [],
                operations: []
              }
            ],
            operations: [],
            totalItems: 1
          },
          {
            "http://schema.org/endDate": "2017-04-19",
            "http://schema.org/eventDescription": "Some event 1",
            "http://schema.org/eventName": "Event 1",
            "http://schema.org/startDate": "2017-04-19",
            iri: "http://temp.uri/api/events/1",
            isA: [],
            operations: []
          }
        ]);
      });
    });

    describe("and removing hypermedia controls", () => {
      it(
        "should process data",
        run(async function() {
          const result = await this.hypermediaProcessor.process(
            this.response,
            true
          );

          expect(result).toEqual([
            {
              "@graph": [
                {
                  "@id": "http://temp.uri/api/events/1",
                  "http://schema.org/endDate": [{ "@value": "2017-04-19" }],
                  "http://schema.org/eventDescription": [
                    { "@value": "Some event 1" }
                  ],
                  "http://schema.org/eventName": [{ "@value": "Event 1" }],
                  "http://schema.org/startDate": [{ "@value": "2017-04-19" }]
                }
              ],
              "@id": "some:named.graph"
            }
          ]);
        })
      );

      it(
        "should separate hypermedia",
        run(async function() {
          const result = await this.hypermediaProcessor.process(
            this.response,
            true
          );

          expect(result.hypermedia).toEqual([
            {
              iri: "http://temp.uri/api/events",
              isA: [hydra.Collection],
              members: [{ iri: "http://temp.uri/api/events/1" }],
              operations: [],
              totalItems: 1
            }
          ]);
        })
      );
    });
  });

  afterEach(function() {
    HydraClient.hypermediaProcessors = this.hypermediaProcessors;
  });
});

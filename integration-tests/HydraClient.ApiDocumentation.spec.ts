import HydraClientFactory from "../src/HydraClientFactory";
import { hydra, rdf } from "../src/namespaces";
import { run } from "../testing/AsyncHelper";
import HydraResourceMatcher from "../testing/HydraResourceMatcher";

describe("Having a Hydra client", () => {
  beforeEach(() => {
    jasmine.addMatchers({ toBeLike: () => new HydraResourceMatcher() });
    this.url = "http://localhost:3000/";
    this.client = HydraClientFactory.configure()
      .withDefaults()
      .andCreate();
  });

  describe("while browsing the test website", () => {
    beforeEach(
      run(async () => {
        this.apiDocumentation = await this.client.getApiDocumentation(this.url);
      })
    );

    describe("and obtaining it's API documentation as in use case 2.api-documentation", () => {
      it("should obtain an API documentation", () => {
        expect(this.apiDocumentation).not.toBeNull();
      });

      it("should have access an entry point", () => {
        expect(this.apiDocumentation.entryPoint).toMatch(".*/api$");
      });

      it("should provide class of schema:Event as in use case 2.1.api-documentation-data-structures", () => {
        expect(this.apiDocumentation.supportedClasses.ofIri("http://schema.org/Event")).toBeLike([
          {
            description: "An event happening at a certain time and location, such as a concert, lecture, or festival.",
            displayName: "Event",
            iri: "http://schema.org/Event",
            links: [],
            operations: [],
            supportedOperations: [],
            supportedProperties: [
              {
                iri: "_:b0",
                links: [],
                operations: [],
                property: {
                  description: "The name of the event.",
                  displayName: "Name",
                  iri: "http://schema.org/name",
                  links: [],
                  operations: [],
                  type: [rdf.Property],
                  valuesOfType: [{ iri: "http://www.w3.org/2001/XMLSchema#string", type: [] }]
                },
                readOnly: false,
                required: false,
                type: [hydra.SupportedProperty],
                writeOnly: false
              },
              {
                iri: "_:b1",
                links: [],
                operations: [],
                property: {
                  description: "Description of the event.",
                  displayName: "Description",
                  iri: "http://schema.org/description",
                  links: [],
                  operations: [],
                  type: [rdf.Property],
                  valuesOfType: [{ iri: "http://www.w3.org/2001/XMLSchema#string", type: [] }]
                },
                readOnly: false,
                required: false,
                type: [hydra.SupportedProperty],
                writeOnly: false
              },
              {
                iri: "_:b2",
                links: [],
                operations: [],
                property: {
                  description: "The start date and time of the item (in ISO 8601 date format).",
                  displayName: "Start date",
                  iri: "http://schema.org/startDate",
                  links: [],
                  operations: [],
                  type: [rdf.Property],
                  valuesOfType: [
                    { iri: "http://www.w3.org/2001/XMLSchema#dateTime", type: [] },
                    { iri: "http://www.w3.org/2001/XMLSchema#date", type: [] }
                  ]
                },
                readOnly: false,
                required: false,
                type: [hydra.SupportedProperty],
                writeOnly: false
              },
              {
                iri: "_:b3",
                links: [],
                operations: [],
                property: {
                  description: "The end date and time of the item (in ISO 8601 date format).",
                  displayName: "End date",
                  iri: "http://schema.org/endDate",
                  links: [],
                  operations: [],
                  type: [rdf.Property],
                  valuesOfType: [
                    { iri: "http://www.w3.org/2001/XMLSchema#dateTime", type: [] },
                    { iri: "http://www.w3.org/2001/XMLSchema#date", type: [] }
                  ]
                },
                readOnly: false,
                required: false,
                type: [hydra.SupportedProperty],
                writeOnly: false
              }
            ],
            type: [hydra.Class]
          }
        ]);
      });

      describe("and generating an API documentation", () => {
        beforeEach(() => {
          this.userGuide = { classes: {} };
          for (const supportedClass of this.apiDocumentation.supportedClasses) {
            let classDocumentation =
              `##Class ${supportedClass.displayName} (${supportedClass.iri})\n\n` +
              `${supportedClass.description}\n\n` +
              "###Properties:\n\n";
            for (const supportedProperty of supportedClass.supportedProperties) {
              classDocumentation +=
                `####${supportedProperty.property.displayName} (${supportedProperty.property.iri})\n\n` +
                `${supportedProperty.property.description}\n\n` +
                "Values of type:\n";
              for (const valueOfType of supportedProperty.property.valuesOfType) {
                classDocumentation += `- ${valueOfType.iri}\n`;
              }

              classDocumentation += "\n\n";
            }

            this.userGuide.classes[supportedClass.iri] = classDocumentation;
          }
        });

        it("should provide all details for the user guide as in use case 2.2.api-documentation-user-document", () => {
          expect(this.userGuide.classes["http://schema.org/Event"]).toBe(
            "##Class Event (http://schema.org/Event)\n\n" +
              "An event happening at a certain time and location, such as a concert, lecture, or festival.\n\n" +
              "###Properties:\n\n" +
              "####Name (http://schema.org/name)\n\n" +
              "The name of the event.\n\n" +
              "Values of type:\n- http://www.w3.org/2001/XMLSchema#string\n\n\n" +
              "####Description (http://schema.org/description)\n\n" +
              "Description of the event.\n\n" +
              "Values of type:\n- http://www.w3.org/2001/XMLSchema#string\n\n\n" +
              "####Start date (http://schema.org/startDate)\n\n" +
              "The start date and time of the item (in ISO 8601 date format).\n\n" +
              "Values of type:\n" +
              "- http://www.w3.org/2001/XMLSchema#dateTime\n" +
              "- http://www.w3.org/2001/XMLSchema#date\n\n\n" +
              "####End date (http://schema.org/endDate)\n\n" +
              "The end date and time of the item (in ISO 8601 date format).\n\n" +
              "Values of type:\n" +
              "- http://www.w3.org/2001/XMLSchema#dateTime\n" +
              "- http://www.w3.org/2001/XMLSchema#date\n\n\n"
          );
        });
      });
    });
  });
});

import * as md5 from "js-md5";
import HydraClient from "../src/HydraClient";
import { hydra } from "../src/namespaces";
import { run } from "../testing/AsyncHelper";

describe("Having a Hydra client", () => {
  beforeEach(() => {
    this.url = "http://localhost:3000/";
    this.client = new HydraClient();
  });

  describe("while browsing the test website", () => {
    beforeEach(
      run(async () => {
        this.apiDocumentation = await this.client.getApiDocumentation(this.url);
      })
    );

    describe("and obtaining it's entry point as in use case 1.entry-point", () => {
      beforeEach(
        run(async () => {
          this.entryPoint = await this.apiDocumentation.getEntryPoint();
        })
      );

      it("should obtain three hypermedia controls", () => {
        expect(this.entryPoint.hypermedia.length).toBe(3);
      });

      it("should obtain a schema:AddAction operations", () => {
        const operations = this.entryPoint.hypermedia.where(hypermedia =>
          hypermedia.operations.ofType("http://schema.org/AddAction").any()
        );
        expect(operations.length).toBe(2);
      });

      it("should obtain a collection of events", () => {
        const collection = this.entryPoint.hypermedia.collections.where(item => item.iri.match("/api/events$")).first();
        expect(collection).toBeDefined();
        expect(collection).not.toBeNull();
      });

      describe("and then obtaining events as in use case 3.obtaining-events", () => {
        beforeEach(
          run(async () => {
            this.events = await this.client.getResource(this.url + "api/events");
          })
        );

        it("should obtain a collection of events", () => {
          expect(this.events.hypermedia.members.ofType("http://schema.org/Event").length).toBe(3);
        });

        describe("and then adding a new event to that collection as in use case 5.creating-event", () => {
          beforeEach(
            run(async () => {
              try {
                this.body = {
                  "@type": "http://schema.org/Event"
                };
                const operation = this.events.hypermedia.operations
                  .ofType("http://schema.org/CreateAction")
                  .expecting("http://schema.org/Event")
                  .first();
                this.createdEvent = await this.client.invoke(operation, this.body);
              } catch (error) {
                this.exception = error;
              }
            })
          );

          it(
            "should not throw",
            run(async () => {
              expect(this.exception).not.toBeDefined();
            })
          );

          it(
            "should return with a 201 Created",
            run(async () => {
              expect(this.createdEvent.status).toBe(201);
            })
          );

          it(
            "should provide a resource's URL",
            run(async () => {
              expect(this.createdEvent.headers.get("Location")).toMatch(
                ".*/api/events/" + md5(JSON.stringify(this.body))
              );
            })
          );
        });

        describe("and then searching for events as in use case 7.searching-events", () => {
          beforeEach(
            run(async () => {
              const link = this.events.hypermedia.links
                .withRelationOf(hydra.search)
                .withTemplate()
                .first()
                .expandTarget({ searchText: "whatever" });
              this.searchResult = await this.client.getResource(link);
            })
          );

          it("should obtain matching events", () => {
            const matchingEvents = this.searchResult.hypermedia.collections
              .where(item => item.iri.match("/api/events$"))
              .first();
            expect(matchingEvents).toBeDefined();
            expect(matchingEvents).not.toBeNull();
          });
        });

        describe("and then using a custom arbitrarily pointed templated operation", () => {
          beforeEach(
            run(async () => {
              const link = this.events.hypermedia.links
                .withRelationOf("http://example.com/vocab#filter")
                .withTemplate()
                .first()
                .expandTarget(_ =>
                  _.withProperty("http://schema.org/name")
                    .havingValueOf("name")
                    .withVariable("eventDescription")
                    .havingValueOf("description")
                );
              this.filteringResult = await this.client.getResource(link);
            })
          );

          it("should obtain matching events", () => {
            const matchingEvents = this.filteringResult.hypermedia
              .where(item => item.iri.match("/api/events$") && item.type.contains(hydra.Collection))
              .first();
            expect(matchingEvents).toBeDefined();
            expect(matchingEvents).not.toBeNull();
          });
        });
      });

      describe("and then obtaining people", () => {
        beforeEach(
          run(async () => {
            this.people = await this.client.getResource(this.url + "api/people");
          })
        );

        it("should obtain a collection of people", () => {
          expect(this.people.hypermedia.members.ofType("http://schema.org/Person").length).toBe(1);
        });

        describe("and then adding a new person to that collection", () => {
          beforeEach(
            run(async () => {
              try {
                this.body = {
                  "@type": "http://schema.org/Person"
                };
                const operation = this.people.hypermedia.operations
                  .ofType("http://schema.org/UpdateAction")
                  .expecting("http://schema.org/Person")
                  .withTemplate()
                  .first()
                  .expandTarget({ name: "new-test-event" });
                this.createdPerson = await this.client.invoke(operation, this.body);
              } catch (error) {
                this.exception = error;
              }
            })
          );

          it("should not throw", () => {
            expect(this.exception).not.toBeDefined();
          });

          it("should return with a 201 Created", () => {
            expect(this.createdPerson.status).toBe(201);
          });
        });
      });
    });
  });
});

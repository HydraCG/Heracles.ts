import * as md5 from "js-md5";
import { IResource } from "../src/DataModel/IResource";
import HydraClientFactory from "../src/HydraClientFactory";
import { hydra } from "../src/namespaces";
import PartialCollectionCrawler from "../src/PartialCollectionCrawler";
import { run } from "../testing/AsyncHelper";

describe("Having a Hydra client", () => {
  beforeEach(() => {
    this.url = "http://localhost:3000/";
    this.client = HydraClientFactory.configure()
      .withDefaults()
      .withApiDocumentationsFetchedAndExtended()
      .andCreate();
  });

  describe("while browsing a website", () => {
    beforeEach(
      run(async () => {
        this.apiDocumentation = await this.client.getApiDocumentation(this.url);
      })
    );

    /*Use case 1. Entry-point.*/
    describe("and obtaining it's entry point", () => {
      beforeEach(
        run(async () => {
          this.entryPoint = await this.apiDocumentation.getEntryPoint();
        })
      );

      it("should obtain three hypermedia controls", () => {
        expect(this.entryPoint.length).toBe(3);
      });

      it("should obtain a schema:AddAction operations", () => {
        const operations = this.entryPoint.where(_ => _.operations.ofType("http://schema.org/AddAction").any());
        expect(operations.length).toBe(2);
      });

      it("should obtain a collection of events", () => {
        const collection = this.entryPoint.collections.where(item => item.iri.match("/api/events$")).first();
        expect(collection).toBeDefined();
        expect(collection).not.toBeNull();
      });

      /*Use case 3. Obtaining events.*/
      describe("and then obtaining events", () => {
        beforeEach(
          run(async () => {
            this.events = await this.client.getResource(this.url + "api/events");
          })
        );

        it("should obtain a collection of events", () => {
          expect(this.events.members.ofType("http://schema.org/Event").length).toBe(3);
        });

        /*Use case 5. Creating an event*/
        describe("and then adding a new event to that collection", () => {
          beforeEach(
            run(async () => {
              try {
                this.body = {
                  "@type": "http://schema.org/Event"
                };
                const operation = this.events.operations
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

        /*Use case 7. Searching events*/
        describe("and then searching for events", () => {
          beforeEach(
            run(async () => {
              const link = this.events.links
                .withRelationOf(hydra.search)
                .withTemplate()
                .first()
                .expandTarget({ searchText: "whatever" });
              this.searchResult = await this.client.getResource(link);
            })
          );

          it("should obtain matching events", () => {
            const matchingEvents = this.searchResult.collections.where(item => item.iri.match("/api/events?")).first();
            expect(matchingEvents).toBeDefined();
            expect(matchingEvents).not.toBeNull();
          });
        });

        describe("and then using some templated operation", () => {
          beforeEach(
            run(async () => {
              const link = this.events.links
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
            const matchingEvents = this.filteringResult
              .where(item => item.iri.match("/api/events?") && item.type.contains(hydra.Collection))
              .first();
            expect(matchingEvents).toBeDefined();
            expect(matchingEvents).not.toBeNull();
          });
        });

        describe("and then requesting some specific member", () => {
          beforeEach(
            run(async () => {
              this.member = await this.client.getResource(this.events.members.first());
            })
          );

          it("should have DELETE operation available", () => {
            expect(this.member.operations.ofType("http://schema.org/DeleteAction").first()).not.toBeNull();
          });

          it("should have DELETE operation applicable", () => {
            expect(this.member.operations.ofType("http://schema.org/DeleteAction").first().target.iri).toBe(
              this.events.members.first().iri
            );
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
          expect(this.people.members.ofType("http://schema.org/Person").length).toBe(1);
        });

        it(
          "should follow all links and gather all members",
          run(async () => {
            expect(((await PartialCollectionCrawler.from(this.people).getMembers()) as IResource[]).length).toBe(2);
          })
        );

        describe("and then adding a new person to that collection", () => {
          beforeEach(
            run(async () => {
              try {
                this.body = {
                  "@type": "http://schema.org/Person",
                  "http://schema.org/name": "test-name"
                };
                const operation = this.people.operations
                  .ofType("http://schema.org/UpdateAction")
                  .expecting("http://schema.org/Person")
                  .first();
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

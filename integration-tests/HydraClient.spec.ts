import HydraClient from "../src/HydraClient";
import { run } from "../testing/AsyncHelper";

describe("Having a Hydra client", () => {
  beforeEach(() => {
    this.url = "http://localhost:3000/";
    this.client = new HydraClient(false);
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
        expect(this.entryPoint.hypermedia.length).toBeGreaterThanOrEqual(3);
      });

      it("should obtain a schema:CreateAction operation", () => {
        expect(
          this.entryPoint.hypermedia.find(item => item.isA === "Operation")
        ).not.toBeNull();
      });

      it("should obtain a collection of events", () => {
        expect(
          this.entryPoint.hypermedia.find(
            item => item.iri.match("/api/events$") && item.isA === "Colletion"
          )
        ).not.toBeNull();
      });

      describe("and then obtaining events as in use case 3.obtaining-events", () => {
        beforeEach(
          run(async () => {
            this.events = await this.client.getResource(
              this.url + "api/events"
            );
            this.members = this.events.hypermedia.members;
          })
        );

        it("should obtain a collection of events", () => {
          expect(
            this.members.filter(
              member => member.isA.indexOf("http://schema.org/Event") !== -1
            ).length
          ).toBe(3);
        });

        describe("and then adding a new event to that collection as in use case 5.creating-event", () => {
          beforeEach(
            run(async () => {
              try {
                this.createdEvent = await this.members.add({
                  "@type": "http://schema.org/Event"
                });
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
            "should add that new event with an operation pointed",
            run(async () => {
              expect(this.createdEvent.status).toBe(201);
            })
          );
        });
      });

      describe("and then obtaining people", () => {
        beforeEach(
          run(async () => {
            this.people = await this.client.getResource(
              this.url + "api/people"
            );
            this.members = this.people.hypermedia.members;
          })
        );

        it("should obtain a collection of people", () => {
          expect(
            this.members.filter(
              member => member.isA.indexOf("http://schema.org/Person") !== -1
            ).length
          ).toBe(1);
        });

        describe("and then adding a new person to that collection", () => {
          beforeEach(
            run(async () => {
              try {
                this.createdPerson = await this.members.add({
                  "@type": "http://schema.org/Person"
                });
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
            "should add that new event with an operation pointed",
            run(async () => {
              expect(this.createdPerson.status).toBe(200);
            })
          );
        });
      });
    });

    describe("and obtaining it's API documentation as in use case 2.api-documentation", () => {
      it("should obtain an API documentation", () => {
        expect(this.apiDocumentation).not.toBeNull();
      });

      it("should have access an entry point", () => {
        expect(this.apiDocumentation.entryPoint.iri).toMatch(".*/api$");
      });
    });
  });
});

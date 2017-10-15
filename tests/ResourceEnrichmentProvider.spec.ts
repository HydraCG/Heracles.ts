import * as sinon from "sinon";
import {hydra, schema} from "../src/namespaces";
import ResourceEnrichmentProvider from "../src/ResourceEnrichmentProvider";
import {run} from "../testing/AsyncHelper";
import HydraClient from "../src/HydraClient";

describe("Given instance of ResourceEnrichmentProvider class", () => {
  beforeEach(() => {
    this.provider = new ResourceEnrichmentProvider();
    this.client = {};
    this.createAction = {
      isA: [hydra.Operation, schema.CreateAction],
      expects: [{ iri: schema + "Person" }]
    };
    this.addAction = {
      isA: [hydra.Operation, schema.AddAction],
      expects: [{ iri: schema + "Person" }]
    };
    this.collection = {
      isA: [hydra.Collection],
      members: [{ iri: "test" }],
      operations: [ this.createAction, this.addAction ]
    };
    this.resource = {
      hypermedia: [
        this.collection,
        this.createAction,
        this.addAction
      ],
    };
  });

  describe("when enriching resource", () => {
    beforeEach(() => {
      this.result = this.provider.enrichHypermedia(this.client, this.resource);
    });

    describe("with collection specific accessors", () => {
      it("should enrich with members property", () => {
        expect(this.result.hypermedia.members).toEqual(jasmine.any(Array));
      });

      it("should obtain all members from that members property", () => {
        expect(this.result.hypermedia.members).toEqual([{ iri: "test" }]);
      });

      it("should enrich members property with an 'add' method", () => {
        expect(this.result.hypermedia.members.add).toEqual(jasmine.any(Function));
      });
    });

    describe("and adding a new collection member", () => {
      const tryAddMember = async (resource) => {
        try {
          await this.result.hypermedia.members.add(resource);
        }
        catch (error) {
          this.exception = error;
        }
      };

      describe("and no resource to be added is given", () => {
        beforeEach(
          run(async () => await tryAddMember(null))
        );

        it("should throw", () => {
          expect(this.exception).toBe(HydraClient.noResourceProvided);
        });
      });

      describe("and no valid operation is given", () => {
        beforeEach(
          run(async () => {
            const collection = { isA: [hydra.Collection], members: [] };
            this.result = this.provider.enrichHypermedia(this.client, { hypermedia: [ collection ] });
            await tryAddMember({});
          })
        );

        it("should throw", () => {
          expect(this.exception).toBe(HydraClient.operationNotSupported);
        });
      });

      describe("and resource doesn't meet operation expectations", () => {
        beforeEach(
          run(async () => await tryAddMember({}))
        );

        it("should throw", () => {
          expect(this.exception).toBe(HydraClient.invalidArgument);
        });
      });

      describe("and all checks are successful", () => {
        beforeEach(
          run(async () => {
            this.client.invoke = sinon.stub();
            const createResponse = { status: 201, headers: { get: (name: string) => "/api/people/1" } };
            this.client.invoke.onFirstCall().returns(createResponse);
            this.client.invoke.onSecondCall().returns({ status: 200 });
            this.resource = { "@type": [schema + "Person"] };
            await tryAddMember(this.resource);
          })
        );

        it("should create a new resource", () => {
          expect(this.client.invoke).toHaveBeenCalledWith(this.createAction, this.resource);
        });

        it("should add a new resource to the collection", () => {
          expect(this.client.invoke).toHaveBeenCalledWith(this.addAction, { iri: "/api/people/1", "@type": [schema + "Person"] });
        });
      });
    });
  });
});

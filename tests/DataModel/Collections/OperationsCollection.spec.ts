import OperationsCollection from "../../../src/DataModel/Collections/OperationsCollection";
import { hydra } from "../../../src/namespaces";

function operation(
  type: string,
  expected: string,
  returned: string,
  expectedHeader: string,
  returnedHeader: string,
  method: string) {
  return {
    expectedHeaders: [expectedHeader],
    expects: [{ iri: expected }],
    method,
    returnedHeaders: [returnedHeader],
    returns: [{ iri: returned }],
    type: [type]
  };
}

describe("Given instance of the OperationsCollection", () => {
  beforeEach(() => {
    this.operation1 = operation("OperationType1", "ExpectedType1", "ReturnedType1", "InHeader1", "OutHeader1", "SOME");
    this.operation2 = operation("OperationType1", "ExpectedType2", "ReturnedType2", "InHeader2", "OutHeader2", "TEST");
    this.operation3 = operation("OperationType2", "ExpectedType2", "ReturnedType2", "InHeader2", "OutHeader2", "TEST");
    this.operation4 = operation("OperationType3", "ExpectedType3", "ReturnedType3", "InHeader3", "OutHeader3", "ANY");
    this.operation4.type.push(hydra.IriTemplate);
    this.allOperations = [this.operation1, this.operation2, this.operation3, this.operation4];
    this.operations = new OperationsCollection(this.allOperations);
  });

  it("should provide all operations", () => {
    expect([...this.operations]).toEqual(this.allOperations);
  });

  describe("when narrowing filters with type", () => {
    beforeEach(() => {
      this.typeNorrowedOperations = this.operations.ofType("OperationType1");
    });

    it("should provide only type matching operations", () => {
      expect([...this.typeNorrowedOperations]).toEqual([this.operation1, this.operation2]);
    });

    describe("and narrowing filters with expected type", () => {
      beforeEach(() => {
        this.typeAndExpectationNarrowedOperations = this.typeNorrowedOperations.expecting("ExpectedType2");
      });

      it("should provide only type and expected type matching operations", () => {
        expect([...this.typeAndExpectationNarrowedOperations]).toEqual([this.operation2]);
      });
    });

    describe("and narrowing filters with returned type", () => {
      beforeEach(() => {
        this.typeAndReturnedNarrowedOperations = this.typeNorrowedOperations.returning("ReturnedType2");
      });

      it("should provide only type and expected type matching operations", () => {
        expect([...this.typeAndReturnedNarrowedOperations]).toEqual([this.operation2]);
      });
    });
  });

  describe("when narrowing filters with expected headers", () => {
    beforeEach(() => {
      this.expectedHeaderNorrowedOperations = this.operations.expectingHeader("InHeader1");
    });

    it("should provide only type matching operations", () => {
      expect([...this.expectedHeaderNorrowedOperations]).toEqual([this.operation1]);
    });
  });

  describe("when narrowing filters with returned headers", () => {
    beforeEach(() => {
      this.returnedHeaderNorrowedOperations = this.operations.returningHeader("OutHeader1");
    });

    it("should provide only type matching operations", () => {
      expect([...this.returnedHeaderNorrowedOperations]).toEqual([this.operation1]);
    });
  });

  describe("when narrowing filters with method", () => {
    beforeEach(() => {
      this.methodNorrowedOperations = this.operations.ofMethod("SOME");
    });

    it("should provide only type matching operations", () => {
      expect([...this.methodNorrowedOperations]).toEqual([this.operation1]);
    });
  });

  describe("when narrowing filters with template", () => {
    beforeEach(() => {
      this.templateNorrowedOperations = this.operations.withTemplate();
    });

    it("should provide only type matching operations", () => {
      expect([...this.templateNorrowedOperations]).toEqual([this.operation4]);
    });
  });
});

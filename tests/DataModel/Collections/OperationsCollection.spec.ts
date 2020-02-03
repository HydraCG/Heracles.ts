import OperationsCollection from "../../../src/DataModel/Collections/OperationsCollection";
import { hydra } from "../../../src/namespaces";

function operation(
  type: string,
  expected: string,
  returned: string,
  expectedHeader: string,
  returnedHeader: string,
  method: string
) {
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

  it("should provide only type matching operations", () => {
    expect([...this.operations.ofType("OperationType1")]).toEqual([this.operation1, this.operation2]);
  });

  it("should provide only type and expected type matching operations", () => {
    expect([...this.operations.ofType("OperationType1").expecting("ExpectedType2")]).toEqual([this.operation2]);
  });

  it("should provide only type and returned type matching operations", () => {
    expect([...this.operations.ofType("OperationType1").returning("ReturnedType2")]).toEqual([this.operation2]);
  });

  it("should provide only expected headers matching operations", () => {
    expect([...this.operations.expectingHeader("InHeader1")]).toEqual([this.operation1]);
  });

  it("should provide only returned headers matching operations", () => {
    expect([...this.operations.returningHeader("OutHeader1")]).toEqual([this.operation1]);
  });

  it("should provide only method matching operations", () => {
    expect([...this.operations.ofMethod("SOME")]).toEqual([this.operation1]);
  });

  it("should provide only templated operations", () => {
    expect([...this.operations.withTemplate()]).toEqual([this.operation4]);
  });
});

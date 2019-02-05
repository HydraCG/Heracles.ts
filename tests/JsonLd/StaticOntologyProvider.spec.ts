import StaticOntologyProvider from "../../src/JsonLd/StaticOntologyProvider";
import { hydra, rdf } from "../../src/namespaces";
import { run } from "../../testing/AsyncHelper";

const propertyDomain = {};
propertyDomain[hydra.entrypoint] = hydra.ApiDocumentation;
propertyDomain[hydra.supportedClass] = hydra.ApiDocumentation;
propertyDomain[hydra.supportedProperty] = hydra.Class;
propertyDomain[hydra.readable] = hydra.SupportedProperty;
propertyDomain[hydra.writeable] = hydra.SupportedProperty;
propertyDomain[hydra.operation] = hydra.Resource;
propertyDomain[hydra.method] = hydra.Operation;
propertyDomain[hydra.expects] = hydra.Operation;
propertyDomain[hydra.returns] = hydra.Operation;
propertyDomain[hydra.member] = hydra.Collection;
propertyDomain[hydra.view] = hydra.Resource;
propertyDomain[hydra.totalItems] = hydra.Collection;
propertyDomain[hydra.first] = hydra.Resource;
propertyDomain[hydra.last] = hydra.Resource;
propertyDomain[hydra.next] = hydra.Resource;
propertyDomain[hydra.previous] = hydra.Resource;
propertyDomain[hydra.mapping] = hydra.Template;
propertyDomain[hydra.variable] = hydra.IriTemplateMapping;

const propertyRange = {};
propertyRange[hydra.property] = rdf.Property;
propertyRange[hydra.apiDocumentation] = hydra.ApiDocumentation;
propertyRange[hydra.entrypoint] = hydra.Resource;
propertyRange[hydra.supportedClass] = hydra.Class;
propertyRange[hydra.possibleStatus] = hydra.Status;
propertyRange[hydra.supportedProperty] = hydra.SupportedProperty;
propertyRange[hydra.supportedOperation] = hydra.Operation;
propertyRange[hydra.operation] = hydra.Operation;
propertyRange[hydra.expects] = hydra.Resource;
propertyRange[hydra.returns] = hydra.Resource;
propertyRange[hydra.member] = hydra.Resource;
propertyRange[hydra.view] = hydra.Resource;
propertyRange[hydra.first] = hydra.Resource;
propertyRange[hydra.next] = hydra.Resource;
propertyRange[hydra.previous] = hydra.Resource;
propertyRange[hydra.search] = hydra.IriTemplate;
propertyRange[hydra.variableRepresentation] = hydra.VariableRepresentation;
propertyRange[hydra.mapping] = hydra.IriTemplateMapping;

describe("Given instance of the StaticOntologyProvider class", () => {
  beforeEach(() => {
    this.provider = new StaticOntologyProvider(require("../../src/JsonLd/hydra.json"));
  });

  it(
    "should get a correct domain",
    run(async () => {
      for (const predicate of Object.keys(propertyDomain)) {
        expect(await this.provider.getDomainFor(predicate)).toBe(
          propertyDomain[predicate],
          `as predicate ${predicate} is defined in ontology`
        );
      }
    })
  );

  it(
    "should get a correct range",
    run(async () => {
      for (const predicate of Object.keys(propertyRange)) {
        expect(await this.provider.getRangeFor(predicate)).toBe(
          propertyRange[predicate],
          `as predicate ${predicate} is defined in ontology`
        );
      }
    })
  );
});

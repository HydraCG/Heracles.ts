// tslint:disable-next-line:no-construct
export let hydra: any = new String("http://www.w3.org/ns/hydra/core#");
hydra.namespace = hydra.toString();
hydra.apiDocumentation = hydra + "apiDocumentation";
hydra.member = hydra + "member";
hydra.operation = hydra + "operation";
hydra.expects = hydra + "expects";
hydra.ApiDocumentation = hydra + "ApiDocumentation";
hydra.EntryPoint = hydra + "EntryPoint";
hydra.Collection = hydra + "Collection";
hydra.Operation = hydra + "Operation";
hydra.Resource = hydra + "Resource";

export let schema: any = new String("http://schema.org/");
schema.namespace = schema.toString();
schema.AddAction = schema + "AddAction";
schema.CreateAction = schema + "CreateAction";
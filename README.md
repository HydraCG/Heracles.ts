# Heracles.ts [![Build Status](https://travis-ci.org/HydraCG/Heracles.ts.svg?branch=master)](https://travis-ci.org/HydraCG/Heracles.ts) [![Coverage Status](https://coveralls.io/repos/github/HydraCG/Heracles.ts/badge.svg?branch=master)](https://coveralls.io/github/HydraCG/Heracles.ts?branch=master)

Reference implementation of a Hydra client in TypeScript.

## Getting started

First you'll need to add the _Heracles.ts_ module to your project:

```bash
npm install @hydra-cg/heracles.ts --save
```

Once added, you're ready to use the client in your code.
To obtain an instance of the client just use this snippet:

```typescript
import HydraClientFactory from "@hydra-cg/heracles.ts";

let hydraClient = HydraClientFactory.configure().withDefaults().andCreate();
```

Once the instance is obtained, you're free to use the client, i.e.:
```typescript
const resource = await hydraClient.getResource("http://some.domain/api");
for (const link of resource.hypermedia.links) {
  // do something with the link.
}
```

For more example, please refer to the [cookbook](https://github.com/HydraCG/cookbook).

Programmer's reference is available at [docs](https://github.com/HydraCG/Heracles.ts/tree/master/docs).

### Hydra client factory options

There are some additional options you can use while creating a client instance.
The most interesting one will be probably which resource relations should be 
treated as links and exposed in the _links_ property.

These options (methods to be called on the _HydraClientFactory_ instance) would be:
- .withAllLinks() - treats all related resources as links
- .withAllHttpLinks() - similar as above, but only HTTP(S) URLs 
  will be considered
- .withSameRootLinks() - only URLs from the same root of the requested 
  resource will be considered
- .withStrictLinks() - this is the **default** - only links exposed 
  as `hydra:link` will be considered

It is also possible to use custom extensions to the client,
adding i.e. support to other than built-in JSON-LD serializations of the RDF.
This can be achieved either by calling:
- .with(component: IHypermediaProcessor) - accepts a custom implementation
  of the _IHypermediaProcessor_ interface
- .withFactory(method: HypermediaProcessorFactory) - accepts a parameterles factory
  method that will provide the instance as required

Example usage with custom parameters:

```typescript
import HydraClientFactory from "@hydra-cg/heracles.ts";

let hydraClient = HydraClientFactory
  .configure()
  .withDefaults()
  .withAllLinks()
  .andCreate();
```
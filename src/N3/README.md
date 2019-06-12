# N3 support for Heracles.ts [![Build Status](https://travis-ci.org/HydraCG/Heracles.ts.svg?branch=master)](https://travis-ci.org/HydraCG/Heracles.ts) [![Coverage Status](https://coveralls.io/repos/github/HydraCG/Heracles.ts/badge.svg?branch=master)](https://coveralls.io/github/HydraCG/Heracles.ts?branch=master)

This is a plugin enabling a Heracles.ts reference Hydra client to use N3 (and derivative) RDF serializations.

## Getting started

First you'll need to add the plugin module to your project:

```bash
npm install @hydra-cg/heracles.n3 --save
```

Once added, you're ready to use the client in your code.
To obtain an instance of the client just use this snippet:

```typescript
import HydraClientFactory from "@hydra-cg/heracles.ts";

let hydraClient = HydraClientFactory
  .configure()
  .withDefaults()
  .withFactory(N3HypermediaProcessorFactory.instance)
  .andCreate();
```

Once the instance is obtained, you're free to use the client, i.e.:
```typescript
const resource = await hydraClient.getResource("http://some.domain/api.ttl");
for (const link of resource.hypermedia.links) {
  // do something with the link.
}
```

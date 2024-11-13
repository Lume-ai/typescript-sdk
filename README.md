<p align="center">
  <img src="https://app.lume.ai/assets/logo-256.png" width="300px">
</p>
<p align="center">
  📚
  <a href="https://docs.lume.ai/">Documentation</a>
  &nbsp;
  •
  &nbsp;
  🖥️
  <a href="https://app.lume.ai/">Application</a>
  &nbsp;
  •
  &nbsp;
  🏠
  <a href="https://www.lume.ai/">Home</a>
</p>
<p align="center">
  <img src="assets/ts-logo-128.png" width="64px">
</p>

## Status

The Lume Typescript SDK is currently in beta. 
Please reach out to support if you have any questions, encounter any bugs, or have any feature requests.

## Installation

```bash
npm install @lume-ai/typescript-sdk
```

```bash
yarn add @lume-ai/typescript-sdk
```

```bash
pnpm add @lume-ai/typescript-sdk
```

## Quickstart

Retrieve your input data and target schema.

```ts
const targetSchema = {
    type: "object",
    properties: {
        first_name: {
            type: "string",
            description: "The first name of the user",
        },
        last_name: {
            type: "string",
            description: "The last name of the user",
        },
    },
    required: ["first_name", "last_name"],
}

const sourceData = [
    { first_name: "John", last_name: "Doe", nickname: "JDoe" },
    { first_name: "Jane", last_name: "Smith", nickname: "JSmith" }
]
```

Create a new pipeline and map data.

```ts
import { Lume } from '@lume-ai/typescript-sdk';

const lume: Lume = new Lume('api_key');

// create a new pipeline
const pipeline = await lume.PipelineService.createPipeline({
    name: 'user_normalization',
    description: 'Mapping from API user data to internal schema.',
    target_schema: targetSchema,
    sample_data: sourceData,
});

// get the first run
const run = await pipeline.getRun(0, ['mappings']);

// get the mappings
const mappings: Mapping[] = run.mappings.items;

```

Edit a mapper

```ts

// create a new mapper version with edits
const mapper = await pipeline.createMapper({
    field_edits: [{
        field_name: 'first_name',
        transformation: {
            extract: 'nickname',
        },
    }],
    sample_data: sourceData,
});

// get the first run by a mapper version
const run = await pipeline.getRun(0, ['mappings'], mapper.version);

const mappings: Mapping[] = run.mappings.items;  // Mappings can be inspected to verify edits are correct.

// apply the new edits
await pipeline.update({
    mapper_version: mapper.id,
})

```

## Documentation

See [the full documentation](https://docs.lume.ai/pages/libraries/typescript/introduction).

## Issues / Questions

Please reach out to support if you encounter any bugs, have any questions, or have any feature requests.

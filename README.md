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
        f_name: {
            type: "string",
            description: "The first name of the user",
        },
        l_name: {
            type: "string",
            description: "The last name of the user",
        },
    },
    required: ["f_name", "l_name"],
}

const sourceData = [
    { first_name: "John", last_name: "Doe" },
    { first_name: "Jane", last_name: "Smith" }
]
```

Create a new pipeline and map data.

```ts
const lume: Lume = new Lume('api_key')

import { Lume, Mapping, Pipeline } from '@lume-ai/typescript-sdk';


const createPipeline = async (lume: Lume) => {
    const createdPipeline = await lume.pipelineService.createPipeline(
        {
            name: 'sourceX_to_destinationY',
            description: "my_description",
            target_schema: targetSchema
        }
    );
    return createdPipeline;
}


export async function run(lume: Lume) {

    // create pipeline and execute job
    const pipeline: Pipeline = await createPipeline(lume);
    const { result, jobId } = await lume.jobsService.createAndRunJob(pipeline.id, sourceData)

    // parse the results and iterate through all mapped records. Note this method is paginated.
    const mappingsPage = await lume.resultsService.getMappingsForResult(result.id, 1, 50);
    const mappings: Mapping[] = mappingsPage.items;

    // use the mappings to access the mapped records
}

run()
```

## Documentation

See [the full documentation](https://docs.lume.ai/pages/libraries/typescript/introduction).

## Issues / Questions

Please reach out to support if you encounter any bugs, have any questions, or have any feature requests.

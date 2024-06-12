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

Create a new pipeline and map data.

```ts
import { Lume, PipelineCreatePayload, Job, Pipeline, Result, Mapping } from '@lume-ai/typescript-sdk';

const lume: Lume = new Lume('api_key')

const createPipeline = async () => {
    const pipelineCreatePayload: PipelineCreatePayload = {
        name: 'pipeline_name3',
        description: "description",
        target_schema: {
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
        },
      };

      const createdPipeline = await lume.pipelineService.createPipeline(
        pipelineDetails
      );
      return createdPipeline;
}

const createJob = async (pipelineId: string) => {
    const sourceData = [
          {
            first_name: "John",
            last_name: "Doe",
          },
          {
            first_name: "Jane",
            last_name: "Doe",
          },
        ],
      };

      const createdJob = await lume.jobsService.createJobForPipeline(
        pipelineId,
        sourceData
      );

      return createdJob;
}


const run = async () => {
    
    // create pipeline and job
    const pipeline: Pipeline = await createPipeline();
    const job: Job = await createJob(pipeline.id);

    // trigger the mapping generation
    const result: Result = await lume.jobsService.runJob(job.id);

    // parse the results and iterate through all mapped records
    const mappingsPage = await lume.resultsService.getMappingsForResult(result.id); 
    const mappings: Mapping[] = mappingsPage.items;

    for (const mapping of mappings) {
        console.log("mapped record", mapping.mapped_record)
    }
}

run();
```

## Documentation

See [the full documentation](https://docs.lume.ai/pages/libraries/typescript/introduction).

## Issues / Questions

Please reach out to support if you encounter any bugs, have any questions, or have any feature requests.

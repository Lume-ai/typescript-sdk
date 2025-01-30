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

# Lume AI TypeScript SDK

The official TypeScript SDK for Lume AI's data transformation platform.

## Features

- 🚀 Create and manage data transformation flows
- 🔄 Transform data using AI-powered mapping
- ✨ Real-time validation and error handling
- 📊 Rich schema support

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

### Initialize the SDK

```typescript
import { Lume } from "@lume-ai/typescript-sdk";

const lume = new Lume("your-api-key");
```

### Create a Flow and Run

```typescript
// Define your target schema
const targetSchema = {
  type: "object",
  properties: {
    full_name: { type: "string", description: "Full name of the person" },
    age: { type: "integer", description: "Age of the person" },
  },
  required: ["full_name", "age"],
};
const lume = new Lume(apiKey);

// Create and run a new flow. Return only when the flow is complete.
const flow = await lume.flowService.createAndRunFlow(
  {
    name: "my_flow",
    description: "Process customer data",
    target_schema: schema,
    tags: ["customers"],
  },
  {
    source_data: myData,
  },
  true
);

// Process more data with existing flow
const flowId = "existing-flow-id";
const existingFlow = await lume.flowService.getFlow(flowId); // can also get by flow name
const results = await existingFlow.process(newData);

// use mapped data results, which includes the transformed data and any errors, paginated.
```

### Monitor Run Status

The Run class provides methods to track transformation progress and access results:

```typescript
// Get latest run status
await run.get();
console.log(run.status); // 'SUCCEEDED', 'FAILED', etc.

// Access run metadata
console.log(run.metadata);

// Get transformation output with pagination
const output = await run.getSchemaTransformerOutput(1, 50);
if (output) {
  console.log("Transformed items:", output.mapped_data.items);
  console.log("Validation errors:", output.errors);
}
```

## Documentation

See [the full documentation](https://docs.lume.ai/pages/libraries/typescript/introduction).

## Issues / Questions

Please reach out to support if you encounter any bugs, have any questions, or have any feature requests.

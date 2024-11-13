import { Lume } from '@lume-ai/typescript-sdk';

// Replace 'your-api-key' with your actual API key or set it as an environment variable
const apiKey = process.env.API_KEY || 'adc6667572414f5f7fad6d1a67b2ef3f';

// Initialize the Lume SDK instance
const lume = new Lume(apiKey);

// Asynchronous function to run the test code
async function runTests() {
  try {
    // Create a new pipeline
    const pipelineCreateData = {
      name: 'SDK-Test-Pipeline',
      description: 'Pipeline created for testing the Lume SDK.',
      target_schema: {
        type: 'object',
        properties: {
          full_name: { type: 'string', description: 'Full name of the person' },
          age: { type: 'integer', description: 'Age of the person' },
          address: {
            type: 'array',
            description: 'List of addresses',
            items: {
              type: 'object',
              properties: {
                street: { type: 'string', description: 'Street name' },
                city: { type: 'string', description: 'City name' },
                state: { type: 'string', description: 'State name' },
                zip: { type: 'string', description: 'Zip code' },
              },
              required: ['street', 'city', 'state', 'zip'],
            },
          },
        },
        required: ['full_name', 'age', 'address'],
      },
      sample_data: [
        {
          first_name: 'John',
          last_name: 'Doe',
          year_of_birth: 1990,
          full_addresses: [
            {
              street: '123 Main St',
              city: 'San Francisco',
              state: 'CA',
              zip: '94105',
            },
          ],
        },
        // Add more sample data as needed
      ],
    };

    console.log('Creating a new pipeline...');
    const pipeline = await lume.pipelineService.createPipeline(pipelineCreateData);
    console.log('Pipeline created:', pipeline);

    // Fetch all pipelines
    console.log('Fetching all pipelines...');
    const pipelinesPage = await lume.pipelineService.getAllPipelines();
    console.log('Pipelines fetched:', pipelinesPage.items);

    // Update the pipeline
    console.log('Updating the pipeline...');
    const pipelineEditData = {
      name: 'SDK-Test-Pipeline-Updated',
      description: 'This pipeline has been updated.',
    };
    await pipeline.update(pipelineEditData);
    console.log('Pipeline updated:', pipeline);

    // Wait for the mapper to be ready
    while (
      pipeline.mapper.creation_status === 'QUEUED' ||
      pipeline.mapper.creation_status === 'RUNNING'
    ) {
      console.log('Mapper is still creating...');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await pipeline.get();
    }

    // Create a run for the pipeline
    console.log('Creating a run for the pipeline...');
    const runCreateData = {
      data: pipelineCreateData.sample_data,
    };
    const run = await pipeline.createRun(runCreateData);
    console.log('Run created:', run);

    // Wait for the run to complete
    while (run.status === 'QUEUED' || run.status === 'RUNNING') {
      console.log('Run is still running...');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await run.get();
    }
    console.log('Run completed.');
    console.log('Run:', run);

    // Retrieve the mapper and mappings from the run
    console.log('Retrieving mapper and mappings...');
    const mapper = await run.get_mapper();
    const mappings = await run.get_mappings();
    console.log('Mapper:', mapper);
    console.log('Mappings:', mappings);

    // Clean up: delete the pipeline
    console.log('Deleting the pipeline...');
    await pipeline.delete();
    console.log('Pipeline deleted.');

    console.log('TEST COMPLETED SUCCESSFULLY');

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Execute the test function
runTests();

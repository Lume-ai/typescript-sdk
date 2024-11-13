// test-sdk.ts

import { PipelineService } from './services/PipelineService';
import { PipelineEdit, PipelineCreate } from './models/Pipeline';
import { Status } from './models/models';
import { Lume } from './index';

// Replace 'your-api-key' with your actual API key
const apiKey = 'adc6667572414f5f7fad6d1a67b2ef3f';

const lume = new Lume(apiKey);

// Initialize the PipelineService with your API key
const pipelineService = lume.pipelineService;
const sampleTargetSchema = {
    "type": "object",
    "properties": {
        "full_name": {
            "type": "string",
            "description": "Full name of the person"
        },
        "age": {
            "type": "integer",
            "description": "Age of the person"
        },
        "address": {
            "type": "array",
            "description": "List of addresses",
            "items": {
                "type": "object",
                "properties": {
                    "street": {
                        "type": "string",
                        "description": "Street name"
                    },
                    "city": {
                        "type": "string",
                        "description": "City name"
                    },
                    "state": {
                        "type": "string",
                        "description": "State name"
                    },
                    "zip": {
                        "type": "string",
                        "description": "Zip code"
                    }
                },
                "required": ["street", "city", "state", "zip"]
            }
        }
    },
    "required": ["full_name", "age", "address"]
}

const sampleSourceData = [
    {
        "first_name": "John",
        "last_name": "Doe",
        "year_of_birth": 1990,
        "full_addresses": [
            {
                "street": "123 Main St",
                "city": "San Francisco",
                "state": "CA",
                "zip": "94105"
            }
        ]
    },
    {
        "first_name": "Jane",
        "last_name": "Doe",
        "year_of_birth": 1980,
        "full_addresses": [
            {
                "street": "456 Elm St",
                "city": "Los Angeles",
                "state": "CA",
                "zip": "90001"
            }
        ]
    },
    {
        "first_name": "Alice",
        "last_name": "Smith",
        "year_of_birth": 2000,
        "full_addresses": [
            {
                "street": "789 Oak St",
                "city": "San Diego",
                "state": "CA",
                "zip": "92101"
            }
        ]
    }
]
async function testSDK() {
    // 1. Create a new pipeline
    const pipelineCreateData: PipelineCreate = {
        name: 'V2-SDK-Tester-Updated',
        description: 'This pipeline is created for testing purposes.',
        target_schema: sampleTargetSchema,
        sample_data: sampleSourceData,
    };

    console.log('Creating a new pipeline...');
    const newPipeline = await pipelineService.createPipeline(pipelineCreateData);
    console.log('Pipeline created:', newPipeline);

    // 2. Fetch all pipelines
    console.log('Fetching all pipelines...');
    const pipelinesPage = await pipelineService.getAllPipelines();
    console.log('Pipelines fetched:', pipelinesPage.items);

    // 3. Update the created pipeline
    const pipelineEditData: PipelineEdit = {
        name: 'V2-SDK-Tester-Updated',
        description: 'This pipeline has been updated.',
    };

    console.log('Updating the pipeline...');
    while (newPipeline.mapper.creation_status === Status.QUEUED || newPipeline.mapper.creation_status === Status.RUNNING) {
        console.log('Mapper is still creating...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await newPipeline.get();
    }
    await newPipeline.update(pipelineEditData);
    console.log('Pipeline updated:', newPipeline);

    // 4. Create a run for the pipeline
    const runCreateData = {
        data: sampleSourceData,
    };

    console.log('Creating a run for the pipeline...');
    let newRun = await newPipeline.createRun(runCreateData);
    console.log('Run created:', newRun);
    console.log('Run number');
    console.log(newRun.number);

    // 5. Fetch runs for the pipeline
    console.log('Fetching runs for the pipeline...');
    const runsPage = await newPipeline.getRuns();
    console.log('Runs fetched:', runsPage.items);

    // 6. Delete the pipeline
    console.log('Running the pipeline...');
    while (newRun.status === Status.QUEUED || newRun.status === Status.RUNNING) {
        console.log('Run is still running...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        //newRun = await newPipeline.getRunById(newRun.id);
        await newRun.get()
    }
    console.log('Run completed.');
    console.log(newRun);
    console.log('Get mapper:');
    console.log(await newRun.getMapper());
    console.log('Get mappings:');
    console.log(await newRun.getMappings());
    

    console.log('Create a workshop');
    let newMapper = await newPipeline.createMapper({
        "field_edits": [
            {
                "field_name": "full_name",
                "sample": {
                    "source_record": {
                        "first_name": "John",
                        "last_name": "Doe",
                        "year_of_birth": 1990,
                        "full_addresses": [
                            {
                                "street": "123 Main St",
                                "city": "San Francisco",
                                "state": "CA",
                                "zip": "94105"
                            }
                        ]
                    },
                    "mapped_record": {
                        "full_name": "Doe, John",
                        "age": null,
                        "address": [
                            {
                                "street": "123 Main St",
                                "city": "San Francisco",
                                "state": "CA",
                                "zip": "94105"
                            }
                        ]
                    }
                }
            },
            {
                "field_name": "age",
                "sample": {
                    "source_record": {
                        "first_name": "John",
                        "last_name": "Doe",
                        "year_of_birth": 1990,
                        "full_addresses": [
                            {
                                "street": "123 Main St",
                                "city": "San Francisco",
                                "state": "CA",
                                "zip": "94105"
                            }
                        ]
                    },
                    "mapped_record": {
                        "full_name": "John Doe",
                        "age": 34,
                        "address": [
                            {
                                "street": "123 Main St",
                                "city": "San Francisco",
                                "state": "CA",
                                "zip": "94105"
                            }
                        ]
                    }
                }
            }
        ],
        "sample_data": [
            {
                "first_name": "John",
                "last_name": "Doe",
                "year_of_birth": 1990,
                "full_addresses": [
                    {
                        "street": "123 Main St",
                        "city": "San Francisco",
                        "state": "CA",
                        "zip": "94105"
                    }
                ]
            },
            {
                "first_name": "Jane",
                "last_name": "Doe",
                "year_of_birth": 1980,
                "full_addresses": [
                    {
                        "street": "456 Elm St",
                        "city": "Los Angeles",
                        "state": "CA",
                        "zip": "90001"
                    }
                ]
            },
            {
                "first_name": "Alice",
                "last_name": "Smith",
                "year_of_birth": 2000,
                "full_addresses": [
                    {
                        "street": "789 Oak St",
                        "city": "San Diego",
                        "state": "CA",
                        "zip": "92101"
                    }
                ]
            }
        ]
    })
    console.log('Mapper created:', newMapper);
    while (newMapper.creation_status === Status.QUEUED || newMapper.creation_status === Status.RUNNING) {
        console.log('Mapper is still creating...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        //newMapper = await newPipeline.getMapperByVersion(newMapper.id);
        await newMapper.get(['transformations', 'manifest', 'target_schema']);
    }
    //newMapper = await newPipeline.getMapperByVersion(newMapper.id, ['transformations']);
    console.log('Get transformations:');
    console.log(await newMapper.getTransformations());
    console.log('Get manifest:');
    console.log(await newMapper.getManifest());
    console.log('Get target schema:');
    console.log(await newMapper.getTargetSchema());
    console.log('Mapper completed:', JSON.stringify(newMapper, null, 2));

    console.log('Apply the mapper to the pipeline');
    await newMapper.apply();
    //await newPipeline.update({ mapper_id: newMapper.id })
    await newPipeline.get(['transformations'])
    console.log('Pipeline updated:', JSON.stringify(newPipeline.mapper, null, 2));
    console.log('Delete the pipeline');
    await newPipeline.delete();

    console.log('Create a target schema');
    const targetSchema = await lume.targetSchemaService.createTargetSchema({
        name: 'Test-Target-Schema',
        schema: sampleTargetSchema
    });
    console.log('Target schema created:', targetSchema);
    console.log('Get target schema by id with schema');
    const targetSchemaById = await lume.targetSchemaService.getTargetSchema(targetSchema.id, ['target_schema']);
    console.log('Target schema by id:', targetSchemaById);
    console.log('Update the target schema');
    const targetSchemaUpdate = await lume.targetSchemaService.updateTargetSchema(targetSchema.id, {
        name: 'Test-Target-Schema-Updated',
    });
    console.log('Target schema updated:', targetSchemaUpdate);
    console.log('Delete the target schema');
    await lume.targetSchemaService.deleteTargetSchema(targetSchema.id);
    console.log('TEST COMPLETED SUCCESSFULLY');
    
}

testSDK();

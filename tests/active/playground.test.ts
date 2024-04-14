import { Lume } from "../../src";
import { API_KEY } from "../api_key";
import { createPipeline } from "../methods/base/createPipeline";
import { EDITED_TARGET_SCHEMA, SOURCE_DATA, TARGET_SCHEMA } from "../methods/consts/consts";
import { createJob } from "../methods/base/createJob";
import { runJob } from "../methods/base/runJob";
import { editWithTargetSchema } from "../methods/base/editWithTargetSchema";

describe("Playground Tests", () => {
    let lume: Lume;

    // Before running the tests, create an instance of JobsService
    beforeAll(() => {
        lume = new Lume(API_KEY);
    });

    it("test1", async () => {
        // const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        // const workshop = await lume.pipelineService.createWorkshopForPipeline(pipeline.id)

        const target_schema = {
            "type": "object",
            "properties": {
              "output_value": {
                "type": "string",
                "enum": [
                  "Available",
                  "Contract to Perm",
                  "Contract",
                  "Direct Hire",
                  "EOR",
                  "Permanent",
                  "Temporary To Hire",
                  "Temporary",
                  "N/A"
                ],
                "description": ""
              }
            },
            "required": [
              "output_value"
            ]
          }

          const results = await lume.resultsService.getJobResults('23da5f7b-e26b-448a-902e-a71e300f9b30')
            console.log("RESULTS", JSON.stringify(results, null, 2));

        const result = await lume.resultsService.getResult('be561323-1499-4145-9c93-b25c5e4afc45')
        console.log("RESULT", JSON.stringify(result, null, 2));
     
    }, 300000);

    // it("test2", async () => {
    //     const jobId = '70b4e40b-9191-40c7-b73d-f483e1b4d153'
    //     try {
    //     const pipeline = await lume.pipelineService.getPipeline(jobId);
    //     console.log("CORRECT", pipeline);

    //     }
    //     catch (e) {
    //         console.log("ERROR", e);

    //     }
    //     // const result = await lume.jobsService.runJob(jobId, true);
    // }, 300000);

});

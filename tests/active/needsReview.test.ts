import * as assert from "assert";
import { PaginatedResponse } from "../../src/types/pagination";
import { Job } from "../../src/models";
import { Lume } from "../../src";
import { generateRandomId } from "../methods/utils/utils";
import { API_KEY } from "../api_key";

class Singleton {
  private static _instance: Singleton;
  pipeline_id: string | null = null;
  job_id: string | null = null;
  result_id: string | null = null;
  Workshop_id: string | null = null;

  static get instance(): Singleton {
    if (!this._instance) {
      this._instance = new Singleton();
    }
    return this._instance;
  }
}

describe("Needs Review Test", () => {
  let lume: Lume;
  let pipeline_name : string

  // Before running the tests, create an instance of JobsService
  beforeAll(() => {
    lume = new Lume(API_KEY);
    pipeline_name = "sdk-test-" + generateRandomId();
  });

    it("should create a pipeline", async () => {
      const singleton = Singleton.instance;
      const pipelineDetails = {
        name: pipeline_name,
        description: "description",
        target_schema: {
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
          required: ["f_name", "last_name"],
        },
      };
      const createdPipeline = await lume.pipelineService.createPipeline(
        pipelineDetails
      );

      // Assuming createdPipeline contains some expected data
      expect(createdPipeline).toBeDefined();
      singleton.pipeline_id = createdPipeline.id;
    });

    it("should create a job for the pipeline", async () => {
        const singleton = Singleton.instance;
        const params = {
          data: [
            {
              first_name: "John",
            },
            {
              first_name: "Jane",
            },
          ],
        };
        const createdJob = await lume.jobsService.createJobForPipeline(
          singleton.pipeline_id!,
          params
        );
        expect(createdJob).toBeDefined();
        singleton.job_id = createdJob.id;
      });

      it("should run the job", async () => {
        const singleton = Singleton.instance;
        const result = await lume.jobsService.runJob(singleton.job_id!);
        expect(result).toBeDefined();
        singleton.result_id = result.id;
      }, 300000);
  
      it("should get the result", async () => {
        const singleton = Singleton.instance;
        const resultDetails = await lume.resultsService.getResult(
          singleton.result_id!
        );
  
        expect(resultDetails).toBeDefined();
        console.log("resultDetails:" ,JSON.stringify(resultDetails, null, 2));

        assert.strictEqual(resultDetails.id, singleton.result_id);
      });
  
      it("should get mappings for the result", async () => {
        const singleton = Singleton.instance;
        const mappings = await lume.resultsService.getMappingsForResult(
          singleton.result_id!
        );
        console.log("mappings", JSON.stringify(mappings, null, 2));

        expect(mappings).toBeDefined();
      });
});

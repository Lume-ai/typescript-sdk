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

describe("Full workflow test without restart", () => {
  let lume: Lume;
  let pipeline_name : string

  // Before running the tests, create an instance of JobsService
  beforeAll(() => {
    lume = new Lume(API_KEY);
    pipeline_name = "sdk-test-" + generateRandomId();
  });

  // describe("Preproccessing test - deleting existing pipelines", () => {
  //   it("should delete pipeline if it exists", async () => {
  //     const pipelineDataPage = await lume.pipelineService.getPipelineDataPage();
  //     expect(pipelineDataPage).toBeDefined();
  //     const pipeline = pipelineDataPage.items.find(
  //       (p) => p.name === pipeline_name
  //     );
  //     if (pipeline) {
  //       console.log("Deleting pipeline: ", pipeline.id);
  //       await lume.pipelineService.deletePipeline(pipeline.id);
  //     }
  //     else {
  //       console.log("Pipeline not found");
  //     }
  //   });

  //   it("should get pipelines", async () => {
  //     const pipelineDataPage = await lume.pipelineService.getPipelineDataPage();
  //     expect(pipelineDataPage).toBeDefined();
  //   });
  // });

  describe("Create Pipeline Tests", () => {
    it("should create a pipeline", async () => {
      const singleton = Singleton.instance;
      const pipelineDetails = {
        name: pipeline_name,
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

      // Assuming createdPipeline contains some expected data
      expect(createdPipeline).toBeDefined();
      singleton.pipeline_id = createdPipeline.id;
    });

    it("should get the created pipeline", async () => {
      const singleton = Singleton.instance;
      const pipelineDetails = await lume.pipelineService.getPipeline(
        singleton.pipeline_id!
      );
      assert.strictEqual(pipelineDetails.id, singleton.pipeline_id);
    });
  });

  describe("Create Job Tests", () => {
    it("should create a job for the pipeline", async () => {
      const singleton = Singleton.instance;
      const params = {
        data: [
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
        singleton.pipeline_id!,
        params
      );
      expect(createdJob).toBeDefined();
      singleton.job_id = createdJob.id;
    });

    it("should get jobs for the pipeline", async () => {
      const singleton = Singleton.instance;
      const jobsForPipeline: PaginatedResponse<Job> =
        await lume.jobsService.getJobsForPipeline(singleton.pipeline_id!);
      expect(
        jobsForPipeline.items.some((job) => job.id === singleton.job_id)
      ).toBe(true);
    });

    it("should get the created job", async () => {
      const singleton = Singleton.instance;
      const job = await lume.jobsService.getJob(singleton.job_id!);

      expect(job).toBeDefined();
      assert.strictEqual(job.id, singleton.job_id);
    });

    it("should get data for the job", async () => {
      const singleton = Singleton.instance;
      const jobDataPage = await lume.jobsService.getJobDataPage(singleton.job_id!);
      expect(jobDataPage).toBeDefined();
    });
  });

  describe("Run Job Tests", () => {
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
      assert.strictEqual(resultDetails.id, singleton.result_id);
    });

    it("should get results for the job", async () => {
      const singleton = Singleton.instance;
      const jobResults = await lume.resultsService.getJobResults(singleton.job_id!);
      expect(
        jobResults.items.some((result) => result.id === singleton.result_id)
      ).toBe(true);
    });

    it("should get mappings for the result", async () => {
      const singleton = Singleton.instance;
      const mappings = await lume.resultsService.getMappingsForResult(
        singleton.result_id!
      );
      expect(mappings).toBeDefined();
    });
  });

  describe("Workshop Tests", () => {
    it("should create a workshop for the job", async () => {
      const singleton = Singleton.instance;
      const createdWorkshop = await lume.workshopService.createWorkshopForJob(
        singleton.job_id!
      );
      expect(createdWorkshop).toBeDefined();
      singleton.Workshop_id = createdWorkshop.id;
    });

    it("should get workshops for the job", async () => {
      const singleton = Singleton.instance;
      const workshopsForJob = await lume.jobsService.getWorkshopsForJob(
        singleton.job_id!
      );
      expect(workshopsForJob).toBeDefined();
      expect(
        workshopsForJob.items.some(
          (workshop) => workshop.id === singleton.Workshop_id
        )
      ).toBe(true);
    });

    it("should get the created workshop", async () => {
      const singleton = Singleton.instance;
      const workshop = await lume.workshopService.getWorkshop(
        singleton.Workshop_id!
      );
      assert.strictEqual(workshop.id, singleton.Workshop_id);
    });

    it("should run workshop with schema and get mappings from result", async () => {
      const singleton = Singleton.instance;

      // should run workshop with schema
      const params = {
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
            full_name: {
              type: "string",
              description: "The full name of the user",
            },
          },
          required: ["first_name", "last_name", "full_name"],
        },
      };
      const workshop = await lume.workshopService.runWorkshopTargetSchema(
        singleton.Workshop_id!,
        params
      );
      expect(workshop).toBeDefined();
      singleton.result_id = workshop.id;

      // should get mappings for the workshop result
      const mappings = await lume.resultsService.getMappingsForResult(
        singleton.result_id!
      );
      expect(mappings).toBeDefined();
    }, 300000);

    it("should run workshop with schema", async () => {
      const singleton = Singleton.instance;
      const params = {
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
            full_name: {
              type: "string",
              description: "The full name of the user",
            },
          },
          required: ["first_name", "last_name", "full_name"],
        },
      };
      const workshop = await lume.workshopService.runWorkshopTargetSchema(
        singleton.Workshop_id!,
        params
      );
      expect(workshop).toBeDefined();
      singleton.result_id = workshop.id;
    }, 300000);

    it("should get mappings for the workshop result", async () => {
      const singleton = Singleton.instance;
      const mappings = await lume.resultsService.getMappingsForResult(
        singleton.result_id!
      );
      expect(mappings).toBeDefined();
    });

    it("should deploy the workshop", async () => {
      const singleton = Singleton.instance;
      const workshop = await lume.workshopService.deployWorkshop(
        singleton.Workshop_id!
      );
      expect(workshop).toBeDefined();
    });
  });
});

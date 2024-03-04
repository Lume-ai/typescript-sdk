import { PipelineSchema__Write } from "../../src/models";
import { PipelineService } from "../../src/services/PipelineService";
import { API_KEY } from "../api_key";

describe("PipelineService", () => {
  let pipelineService: PipelineService;

  // Before running the tests, create an instance of PipelineService
  beforeAll(() => {
    const apiKey = API_KEY; 
    pipelineService = new PipelineService(apiKey);
  });


  describe("createPipeline", () => {
    test("should create a pipeline", async () => {
      const pipelineDetails = {
        name: "ordered_test",
        description: "ordered_test",
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
          required: ["first_name", "last_name"],
        },
      };
      const createdPipeline = await pipelineService.createPipeline(pipelineDetails);

      expect(createdPipeline).toBeDefined();
    });
  });

  describe("getPipeline", () => {
    test("should return pipeline details", async () => {
      const pipelineId = "456"; 
      const pipelineDetails = await pipelineService.getPipeline(pipelineId);
      expect(pipelineDetails).toBeDefined();
    });
  });

  describe("getPipelineDataPage", () => {
    test("should return paginated pipeline data", async () => {
      const pipelineDataPage = await pipelineService.getPipelineDataPage();
      expect(pipelineDataPage).toBeDefined();
    });
  });

  describe("updatePipeline", () => {
    test("should update a pipeline", async () => {
      const pipelineId = "456"; 
      const pipelineDetails: PipelineSchema__Write = {
         name: "ordered_test",
         description: "ordered_test",
      };
      const updatedPipeline = await pipelineService.updatePipeline(
        pipelineId,
        pipelineDetails
      );

      expect(updatedPipeline).toBeDefined();
    });
  });

  describe("deletePipeline", () => {
    test("should delete a pipeline", async () => {
      const pipelineId = "456"; 
      await expect(
        pipelineService.deletePipeline(pipelineId)
      ).resolves.toBeUndefined();
    });
  });

  describe("getWorkshopsForPipeline", () => {
    test("should return paginated workshops for a pipeline", async () => {
      const pipelineId = "456";
      const page = 1;
      const size = 10;
      const workshopsForPipeline =
        await pipelineService.getWorkshopsForPipeline(pipelineId, page, size);

      expect(workshopsForPipeline).toBeDefined();
    });
  });

  describe("createWorkshopForPipeline", () => {
    test("should create a workshop for a pipeline", async () => {
      const pipelineId = "456"; 
      const createdWorkshop = await pipelineService.createWorkshopForPipeline(
        pipelineId
      );

      expect(createdWorkshop).toBeDefined();
    });
  });
});

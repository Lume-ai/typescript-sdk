import { WorkshopService } from "../../src/services/WorkshopService";
import { API_KEY } from "../api_key";

describe('WorkshopService', () => {
  let workshopService: WorkshopService;

  // Before running the tests, create an instance of WorkshopService
  beforeAll(() => {
    const apiKey = API_KEY; // Replace with your actual API key
    workshopService = new WorkshopService(apiKey);
  });

  describe('getWorkshop', () => {
    test('should return workshop details', async () => {
      const workshopId = '123'; // Replace with an actual workshop ID from your API
      const workshop = await workshopService.getWorkshop(workshopId);

      // Assuming workshopDetails contains some expected data
      expect(workshop).toBeDefined();
      // Add more assertions based on the expected structure of workshopDetails
    });
  });


  describe('createWorkshopForJob', () => {
    test('should create a workshop for a job', async () => {
      const jobId = '123'; // Replace with an actual job ID from your API
      const createdWorkshop = await workshopService.createWorkshopForJob(jobId);

      // Assuming createdWorkshop contains some expected data
      expect(createdWorkshop).toBeDefined();
      // Add more assertions based on the expected structure of createdWorkshop
    });
  });


  describe('deployWorkshop', () => {
    test('should deploy a workshop', async () => {
      const workshopId = '123'; // Replace with an actual job ID from your API
      const workshop = await workshopService.deployWorkshop(workshopId)

      // Assuming createdWorkshop contains some expected data
      expect(workshop).toBeDefined();
      // Add more assertions based on the expected structure of createdWorkshop
    });
  });

  describe('runWorkshopSample', () => {
    test('should run workshop with a mappings sample', async () => {
      const workshopId = '123'; // Replace with an actual job ID from your API
      const sampleDetails = {}
      const workshop = await workshopService.runWorkshopSample(workshopId, sampleDetails);
      expect(workshop).toBeDefined();
    });
  });

  describe('runWorkshopTargetSchema', () => {
    test('should run workshop with a target schema', async () => {
      const workshopId = '123'; // Replace with an actual job ID from your API
      const sampleDetails = {}
      const workshop = await workshopService.runWorkshopTargetSchema(workshopId, sampleDetails);
      expect(workshop).toBeDefined();
    });
  });

  describe('runWorkshopMapper', () => {
    test('should run workshop with mapper edits', async () => {
      const workshopId = '123'; // Replace with an actual job ID from your API
      const sampleDetails = {}
      const workshop = await workshopService.runWorkshopMapper(workshopId, sampleDetails);
      expect(workshop).toBeDefined();
    });
  });

  describe('deleteWorkshop', () => {
    test('should delete a workshop', async () => {
      const workshopId = '123'; // Replace with an actual workshop ID from your API
      await expect(workshopService.deleteWorkshop(workshopId)).resolves.toBeDefined();
    });
  });

  // Add similar tests for other methods of WorkshopService
});

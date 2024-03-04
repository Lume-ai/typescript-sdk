import { ResultsService } from "../../src/services/ResultsService";
import { API_KEY } from "../api_key";

describe('ResultsService', () => {
  let resultsService: ResultsService;

  // Before running the tests, create an instance of ResultsService
  beforeAll(() => {
    const apiKey = API_KEY; // Replace with your actual API key
    resultsService = new ResultsService(apiKey);
  });

  describe('getResult', () => {
    test('should return result details', async () => {
      const resultId = '123'; // Replace with an actual result ID from your API
      const resultDetails = await resultsService.getResult(resultId);

      // Assuming resultDetails contains some expected data
      expect(resultDetails).toBeDefined();
      // Add more assertions based on the expected structure of resultDetails
    });
  });

  describe('getJobResults', () => {
    test('should return paginated job results', async () => {
      const jobId = '123'; // Replace with an actual job ID from your API
      const jobResults = await resultsService.getJobResults(jobId);

      // Assuming jobResults contains some expected data
      expect(jobResults).toBeDefined();
      // Add more assertions based on the expected structure of jobResults
    });
  });


  describe('getMappingsForResult', () => {
    test('should return mappings for a result', async () => {
      const resultId = '123'; // Replace with an actual result ID from your API
      const mappings = await resultsService.getMappingsForResult(resultId);

      // Assuming mappings contains some expected data
      expect(mappings).toBeDefined();
      // Add more assertions based on the expected structure of mappings
    });
  });

  // Add more tests for other methods of ResultsService
});

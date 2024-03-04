import { JobsService } from "../../src/services/JobsService";
import { API_KEY } from "../api_key";

// tests/jobsService.test.ts
describe('JobsService', () => {
  let jobsService: JobsService;

  // Before running the tests, create an instance of JobsService
  beforeAll(() => {
    const apiKey = API_KEY; // Replace with your actual API key
    jobsService = new JobsService(apiKey);
  });

  describe('getJob', () => {
    test('should return job', async () => {
      const jobId = '123'; // Replace with an actual job ID from your API
      const job = await jobsService.getJob(jobId);

      // Assuming jobDetails contains some expected data
      expect(job).toBeDefined();
      // Add more assertions based on the expected structure of jobDetails
    });
  });

  describe('getJobDataPage', () => {
    test('should return paginated job data', async () => {
      const jobId = '123'; // Replace with an actual job ID from your API
      const jobDataPage = await jobsService.getJobDataPage(jobId);

      // Assuming jobDataPage contains some expected data
      expect(jobDataPage).toBeDefined();
      // Add more assertions based on the expected structure of jobDataPage
    });
  });

  describe('getJobsForPipeline', () => {
    test('should return paginated jobs for a pipeline', async () => {
      const pipelineId = '456'; // Replace with an actual pipeline ID from your API
      const jobsForPipeline = await jobsService.getJobsForPipeline(pipelineId);

      // Assuming jobsForPipeline contains some expected data
      expect(jobsForPipeline).toBeDefined();
      // Add more assertions based on the expected structure of jobsForPipeline
    });
  });

  describe('createJobForPipeline', () => {
    test('should create a job for a pipeline', async () => {
      const pipelineId = '456'; // Replace with an actual pipeline ID from your API
      const jobDetails = { title: 'New Job', description: 'Job Description' }; // Replace with valid job details
      const createdJob = await jobsService.createJobForPipeline(pipelineId, jobDetails);

      // Assuming createdJob contains some expected data
      expect(createdJob).toBeDefined();
      // Add more assertions based on the expected structure of createdJob
    });
  });

  describe('runJob', () => {
    test('should run a job', async () => {
      const jobId = '123'; // Replace with an actual job ID from your API
      const result = await jobsService.runJob(jobId);

      // Assuming result contains some expected data
      expect(result).toBeDefined();
      // Add more assertions based on the expected structure of result
    });
  });

  describe('getWorkshopsForJob', () => {
    test('should return paginated workshops for a job', async () => {
      const jobId = '123'; // Replace with an actual job ID from your API
      const workshopsForJob = await jobsService.getWorkshopsForJob(jobId);

      // Assuming workshopsForJob contains some expected data
      expect(workshopsForJob).toBeDefined();
      // Add more assertions based on the expected structure of workshopsForJob
    });
  });
});
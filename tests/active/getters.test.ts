import { API_KEY } from "../api_key";
import { Lume } from "../../src";
import { createPipeline } from "../methods/base/createPipeline";
import { SOURCE_DATA, TARGET_SCHEMA } from "../methods/consts/consts";
import { createJob } from "../methods/base/createJob";
import { runJob } from "../methods/base/runJob";

describe("Getter Tests", () => {
    let lume: Lume;

    beforeAll(() => {
        lume = new Lume(API_KEY);
    });

    it("should get job", async () => {
        const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        const job = await createJob(lume, pipeline.id, SOURCE_DATA);
        const jobGet1 = await lume.jobsService.getJob(job.id);
        const result = await runJob(lume, job.id);
        const jobGet2 = await lume.jobsService.getJob(job.id);

        expect(jobGet1).toBeDefined();
        expect(jobGet2).toBeDefined();
    }, 300000);

    it("should get job data", async () => {
        const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        const job = await createJob(lume, pipeline.id, SOURCE_DATA);
        const jobData = await lume.jobsService.getJobDataPage(job.id);

        expect(jobData).toBeDefined();
    });

    it("should get job for pipeline", async () => {
        const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        const job = await createJob(lume, pipeline.id, SOURCE_DATA);
        const jobsForPipeline = await lume.jobsService.getJobsForPipeline(
            pipeline.id
        );

        expect(jobsForPipeline).toBeDefined();
    });

    it("should get workshops for job", async () => {
        const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        const job = await createJob(lume, pipeline.id, SOURCE_DATA);

        // create workshop
        const result = await runJob(lume, job.id); 
        const workshop = await lume.workshopService.createWorkshopForJob(job.id);
        const workshopsForJob = await lume.jobsService.getWorkshopsForJob(job.id);

        expect(workshopsForJob).toBeDefined();
    }, 300000);

    it("should get workshops for job before run", async () => {
        const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        const job = await createJob(lume, pipeline.id, SOURCE_DATA);

        // create workshop
        const workshop = await lume.workshopService.createWorkshopForJob(job.id);
        const workshopsForJob = await lume.jobsService.getWorkshopsForJob(job.id);

        expect(workshopsForJob).toBeDefined();
    });

    it("should get pipeline data", async () => {
        const pipelineData = await lume.pipelineService.getPipelineDataPage();
        expect(pipelineData).toBeDefined();
    });

    it("should get pipeline", async () => {
        const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        const pipelineRet = await lume.pipelineService.getPipeline(pipeline.id);

        expect(pipelineRet).toBeDefined();
    });

    it("should get workshops for pipeline", async () => {
        const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        const job = await createJob(lume, pipeline.id, SOURCE_DATA);

        // create workshop
        const result = await runJob(lume, job.id);
        const workshop = await lume.workshopService.createWorkshopForJob(job.id);

        const workshopsForPipeline =
            await lume.pipelineService.getWorkshopsForPipeline(pipeline.id);
        expect(workshopsForPipeline).toBeDefined();
    }, 300000);

    it("should get workshop", async () => {
        const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        const job = await createJob(lume, pipeline.id, SOURCE_DATA);

        // create workshop
        const workshop = await lume.workshopService.createWorkshopForJob(job.id);
        const workshopRet = await lume.workshopService.getWorkshop(workshop.id);

        expect(workshopRet).toBeDefined();
    }, 300000);

    it("should get result", async () => {
        const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        const job = await createJob(lume, pipeline.id, SOURCE_DATA);

        // create workshop
        const result = await runJob(lume, job.id);
        const resultRet = await lume.resultsService.getResult(result.id);

        expect(resultRet).toBeDefined();
    }, 300000);

    it("should get job results", async () => {
        const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        const job = await createJob(lume, pipeline.id, SOURCE_DATA);

        // create workshop
        const result = await runJob(lume, job.id);
        const jobResults = await lume.resultsService.getJobResults(job.id);

        expect(jobResults).toBeDefined();
    });

    it("should get mappings for the result", async () => {
        const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        const job = await createJob(lume, pipeline.id, SOURCE_DATA);

        // create workshop
        const result = await runJob(lume, job.id); 
        const mappings = await lume.resultsService.getMappingsForResult(result.id);

        expect(mappings).toBeDefined();
    }, 300000);
});
import * as assert from "assert";
import { JobCreatePayload, JobExecutionResponse, Lume, Mapping, Result, WorkshopWithMapperPayload } from "../../src";
import { createPipeline } from "../methods/base/createPipeline";
import { EDITED_TARGET_SCHEMA, MAPPER_EDITS, SAMPLE_EDITS, SOURCE_DATA, TARGET_SCHEMA } from "../methods/consts/consts";
import { createJob } from "../methods/base/createJob";
import { runJob } from "../methods/base/runJob";
import { getMappings } from "../methods/base/getMappings";
import { editWithMapper } from "../methods/base/editWithMapper";
import { editWithTargetSchema } from "../methods/base/editWithTargetSchema";
import { editWithSample } from "../methods/base/editWithSample";
import { API_KEY } from "../api_key";
import { PaginatedResponse } from "../../src/types/pagination";
import { generateRandomId } from "../methods/utils/utils";

describe("Workflow Service Tests", () => {
    let lume: Lume;

    beforeAll(() => {
        lume = new Lume(API_KEY);
    });

    it("should run JobService.createAndRunJob()", async () => {
        const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        const jobCreatePayload: JobCreatePayload = {
            data: SOURCE_DATA,
        }
        const result: Result = await lume.jobsService.createAndRunJob(pipeline.id, jobCreatePayload);
        expect(result).toBeDefined();

    }, 300000);

    it("should run workflowService.executeJobCycle()", async () => {
        const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        const jobCreatePayload: JobCreatePayload = {
            data: SOURCE_DATA,
        }
        const resp: JobExecutionResponse = await lume.workflowService.executeJobCycle(pipeline.id, jobCreatePayload);
        const result = resp.result;
        const mappings = resp.mappingsPage.items;
        expect(result).toBeDefined();
        expect(mappings).toBeDefined();

    }, 300000);


    it("should run workflowService.executeJobCycleWithNewPipeline()", async () => {
        const pipelineCreatePayload = {
            name: "sdk-test-" + generateRandomId(),
            description: "description",
            target_schema: TARGET_SCHEMA,
        }
        const jobCreatePayload: JobCreatePayload = {
            data: SOURCE_DATA,
        }
        const resp: JobExecutionResponse = await lume.workflowService.executeJobCycleWithNewPipeline(pipelineCreatePayload, jobCreatePayload);
        const result = resp.result;
        const mappings = resp.mappingsPage.items;
        expect(result).toBeDefined();
        expect(mappings).toBeDefined();
    }, 300000);

    it("should run workshopService.editWithMapper()", async () => {
        const pipelineCreatePayload = {
            name: "sdk-test-" + generateRandomId(),
            description: "description",
            target_schema: TARGET_SCHEMA,
        }
        const jobCreatePayload: JobCreatePayload = {
            data: SOURCE_DATA,
        }
        const resp: JobExecutionResponse = await lume.workflowService.executeJobCycleWithNewPipeline(pipelineCreatePayload, jobCreatePayload);

        const payload: WorkshopWithMapperPayload = {
            mapper: MAPPER_EDITS,
        }

        if(!resp.result.job_id) throw new Error("job_id is undefined");
        const result: Result = await lume.workshopService.runEditCycleWithMapper(resp.result.job_id, payload);

        const mappingsPage = await lume.resultsService.getMappingsForResult(result.id);

        const mappings = mappingsPage.items;
        expect(result).toBeDefined();
        expect(mappings).toBeDefined();
    }, 300000);


});

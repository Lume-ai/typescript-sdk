import * as assert from "assert";
import { Lume } from "../../src";
import { createPipeline } from "../methods/base/createPipeline";
import { EDITED_TARGET_SCHEMA, MAPPER_EDITS, SAMPLE_EDITS, SOURCE_DATA, TARGET_SCHEMA } from "../methods/consts/consts";
import { createJob } from "../methods/base/createJob";
import { runJob } from "../methods/base/runJob";
import { getMappings } from "../methods/base/getMappings";
import { editWithMapper } from "../methods/base/editWithMapper";
import { editWithTargetSchema } from "../methods/base/editWithTargetSchema";
import { editWithSample } from "../methods/base/editWithSample";
import { API_KEY } from "../api_key";

describe("API Tests", () => {
    let lume: Lume;

    beforeAll(() => {
        lume = new Lume(API_KEY);
    });

    it("should create mapper generation", async () => {
        const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        const job = await createJob(lume, pipeline.id, SOURCE_DATA);
        const result = await runJob(lume, job.id);
        const mappings = await getMappings(lume, result.id);

        expect(result).toBeDefined();
        expect(mappings).toBeDefined();

    }, 300000);

    it("should create new pipeline and edit with mapper", async () => {
        const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        const job = await createJob(lume, pipeline.id, SOURCE_DATA);
        const result = await runJob(lume, job.id);
        const mappings = await getMappings(lume, result.id);
        const workshop = await editWithMapper(lume, job.id, false, MAPPER_EDITS);

        expect(workshop).toBeDefined();
    }, 300000);

    it("should create new pipeline and edit with target schema", async () => {
        const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        const job = await createJob(lume, pipeline.id, SOURCE_DATA);
        const result = await runJob(lume, job.id);
        const mappings = await getMappings(lume, result.id);
        const workshop = await editWithTargetSchema(
            lume,
            job.id,
            false,
            EDITED_TARGET_SCHEMA
        );

        expect(workshop).toBeDefined();
    }, 300000);

    it("should create new pipeline and edit with sample", async () => {
        const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        const job = await createJob(lume, pipeline.id, SOURCE_DATA);
        const result = await runJob(lume, job.id);
        const mappings = await getMappings(lume, result.id);
        const workshop = await editWithSample(lume, job.id, false, SAMPLE_EDITS);

        expect(workshop).toBeDefined();
    }, 300000);

});

import * as assert from "assert";
import { Lume } from "../../src";
import { editWithMapperDefault, editWithMapperMissingExtract, editWithMapperOriginal, editWithMapperWrapper, editWithMapperWrongSourceKey, editWithMapperWrongTargetKey } from "../methods/workflows/editWithMapperTests";
import { API_KEY } from "../api_key";
import { createPipeline } from "../methods/base/createPipeline";
import { EDITED_TARGET_SCHEMA, SOURCE_DATA, TARGET_SCHEMA } from "../methods/consts/consts";
import { createJob } from "../methods/base/createJob";
import { runJob } from "../methods/base/runJob";
import { getMappings } from "../methods/base/getMappings";
import { editWithTargetSchema } from "../methods/base/editWithTargetSchema";

describe("Playground Tests", () => {
    let lume: Lume;

    // Before running the tests, create an instance of JobsService
    beforeAll(() => {
        lume = new Lume(API_KEY);
    });

    it("test1", async () => {
        const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        const workshop = await lume.pipelineService.createWorkshopForPipeline(pipeline.id)
    }, 300000);

    // it("test2", async () => {
    //     const pipeline = await createPipeline(lume, TARGET_SCHEMA);
    //     const job = await createJob(lume, pipeline.id, SOURCE_DATA);
    //     const result = await runJob(lume, job.id);
    //     const mappings = await getMappings(lume, result.id);
    //     const workshop = await editWithTargetSchema(
    //         lume,
    //         job.id,
    //         false,
    //         EDITED_TARGET_SCHEMA
    //     );



    //     expect(workshop).toBeDefined();
    // }, 300000);

});

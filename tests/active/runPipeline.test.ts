import * as assert from "assert";
import { API_KEY } from "../api_key";
import { Lume } from "../../src";
import { runExistingPipelineAfterWorkshopEdit } from "../methods/workflows/runPipelineTests";
import { newPipelineEditWithMapper, newPipelineEditWithSample, newPipelineEditWithTargetSchema } from "../methods/workflows/fullWorkflowBasicTests";


describe("Run Pipeline Tests", () => {
    let lume: Lume;

    beforeAll(() => {
        lume = new Lume(API_KEY);
    });

    it("should run existing pipeline after workshop edit with mapper", async () => {
        const mappings = await runExistingPipelineAfterWorkshopEdit(lume, newPipelineEditWithMapper);
        expect(mappings).toBeDefined();
    }, 300000);

    it("should run existing pipeline after workshop edit with target schema", async () => {
        const mappings = await runExistingPipelineAfterWorkshopEdit(lume, newPipelineEditWithTargetSchema);
        expect(mappings).toBeDefined();
    }, 300000);

    it("should run existing pipeline after workshop edit with sample", async () => {
        const mappings = await runExistingPipelineAfterWorkshopEdit(lume, newPipelineEditWithSample);
        expect(mappings).toBeDefined();
    }, 300000);

});

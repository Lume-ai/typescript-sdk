import * as assert from "assert";
import { API_KEY } from "../api_key";
import { Lume } from "../../src";
import { editWithMapperDefault, editWithMapperMissingExtract, editWithMapperOriginal, editWithMapperWrapper, editWithMapperWrongSourceKey, editWithMapperWrongTargetKey } from "../methods/workflows/editWithMapperTests";


describe("Edit with Mapper Tests", () => {
    let lume: Lume;

    // Before running the tests, create an instance of JobsService
    beforeAll(() => {
        lume = new Lume(API_KEY);
    });

    it("should edit with mapper - original", async () => {
        const workshop = await editWithMapperWrapper(lume, editWithMapperOriginal);
        expect(workshop).toBeDefined();
    }, 300000);

    it("should edit with mapper - default change", async () => {
        const workshop = await editWithMapperWrapper(lume, editWithMapperDefault);
        expect(workshop).toBeDefined();
    }, 300000);

    it("should edit with mapper - wrong source key", async () => {
        const workshop = await editWithMapperWrapper(lume, editWithMapperWrongSourceKey);
        expect(workshop).toBeDefined();
    }, 300000);

    it("should edit with mapper - wrong target key", async () => {
        const workshop = await editWithMapperWrapper(lume, editWithMapperWrongTargetKey);
        expect(workshop).toBeDefined();
    }, 300000);

    it("should edit with mapper - missing extract", async () => {
        const workshop = await editWithMapperWrapper(lume, editWithMapperMissingExtract);
        expect(workshop).toBeDefined();
    }, 300000);

});

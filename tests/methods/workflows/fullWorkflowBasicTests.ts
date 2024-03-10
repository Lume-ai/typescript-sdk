import { createPipeline } from "../base/createPipeline";
import { EDITED_TARGET_SCHEMA, MAPPER_EDITS, SAMPLE_EDITS, SOURCE_DATA, TARGET_SCHEMA, verbose } from '../consts/consts';
import { createJob } from "../base/createJob";
import { runJob } from "../base/runJob";
import { getMappings } from "../base/getMappings";
import { editWithMapper } from "../base/editWithMapper";
import { editWithTargetSchema } from "../base/editWithTargetSchema";
import { editWithSample } from "../base/editWithSample";
import { Lume } from "../../../src";

export const newPipelineEditWithMapper = async (lume: Lume) => {
    const pipeline = await createPipeline(lume, TARGET_SCHEMA);
    const job = await createJob(lume, pipeline.id, SOURCE_DATA);
    const result = await runJob(lume, job.id);
    const mappings = await getMappings(lume, result.id);
    const workshop = await editWithMapper(lume, job.id, false, MAPPER_EDITS);
    return workshop;
  };
  
  export const newPipelineEditWithTargetSchema = async (lume: Lume) => {
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
    return workshop;
  };
  
  export const newPipelineEditWithSample = async (lume: Lume) => {
    const pipeline = await createPipeline(lume, TARGET_SCHEMA);
    const job = await createJob(lume, pipeline.id, SOURCE_DATA);
    const result = await runJob(lume, job.id);
    const mappings = await getMappings(lume, result.id);
    const workshop = await editWithSample(lume, job.id, false, SAMPLE_EDITS);
    return workshop;
  };

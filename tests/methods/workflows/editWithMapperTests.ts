
import {
  MAPPER_EDITS,
  SOURCE_DATA,
  TARGET_SCHEMA,
  verbose,
} from "../consts/consts";
import { createPipeline } from "../base/createPipeline";
import { createJob } from "../base/createJob";
import { runJob } from "../base/runJob";
import { getMappings } from "../base/getMappings";
import { editWithMapper } from "../base/editWithMapper";
import { Lume } from "../../../src";

export const editWithMapperOriginal = async (lume: Lume, jobId: string) => {
  const ret = editWithMapper(lume, jobId, true, MAPPER_EDITS);
  return ret;
};

export const editWithMapperDefault = async (lume: Lume, jobId: string) => {
  const mapper_edits = [
    {
      targetField: "colour", // target field transformation is being applied to
      transformation: {
        extract: "Size",
        default: null,
      },
    }
  ];
  const ret = editWithMapper(lume, jobId, true, mapper_edits);
  return ret;
};

export const editWithMapperWrongSourceKey = async (lume: Lume, jobId: string) => {
  const mapper_edits = [
    {
      targetField: "colour", // target field transformation is being applied to
      transformation: {
        extract: "wrong_key",
        default: null,
      },
    }
  ];
  const ret = editWithMapper(lume, jobId, true, mapper_edits);
  return ret;
};

export const editWithMapperWrongTargetKey = async (lume: Lume, jobId: string) => {
  const mapper_edits = [
    {
      targetField: "wrong_target_key", // target field transformation is being applied to
      transformation: {
        extract: "Size",
        default: null,
      },
    }
  ];
  const ret = editWithMapper(lume, jobId, true, mapper_edits);
  return ret;
};



export const editWithMapperMissingExtract = async (lume: Lume, jobId: string) => {
  const mapper_edits = [
    {
      targetField: "colour",
      transformation: {
      },
    }
  ];
  const ret = editWithMapper(lume, jobId, true, mapper_edits);
  return ret;
};

export const editWithMapperWrapper = async (lume: Lume, functionCallback: any) => {
  const pipeline = await createPipeline(lume, TARGET_SCHEMA);

  const job = await createJob(lume, pipeline.id, SOURCE_DATA);
  const result = await runJob(lume, job.id);
  const mappings = await getMappings(lume, result.id);

  return functionCallback(lume, job.id);
}
export async function editWithMapperTests(lume: Lume) {
  await editWithMapperWrapper(lume, editWithMapperOriginal);
  await editWithMapperWrapper(lume, editWithMapperDefault);
  await editWithMapperWrapper(lume, editWithMapperWrongSourceKey);
  await editWithMapperWrapper(lume, editWithMapperWrongTargetKey);
  await editWithMapperWrapper(lume, editWithMapperMissingExtract);
}

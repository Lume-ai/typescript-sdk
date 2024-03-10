import {
  SOURCE_DATA_NEW,
} from "../consts/consts";
import { createJob } from "../base/createJob";
import { runJob } from "../base/runJob";
import { getMappings } from "../base/getMappings";
import { Lume } from "../../../src";

  export const runExistingPipelineAfterWorkshopEdit = async (lume: Lume, workshopCreationCallback: any) => {
    const workshop = await workshopCreationCallback(lume);
    const pipelineId = workshop.pipeline_id;

    // create pipeline and job
    const job = await createJob(lume, pipelineId, SOURCE_DATA_NEW);
    const result = await runJob(lume, job.id);
    const mappings = await getMappings(lume, result.id);
    return mappings;
  };
  
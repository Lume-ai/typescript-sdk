import { Lume } from "../../../src";
import { verbose } from "../consts/consts";
import { generateRandomId } from "../utils/utils";

export async function createJob(lume: Lume, pipelineId: string, source_data: any) {
  if(verbose) console.log("\n---createJob()");
    const params = {
      data: source_data,
    };
  
    if(verbose) console.log("pipelineId", pipelineId, "params", JSON.stringify(params, null, 2));
    const createdJob = await lume.jobsService.createJobForPipeline(
      pipelineId,
      params
    );

    if(verbose) console.log("created job", JSON.stringify(createdJob, null, 2));
    return createdJob;
  };

import { createJob } from "./createJob";
import { verbose } from "../consts/consts";
import { Lume } from "../../../src";

export async function usePipeline(lume: Lume, pipelineId: string, source_data: any) {
    if(verbose) console.log("\n---usePipeline()")
    const pipeline = await lume.pipelineService.getPipeline(pipelineId);
    if(verbose) console.log("pipeline", JSON.stringify(pipeline, null, 2));
    //create job
    const job = await lume.jobsService.createJobForPipeline(pipelineId, {
      data: source_data,
    });
    if(verbose) console.log("created job", JSON.stringify(job, null, 2));
    // run job
    const result = await lume.jobsService.runJob(job.id);
    if(verbose) console.log("result", JSON.stringify(result, null, 2));
    return result;
  };

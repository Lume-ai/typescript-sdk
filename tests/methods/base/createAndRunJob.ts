import { createJob } from "./createJob";
import { verbose } from "../consts/consts";
import { Lume } from "../../../src";

export async function createAndRunJob(
  lume: Lume,
  pipelineId: string,
  source_data: any
) {
  if (verbose) console.log("\n---createAndRunJob()");
  const job = await createJob(lume, pipelineId, source_data);
  if (verbose) console.log("created job", JSON.stringify(job, null, 2));
  const result = await lume.jobsService.runJob(job.id);
  if (verbose) console.log("job result", JSON.stringify(result, null, 2));
  return result;
}

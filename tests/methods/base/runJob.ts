import { Lume } from "../../../src";
import { verbose } from "../consts/consts";
import { generateRandomId } from "../utils/utils";

export async function runJob(lume: Lume, jobId: string) {
    if(verbose) console.log("\n---runJob()")
    const result = await lume.jobsService.runJob(jobId);
    if(verbose) console.log("job result", JSON.stringify(result, null, 2));
    return result;
  };
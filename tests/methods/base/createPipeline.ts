import { Lume } from "../../../src";
import { verbose } from "../consts/consts";
import { generateRandomId } from "../utils/utils";

export async function createPipeline(lume: Lume, target_schema: any) {
  if(verbose) console.log("\n---createPipeline()");
  const pipelineName = "recreate-" + generateRandomId();
  if(verbose) console.log("pipelineName", pipelineName);
  const pipelineDetails = {
    name: pipelineName,
    description: "description",
    target_schema: target_schema,
  };

  const createdPipeline = await lume.pipelineService.createPipeline(
    pipelineDetails
  );
  if(verbose) console.log("created pipeline", JSON.stringify(createdPipeline, null, 2));
  return createdPipeline;
}

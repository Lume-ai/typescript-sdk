import { getMappings } from "./getMappings";
import { verbose } from "../consts/consts";
import { Lume } from "../../../src";

export async function editWithTargetSchema(lume: Lume, jobId: string, autoDeploy: boolean,  edited_target_schema: any,  ) {
    if(verbose) console.log("\n---editWithTargetSchema()");
    const workshop = await lume.workshopService.createWorkshopForJob(jobId);
  
    console.log("autoDeploy", autoDeploy);
    const payload = {
      target_schema: edited_target_schema,
      auto_deploy: autoDeploy, // auto deploy the workshop after the edits are applied
    };
  
    const schemaEditResult = await lume.workshopService.runWorkshopTargetSchema(
      workshop.id,
      payload
    );
  
    if(verbose) console.log("workshop schema edit result", schemaEditResult);
  
    const mappings = await getMappings(lume, schemaEditResult.id);

    console.log("schemaEditResult", JSON.stringify(schemaEditResult, null, 2));
    if(!autoDeploy) {
        if(verbose) console.log("manual deploy - workshop id", workshop.id);
        const deployResult = await lume.workshopService.deployWorkshop(workshop.id);
        console.log("manual deploy - workshop deploy result", JSON.stringify(deployResult, null, 2));
    }

    const workshop1 = await lume.workshopService.getWorkshop(workshop.id);
    console.log("workshop1", JSON.stringify(workshop1, null, 2));

    return workshop
  }
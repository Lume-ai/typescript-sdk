import { getMappings } from "./getMappings";
import { verbose } from "../consts/consts";
import { Lume } from "../../../src";

export async function editWithMapper(lume: Lume, jobId: string,  autoDeploy: boolean, mapper: any) {
    if(verbose) console.log("\n---editWithMapper()");
    const workshop = await lume.workshopService.createWorkshopForJob(jobId);
  
    if(verbose) console.log("workshop initiated")
    const mapper_edits = {
      mapper: mapper,
      auto_deploy: autoDeploy, // auto deploy the workshop after the edits are applied
    };
  
    const mappedEditResult = await lume.workshopService.runWorkshopMapper(
      workshop.id,
      mapper_edits
    );
  
    if(verbose) console.log("workshop manual edit result", JSON.stringify(mappedEditResult, null, 2));
  
    const mappings = await getMappings(lume, mappedEditResult.id);
    
    if(!autoDeploy) {
        if(verbose) console.log("manual deploy - workshop id", workshop.id);
        const deployResult = await lume.workshopService.deployWorkshop(workshop.id);
        if(verbose) console.log("manual deploy - workshop deploy result", JSON.stringify(deployResult, null, 2));
    }

    return workshop;
  }
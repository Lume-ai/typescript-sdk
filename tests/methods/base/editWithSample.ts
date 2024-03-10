import { getMappings } from "./getMappings";
import { verbose } from "../consts/consts";
import { Lume } from "../../../src";

export async function editWithSample(lume: Lume, jobId: string, autoDeploy: boolean, sample: any) {
    if(verbose) console.log("\n---editWithSample()");
    const workshop = await lume.workshopService.createWorkshopForJob(jobId);

    // TODO not mapping request schema return
    const sample_edits = {
        sample: sample,
        auto_deploy: autoDeploy, // auto deploy the workshop after the edits are applied
    };

    const sampleEditResult = await lume.workshopService.runWorkshopSample(
        workshop.id,
        sample_edits
    );

    if(verbose) console.log("workshop sample edit result", JSON.stringify(sampleEditResult, null, 2));

    const mappings = await getMappings(lume, sampleEditResult.id);

    if(!autoDeploy) {
        if(verbose) console.log("manual deploy - workshop id", workshop.id);
        const deployResult = await lume.workshopService.deployWorkshop(workshop.id);
        if(verbose) console.log("manual deploy - workshop deploy result", JSON.stringify(deployResult, null, 2));
    }

    return workshop
  }
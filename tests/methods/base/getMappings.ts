import { Lume } from "../../../src";
import { verbose } from "../consts/consts";

export async function getMappings(lume: Lume, resultId: string) {
    if(verbose) console.log("\n---getMappings()")
    const mappingsPage = await lume.resultsService.getMappingsForResult(
        resultId
      );
      const mappings = mappingsPage.items;
    
      if(verbose) console.log("mappings", JSON.stringify(mappings, null, 2));
      // for (const mapping of mappings) {
      //   if(verbose) console.log("mapped record", JSON.stringify(mapping.mapped_record, null, 2));
      //   if(verbose) console.log("spec", JSON.stringify(mapping.spec, null, 2));
      // }
    
      return mappings;
  };
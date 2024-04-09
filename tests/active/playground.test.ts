import { Lume } from "../../src";
import { API_KEY } from "../api_key";
import { createPipeline } from "../methods/base/createPipeline";
import { EDITED_TARGET_SCHEMA, SOURCE_DATA, TARGET_SCHEMA } from "../methods/consts/consts";
import { createJob } from "../methods/base/createJob";
import { runJob } from "../methods/base/runJob";
import { editWithTargetSchema } from "../methods/base/editWithTargetSchema";

describe("Playground Tests", () => {
    let lume: Lume;

    // Before running the tests, create an instance of JobsService
    beforeAll(() => {
        lume = new Lume(API_KEY);
    });

    // it("test1", async () => {
        // const pipeline = await createPipeline(lume, TARGET_SCHEMA);
        // const workshop = await lume.pipelineService.createWorkshopForPipeline(pipeline.id)

        // const target_schema = {
        //     "type": "object",
        //     "properties": {
        //         "travel_costs_by_year": {
        //             "type": "array",
        //             "description": "Total costs related to travel for each year in the P&L statement",
        //             "items": {
        //                 "type": "object",
        //                 "properties": {
        //                     "year": {
        //                         "type": "integer",
        //                         "description": "Year of the P&L statement"
        //                     },
        //                     "total_costs": {
        //                         "type": "number",
        //                         "description": "Total costs related to travel for the year"
        //                     }
        //                 },
        //                 "required": ["year", "total_costs"]
        //             }
        //         },
        //         "depreciation_by_year": {
        //             "type": "array",
        //             "description": "Total depreciation for each year in the P&L statement",
        //             "items": {
        //                 "type": "object",
        //                 "properties": {
        //                     "year": {
        //                         "type": "integer",
        //                         "description": "Year of the P&L statement"
        //                     },
        //                     "total": {
        //                         "type": "number",
        //                         "description": "Total depreciation for the year"
        //                     }
        //                 },
        //                 "required": ["year", "total"]
        //             }
        //         },
        //         "payroll_benefits_expenses_by_year": {
        //             "type": "array",
        //             "description": "Total payroll and benefits expenses for each year in the P&L statement",
        //             "items": {
        //                 "type": "object",
        //                 "properties": {
        //                     "year": {
        //                         "type": "integer",
        //                         "description": "Year of the P&L statement"
        //                     },
        //                     "total": {
        //                         "type": "number",
        //                         "description": "Total payroll and benefits expenses for the year"
        //                     }
        //                 },
        //                 "required": ["year", "total"]
        //             }
        //         },
        //         "compliance_costs_by_year": {
        //             "type": "array",
        //             "description": "Total compliance costs for each year in the P&L statement",
        //             "items": {
        //                 "type": "object",
        //                 "properties": {
        //                     "year": {
        //                         "type": "integer",
        //                         "description": "Year of the P&L statement"
        //                     },
        //                     "total": {
        //                         "type": "number",
        //                         "description": "Total compliance costs for the year"
        //                     }
        //                 },
        //                 "required": ["year", "total"]
        //             }
        //         },
        //         "office_costs_by_year": {
        //             "type": "array",
        //             "description": "Total office costs for each year in the P&L statement",
        //             "items": {
        //                 "type": "object",
        //                 "properties": {
        //                     "year": {
        //                         "type": "integer",
        //                         "description": "Year of the P&L statement"
        //                     },
        //                     "total": {
        //                         "type": "number",
        //                         "description": "Total office costs for the year"
        //                     }
        //                 },
        //                 "required": ["year", "total"]
        //             }
        //         },
        //         "education_costs_by_year": {
        //             "type": "array",
        //             "description": "Total education costs for each year in the P&L statement",
        //             "items": {
        //                 "type": "object",
        //                 "properties": {
        //                     "year": {
        //                         "type": "integer",
        //                         "description": "Year of the P&L statement"
        //                     },
        //                     "total": {
        //                         "type": "number",
        //                         "description": "Total education costs for the year"
        //                     }
        //                 },
        //                 "required": ["year", "total"]
        //             }
        //         },
        //         "dues_and_subscriptions_by_year": {
        //             "type": "array",
        //             "description": "Total dues and subscriptions for each year in the P&L statement",
        //             "items": {
        //                 "type": "object",
        //                 "properties": {
        //                     "year": {
        //                         "type": "integer",
        //                         "description": "Year of the P&L statement"
        //                     },
        //                     "total": {
        //                         "type": "number",
        //                         "description": "Total dues and subscriptions for the year"
        //                     }
        //                 },
        //                 "required": ["year", "total"]
        //             }
        //         }
        //     },
        //     "required": ["travel_costs_by_year", "depreciation_by_year", "payroll_benefits_expenses_by_year", "compliance_costs_by_year", "office_costs_by_year", "education_costs_by_year", "dues_and_subscriptions_by_year"]
        // }
        // const pipeline = await createPipeline(lume, target_schema);
    //     const payload = {
    //         data: []
    //     }
    // }, 300000);

    it("test2", async () => {
        const jobId = '70b4e40b-9191-40c7-b73d-f483e1b4d153'
        try {
        const pipeline = await lume.pipelineService.getPipeline(jobId);
        console.log("CORRECT", pipeline);

        }
        catch (e) {
            console.log("ERROR", e);

        }
        // const result = await lume.jobsService.runJob(jobId, true);
    }, 300000);

});

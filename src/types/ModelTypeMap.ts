import { Job, Mapping, Pipeline, Result, Workshop } from "../models";

// A type mapping from model strings to model types
export type ModelTypeMap = {
    job: Job,
    pipeline: Pipeline,
    workshop: Workshop,
    result: Result,
    mapping: Mapping,
  };
  
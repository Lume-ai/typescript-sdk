// src/index.ts
import { BaseService } from './services/BaseService';
import { UserService } from './services/UsersService';
import { JobsService } from './services/JobsService';
import { ResultsService } from './services/ResultsService';
import { WorkshopService } from './services/WorkshopService';
import { PipelineService } from './services/PipelineService';
import {
  WorkshopWithMapperPayload,
  MapperEditSchema,
  ManualTransformation,
  SampleEdit,
  WorkshopWithSamplePayload,
  Workshop,
  WorkshopWithSchemaPayload,
  JobCreatePayload,
  PipelineCreatePayload,
  Job,
  Mapping,
  Pipeline,
  PipelineUpdatePayload,
  Result,
  SuccessSchema,
  User,
  UserPayload
} from './models/index';
import { WorkflowService } from './services/WorkflowService';
import { PaginatedResponse } from './types/pagination';
import { JobExecutionResponse } from './models/workflows/JobExecutionResponse';

/**
 * Main entry point for interacting with Lume services.
 * Provides access to various services such as UserService, JobsService, PipelineService, etc.
 */
class Lume {
  private userService: UserService;
  jobsService: JobsService;
  pipelineService: PipelineService;
  resultsService: ResultsService;
  workshopService: WorkshopService;
  workflowService: WorkflowService;

  /**
   * Constructs a new instance of Lume.
   * @param apiKey The API key used for authentication.
   */
  constructor(apiKey: string) {
    const base = new BaseService(apiKey);

    // Initialize services
    this.userService = new UserService(apiKey);
    this.jobsService = new JobsService(apiKey);
    this.pipelineService = new PipelineService(apiKey);
    this.resultsService = new ResultsService(apiKey);
    this.workshopService = new WorkshopService(apiKey);
    this.workflowService = new WorkflowService(apiKey, this.jobsService, this.pipelineService, this.resultsService, this.workshopService);
  }
}

export {
  Lume,
  WorkshopWithMapperPayload,
  MapperEditSchema,
  ManualTransformation,
  SampleEdit,
  WorkshopWithSamplePayload,
  Workshop,
  WorkshopWithSchemaPayload,
  JobCreatePayload,
  PipelineCreatePayload,
  Job,
  Mapping,
  Pipeline,
  PipelineUpdatePayload,
  Result,
  SuccessSchema,
  User,
  UserPayload,
  JobExecutionResponse,
  PaginatedResponse
}

// Mapping.ts

import { Page } from "./models";
import { ValidationErrorSchema } from "./Error";

export interface Mapping {
    source_record: object;
    mapped_record: object;
    message?: "success" | ValidationErrorSchema | null;
  }

  export type PageMapping = Page<Mapping>;
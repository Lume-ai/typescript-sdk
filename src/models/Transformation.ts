// Transformation.ts

import { LookupItem } from "./Lookup";
import { Dependency } from "./models";
export type Transformation =
  | ExtractPath
  | DefaultValue
  | Lookup
  | Concat
  | Split
  | Conditional
  | Exists
  | Equals;

// ExtractPath Transformation
export interface ExtractPath {
  extract: string;
  default?: any;
}

// DefaultValue Transformation
export interface DefaultValue {
  default: any;
}

// Exists Transformation
export interface Exists {
  exists: string;
}

// Equals Transformation
export interface Equals {
  left: ExtractPath | DefaultValue;
  right: ExtractPath | DefaultValue;
}

// Lookup Transformation
export interface LookupParams {
  path: string;
  lookup: { [key: string]: any };
}

export interface Lookup {
  function: 'lookup';
  params: LookupParams;
  default?: any;
}

// Concat Transformation
export interface ConcatParams {
  items: Transformation[];
  delimiter: string;
}

export interface Concat {
  function: 'concat';
  params: ConcatParams;
  default?: any;
}

// Split Transformation
export interface SplitParams {
  string: Transformation;
  delimiter: string;
  index: number;
}

export interface Split {
  function: 'split';
  params: SplitParams;
  default?: any;
}

export interface Conditional {
  condition: TransformationMetadata;
  true: TransformationMetadata;
  false: TransformationMetadata;
  }
  
  export interface TransformationMetadata {
    dependencies?: Dependency | null;
    lookup_mappings?: LookupItem[] | null;
    conditional?: Conditional | null;
  }
// Manifest.ts

import { Dependency, Page } from "./models";
import { LookupItem } from "./Lookup";
import { Conditional } from "./Transformation";


export interface TargetProperty {
    name: string;
    types?: string[];
    schema?: object | null;
  }

export interface ManifestItem {
    property: TargetProperty;
    dependencies?: Dependency | null;
    lookup_mappings?: LookupItem[] | null;
    conditional?: Conditional | null;
    children?: ManifestItem[];
  }

  export type PageManifestItem = Page<ManifestItem>;
// models/Spec.ts

/**
 * Represents a manifest item in the result.
 */
export interface ManifestItem {
  property: TargetProperty;
  dependencies: Dependency;
  lookup_mappings?: LookupItem[] | null;
}

/**
 * Represents a target property in the manifest item.
 */
export interface TargetProperty {
  // Define the structure based on your API spec
  name: string;
  type: string;
}

/**
 * Represents a dependency in the manifest item.
 */
export interface Dependency {
  // Define the structure based on your API spec
  dependentProperty: string;
}

/**
 * Represents a lookup item for mapping properties.
 */
export interface LookupItem {
  source: string;
  target: string;
}

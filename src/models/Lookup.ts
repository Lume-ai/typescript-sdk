// Lookup.ts

export interface LookupItem {
    source_value: any;
    mapped_value: any;
    confidence?:
      | 'Confident'
      | 'Very High'
      | 'High'
      | 'Medium'
      | 'Low'
      | 'Very Low'
      | 'Incorrect'
      | null;
    confidence_score?: number | null;
  }
  
export type UUID = string;

export interface Page<T> {
  items: T[];
  total?: number | null;
  page?: number | null;
  size?: number | null;
  pages?: number | null;
}

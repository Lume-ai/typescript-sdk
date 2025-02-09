import { Status } from "./status";

export interface BaseModel {
  id: string;
  type: string;
  status: Status;
  created_at: string;
  updated_at: string;
  user_id: string;
  flow_id: string;
}

export interface Steps {
  id: any;
  name: string;
  status: string;
  type: string;
}

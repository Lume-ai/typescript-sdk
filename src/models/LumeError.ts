/**
 * Custom error classes to provide clearer error handling in the SDK.
 * These can capture extra error detail or context if needed.
 */

export class LumeSDKError extends Error {
  public detail?: any;
  public error_id?: string;
  public statusCode?: number;

  constructor(message: any, statusCode?: number, detail?: any, error_id?: string) {
    super(message);
    this.name = "LumeSDKError";
    this.statusCode = statusCode;
    this.detail = detail;
    this.error_id = error_id;
    Object.setPrototypeOf(this, LumeSDKError.prototype);
  }
}

export class FlowError extends LumeSDKError {
  public flow_id?: string;

  constructor(err: any, message?: string, flow_id?: string) {
    
    const statusCode = err.code ?? 500;
    const detail = err.message ?? message ?? "An unknown error occurred";
    const error_id = err.error_id ?? undefined;
    let detailMessage = detail;
    if (Array.isArray(detail)) {
      detailMessage = detail[0].msg
    }
    super(detailMessage, statusCode, detail, error_id);
    this.name = "FlowError";
    this.flow_id = flow_id;
    Object.setPrototypeOf(this, FlowError.prototype);
  }
}

export class RunError extends LumeSDKError {
  public run_id?: string;
  public flow_id?: string;

  constructor(err: any, message?: string, run_id?: string, flow_id?: string) {
    const statusCode = err.code ?? 500;
    const detail = err.message ?? message ?? "An unknown error occurred";
    const error_id = err.error_id ?? undefined;
    let detailMessage = detail;
    if (Array.isArray(detail)) {
      detailMessage = detail[0].msg
    }
    super(detailMessage, statusCode, detail, error_id);
    this.name = "RunError";
    this.run_id = run_id;
    this.flow_id = flow_id;
    Object.setPrototypeOf(this, RunError.prototype);
  }
}
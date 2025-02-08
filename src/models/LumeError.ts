/**
 * Custom error classes to provide clearer error handling in the SDK.
 * These can capture extra error detail or context if needed.
 */

export class LumeSDKError extends Error {
  public detail?: any;

  constructor(message: string, detail?: any) {
    super(message);
    this.name = "LumeSDKError";
    this.detail = detail;
    Object.setPrototypeOf(this, LumeSDKError.prototype);
  }
}

export class FlowError extends LumeSDKError {
  constructor(message: string, detail?: any) {
    super(message, detail);
    this.name = "FlowError";
    Object.setPrototypeOf(this, FlowError.prototype);
  }
}

export class RunError extends LumeSDKError {
  constructor(message: string, detail?: any) {
    super(message, detail);
    this.name = "RunError";
    Object.setPrototypeOf(this, RunError.prototype);
  }
}

// utils/errorUtils.ts

import { AxiosError } from "axios";
import { HTTPExceptionError } from "../models/Error";

/**
 * Formats an Axios error into a standardized HTTPExceptionError.
 * @param error - The AxiosError to be formatted.
 * @returns HTTPExceptionError - The standardized error object.
 */
export function formatHTTPExceptionError(error: any): HTTPExceptionError {
  if (error.response) {
    return {
      code: error.response.status,
      message: error.message || "An unknown error occurred",
    };
  } else {
    // You can choose to handle other types of errors here if needed
    return {
      code: 0,
      message: "No response received from the server",
    };
  }
}

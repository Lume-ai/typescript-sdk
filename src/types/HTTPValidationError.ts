export type ValidationError = {
    loc: Array<(string | number)>;
    msg: string;
    type: string;
};

export interface HTTPValidationError {
    detail?: ValidationError[];
}

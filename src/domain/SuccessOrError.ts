import IError from "./IError";

export default interface SuccessOrError<TResult, TError extends IError> {
	error: TError | null;
	getResult(): TResult;
	getError(): TError;
	getErrorDescription(): string;
	isSuccess: boolean;
}

export function ErrorResult<TResult, TError extends IError>(
	error: TError,
): SuccessOrError<TResult, TError> {
	return {
		error,
		getResult: () => {
			throw new Error(
				"No result. Use isSuccess to check if there is a result.",
			);
		},
		getError: () => {
			return error;
		},
		getErrorDescription: () => {
			if (typeof error === "string") {
				return error;
			}
			if (error instanceof Error) {
				return error.message;
			}
			return error.errorDescription;
		},
		isSuccess: false,
	};
}

export function SuccessResult<TResult, TError extends IError>(
	result: TResult,
): SuccessOrError<TResult, TError> {
	return {
		error: null,
		getResult: () => {
			return result;
		},
		getError: () => {
			throw new Error(
				"No error result. Use isSuccess to check if there is an error.",
			);
		},
		getErrorDescription: () => {
			return "";
		},
		isSuccess: true,
	};
}

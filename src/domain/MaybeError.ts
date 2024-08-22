import IError from "./IError";

export default interface MaybeError<TError extends IError> {
	error: TError | null;
	getError(): TError;
	getErrorDescription(): string;
	isSuccess: boolean;
}

export function ErrorResult<TError extends IError>(
	error: TError,
): MaybeError<TError> {
	return {
		error,
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

export function SuccessResult<TError extends IError>(): MaybeError<TError> {
	return {
		error: null,
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

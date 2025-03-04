export type IError = string | Error | IErrorDescription;

export interface IErrorDescription {
	errorDescription: string;
}

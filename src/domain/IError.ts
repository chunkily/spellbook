type IError = string | Error | IErrorDescription;

export default IError;

export interface IErrorDescription {
	errorDescription: string;
}

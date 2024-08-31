import { toast } from "react-toastify";

export function triggerSuccessToast(message: string) {
	// I know this looks dumb, but it will make it easier to
	// handle different default options in the future.
	toast.success(message);
}

export function triggerErrorToast(message: string) {
	toast.error(message);
}

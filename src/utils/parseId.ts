export default function parseId(id: string | undefined): number {
	if (!id) {
		throw new Response("ID is required", {
			status: 400,
			statusText: "Bad Request",
		});
	}

	const parsedId = parseInt(id, 10);
	if (isNaN(parsedId)) {
		throw new Response("ID is invalid", {
			status: 400,
			statusText: "Bad Request",
		});
	}

	return parsedId;
}

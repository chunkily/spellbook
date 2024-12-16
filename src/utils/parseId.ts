export default function parseId(id: string | undefined): string {
	if (!id) {
		throw new Response("ID is required", {
			status: 400,
			statusText: "Bad Request",
		});
	}

	return id;
}


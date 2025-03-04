interface ErrorListProps {
	id?: string;
	errors: (string | undefined)[] | undefined;
}

export default function ErrorList({ id, errors }: ErrorListProps) {
	const nonEmptyErrors = errors?.filter((error) => error);

	if (!nonEmptyErrors || nonEmptyErrors.length === 0) {
		return null;
	}

	return (
		<ul className="text-red-500" id={id}>
			{nonEmptyErrors?.map((error) => <li key={error}>{error}</li>)}
		</ul>
	);
}

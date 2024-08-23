interface ErrorListProps {
	id?: string;
	errors: string[] | undefined;
}

export default function ErrorList({ id, errors }: ErrorListProps) {
	return (
		<ul className="text-red-500" id={id}>
			{errors?.map((error) => <li key={error}>{error}</li>)}
		</ul>
	);
}

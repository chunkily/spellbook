import ButtonLink from "@/components/ui/ButtonLink";
import { DownloadIcon, UploadIcon } from "lucide-react";

export default function DataPage() {
	return (
		<div className="flex mx-3 gap-2">
			<ButtonLink to="/data/import">
				<UploadIcon className="w-4 h-4 mr-2" />
				Import Data
			</ButtonLink>
			<ButtonLink to="/data/export">
				<DownloadIcon className="w-4 h-4 mr-2" />
				Export Data
			</ButtonLink>
		</div>
	);
}

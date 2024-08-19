"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface Recipient {
	email: string;
	addedAt: string;
}

const IconButton = ({
	children,
	color,
}: {
	children: React.ReactNode;
	color: string;
}) => (
	<Button
		variant="link"
		size="icon"
		className={`text-${color}-500 bg-${color}-50 group`}
	>
		{children}
	</Button>
);

export default function ListOfRecipients({
	recipients,
}: {
	recipients: Recipient[];
}) {
	return (
		<Table>
			<TableCaption>List of recipients</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="min-w-40">Email</TableHead>
					<TableHead>Added At</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{recipients.map((recipient, index) => (
					<TableRow key={index}>
						<TableCell className="truncate max-w-40 md:max-w-96">
							{recipient.email}
						</TableCell>
						<TableCell className="truncate max-w-28 md:max-w-20">
							{recipient.addedAt}
						</TableCell>
						<TableCell className="flex gap-4 flex-col md:flex-row justify-end">
							<IconButton color="blue">
								<Edit className="md:h-4 md:w-4 group-hover:scale-125 transition duration-300" />
							</IconButton>

							<IconButton color="red">
								<Trash2 className="md:h-4 md:w-4 group-hover:scale-125 transition duration-300" />
							</IconButton>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

"use client";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import DeleteRecipient from "./delete_rcpt";
import UpdateRecipient from "./update_rcpt";

interface Recipient {
	email: string;
	addedAt: string;
}

export default function ListOfRecipients({
	recipients,
	removeRecipientFromList,
	updateRecipientFromList,
}: {
	recipients: Recipient[];
	removeRecipientFromList: (email: string) => void;
	updateRecipientFromList: (email: string, index: number) => void;
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
						<TableCell className="truncate max-w-28 md:max-w-96">
							{recipient.addedAt}
						</TableCell>
						<TableCell className="flex gap-4 flex-col md:flex-row justify-end items-end">
							<UpdateRecipient
								email={recipient.email}
								indexOfRecipient={index}
								updateRecipientAction={(
									recipientEmail,
									recipientIndex
								) =>
									updateRecipientFromList(
										recipientEmail,
										recipientIndex
									)
								}
							/>
							<DeleteRecipient
								recipientEmail={recipient.email}
								deleteRecipientAction={(recipientEmail) => {
									removeRecipientFromList(recipientEmail);
								}}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";

import { Ban, Trash2 } from "lucide-react";

export default function DeleteRecipient({
	recipientEmail,
	deleteRecipientAction,
}: {
	recipientEmail: string;
	deleteRecipientAction: (email: string) => void;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="link"
					size="icon"
					className="text-red-500 bg-red-50 group"
				>
					<Trash2 className="md:h-4 md:w-4 group-hover:scale-125 transition duration-300" />
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Are You sure?</DialogTitle>
					<DialogDescription>
						<span className="font-semibold underline decoration-dotted underline-offset-2">
							{recipientEmail}
						</span>{" "}
						will be removed from the list of recipient, are you sure
						to proceed?
					</DialogDescription>
					<DialogFooter>
						<div className="flex flex-col gap-4 md:flex-row pt-4">
							<DialogClose asChild>
								<Button variant="secondary" className="group">
									<Ban className="mr-2 md:h-4 md:w-4 group-hover:scale-125 transition duration-300" />
									Cancel
								</Button>
							</DialogClose>
							<Button
								variant="link"
								className="bg-red-50 text-red-500 group"
								onClick={() => {
									deleteRecipientAction(recipientEmail);
								}}
							>
								<Trash2 className="mr-2 md:h-4 md:w-4 group-hover:scale-125 transition duration-300" />
								Confirm
							</Button>
						</div>
					</DialogFooter>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

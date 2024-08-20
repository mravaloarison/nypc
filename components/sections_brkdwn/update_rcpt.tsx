"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Edit, Save } from "lucide-react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { toast } from "sonner";

export default function UpdateRecipient({
	email,
	indexOfRecipient,
	updateRecipientAction,
}: {
	email: string;
	indexOfRecipient: number;
	updateRecipientAction: (email: string, index: number) => void;
}) {
	const [actualEmailValue, setActualEmailValue] = useState(email);

	function updateButtonTriggered() {
		if (actualEmailValue === "") {
			toast.error("Error", {
				description: "Email cannot be empty",
			});
			return;
		}

		updateRecipientAction(actualEmailValue, indexOfRecipient);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="link"
					size="icon"
					className="text-blue-500 bg-blue-50 group"
				>
					<Edit className="md:h-4 md:w-4 group-hover:scale-125 transition duration-300" />
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Update</DialogTitle>
					<DialogDescription>
						<span className="font-semibold underline decoration-dotted underline-offset-2">
							{email}
						</span>{" "}
						will be updated to:
					</DialogDescription>
				</DialogHeader>

				<div className="pb-4">
					<Input
						type="email"
						value={actualEmailValue}
						onChange={(e) => setActualEmailValue(e.target.value)}
					/>
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button
							variant="secondary"
							onClick={updateButtonTriggered}
						>
							<Save className="md:h-4 md:w-4 mr-2" />
							Update
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";

import ListOfRecipients from "@/components/sections_brkdwn/list_of_recipients";
import SettingsManagement from "@/components/sections_brkdwn/settings_mg";

export default function Test() {
	const recipients = [
		{
			email: "mravaloarison@gmail.com",
			addedAt: "8-18-2024 9:00 PM",
		},
		{
			email: "haricovera@gmail.com",
			addedAt: "8-18-2024 9:05 PM",
		},
	];

	return (
		<main className="max-w-3xl mx-auto w-full">
			<div className="flex gap-4 items-center p-4 max-w-xl mx-auto md:pb-4">
				<Input type="email" placeholder="recipient email" />
				<Button variant="secondary" className="group">
					<PlusCircle className="mr-2 h-4 w-4 group-hover:scale-125 transform duration-300" />
					Add
				</Button>
			</div>

			<div className="w-full">
				<ListOfRecipients recipients={recipients} />
			</div>

			<SettingsManagement />
		</main>
	);
}

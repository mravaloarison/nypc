"use client";

import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
	SelectGroup,
	SelectItem,
	SelectLabel,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, FlaskConical, Save, LoaderPinwheel } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { fetchScriptureText } from "@/app/functions/scripiture";

export default function SettingsManagement({
	time,
	updateTime,
}: {
	time: string;
	updateTime: (time: string) => void;
}) {
	const days = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
		"EveryDay",
	];
	const [defaultTime, setDefaultTime] = useState(time);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	function updatingTime() {
		const timeFormat = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/;

		if (defaultTime === "") {
			toast.error("Please select a time");
			return;
		} else if (!timeFormat.test(defaultTime.toUpperCase())) {
			toast.error("Invalid time format, please use HH:MM AM/PM");
			return;
		} else {
			updateTime(defaultTime.toUpperCase());
			setIsDialogOpen(false);
			toast.success("Time updated successfully");
		}
	}

	async function runTest() {
		setIsLoading(true);

		try {
			const quoteData = await fetchQuote();
			const scriptureData = await fetchScriptureText(quoteData.quote);

			await sendEmail(scriptureData);

			toast.success("Test email sent successfully!");

			setIsLoading(false);
			setTimeout(() => {
				setIsDialogOpen(false);
			}, 500);
		} catch (error) {
			console.error(error);
			toast.error(
				"An error occurred while trying to send the email, please try again"
			);
			setIsLoading(false);
		}
	}

	async function fetchQuote() {
		try {
			const response = await fetch("/api/scrap_living_life_with_ppteer");
			if (!response.ok) throw new Error("Failed to fetch the quote");

			return await response.json();
		} catch (error: any) {
			throw new Error(`Error fetching quote: ${error.message}`);
		}
	}

	async function sendEmail(scriptureData: any) {
		try {
			const response = await fetch("/api/send", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					passageRef: scriptureData.canonical,
					passage: scriptureData.passages[0],
				}),
			});

			if (!response.ok) throw new Error("Failed to send the email");

			const data = await response.json();
			if (data.error) throw new Error(data.error);

			return data;
		} catch (error: any) {
			throw new Error(`Error sending email: ${error.message}`);
		}
	}

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<div className="flex justify-center py-12">
					<Button
						className="group"
						variant="outline"
						size="lg"
						onClick={() => setIsDialogOpen(true)}
					>
						<Settings className="mr-2 h-4 w-4 group-hover:scale-125 transform duration-300 " />
						Manage my settings
					</Button>
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
					<DialogDescription>
						View today's quote{" "}
						<a
							href="http://www.duranno.com/livinglife/qt/?OD=2024-08-20"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 underline"
						>
							here
						</a>
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4 w-full">
						<Label htmlFor="day" className="text-right">
							Every
						</Label>
						<Select defaultValue="everyday">
							<SelectTrigger className="w-[240px] md:w-[275px]">
								<SelectValue placeholder="select a day" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Days</SelectLabel>
									{days.map((day, index) => (
										<SelectItem
											key={index}
											value={day.toLowerCase()}
										>
											{day}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="time" className="text-right">
							At
						</Label>
						<Input
							defaultValue={defaultTime}
							onChange={(e) => setDefaultTime(e.target.value)}
							className="col-span-3"
						/>
					</div>
				</div>
				<DialogFooter>
					<div className="flex flex-col gap-4 md:flex-row justify-between w-full">
						<Button
							variant="link"
							className="text-blue-500 bg-blue-50 group"
							onClick={runTest}
							disabled={isLoading}
						>
							{isLoading ? (
								<LoaderPinwheel className="mr-2 md:h-4 md:w-4 animate-spin" />
							) : (
								<FlaskConical className="mr-2 md:h-4 md:w-4 group-hover:scale-125 transition duration-300" />
							)}
							Just run a test
						</Button>
						<Button className="group" onClick={updatingTime}>
							<Save className="mr-2 md:h-4 md:w-4 group-hover:scale-125 transition duration-300" />
							Save
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

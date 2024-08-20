"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";

import ListOfRecipients from "@/components/sections_brkdwn/list_of_recipients";
import SettingsManagement from "@/components/sections_brkdwn/settings_mg";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface Recipient {
	email: string;
	addedAt: string;
}

export default function Test() {
	const [listOfRexipients, setListOfRecipients] = useState<Recipient[]>([]);
	const [emailInserted, setEmailInserted] = useState("");
	const [countDown, setCountDown] = useState("");
	const [timeSet, setTimeSet] = useState("9:00 AM");

	useEffect(() => {
		const { hours, minutes, seconds } = calculateTimeLeft(
			convertTimeToMiliseconds(timeSet),
			new Date().getTime()
		);

		const interval = setInterval(() => {
			setCountDown(`${hours} hrs - ${minutes} min - ${seconds} sec`);
		}, 1000);

		// TODO: Send quotes to recipients when time is up

		return () => clearInterval(interval);
	});

	function convertTimeToMiliseconds(timeString: string) {
		const [time, period] = timeString.split(" ");
		const [hours, minutes] = time.split(":");
		let parsedHours = parseInt(hours);
		const parsedMinutes = parseInt(minutes);

		if (isNaN(parsedHours) || isNaN(parsedMinutes)) {
			throw new Error("Invalid time format");
		}

		if (period === "PM") {
			parsedHours = parsedHours + 12;
		}

		const date = new Date();
		date.setHours(parsedHours, parsedMinutes, 0, 0);

		return date.getTime();
	}

	function calculateTimeLeft(nextQuoteTime: number, actualTime: number) {
		const timeLeft = nextQuoteTime - actualTime;
		const hours = Math.floor(
			(timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

		return { hours, minutes, seconds };
	}

	function addNewRecipient() {
		if (emailInserted === "") {
			toast.warning("Hey, there!", {
				description: "Recipient email is required",
			});
			return;
		} else if (isOnTheListAlready(emailInserted)) {
			toast.error("Error", {
				description: "Recipient already on the list",
			});
			return;
		} else {
			setListOfRecipients((prev) => {
				return [
					...prev,
					{
						email: emailInserted,
						addedAt: new Date().toLocaleString(),
					},
				];
			});

			toast.success("Great!", {
				description: emailInserted + " was added to the list!",
			});

			setEmailInserted("");
		}
	}

	function isOnTheListAlready(email: string) {
		return listOfRexipients.some((recipient) => recipient.email === email);
	}

	function deleteRecipient(email: string) {
		setListOfRecipients((prev) => {
			return prev.filter((recipient) => recipient.email !== email);
		});

		toast.success("Great!", {
			description: email + " was removed from the list",
		});
	}

	function UpdateRecipient(email: string, index: number) {
		if (isOnTheListAlready(email)) {
			toast.info("FYI", {
				description: "There has been no changes",
			});
			return;
		}

		setListOfRecipients((prev) => {
			const updatedList = [...prev];
			updatedList[index].email = email;
			return updatedList;
		});

		toast.success("Great!", {
			description: email + " has been updated",
		});
	}

	return (
		<main className="max-w-3xl mx-auto w-full">
			<div className="flex gap-4 items-center p-4 max-w-xl mx-auto md:pb-4">
				<Input
					value={emailInserted}
					onChange={(e) => setEmailInserted(e.target.value)}
					type="email"
					placeholder="recipient email"
				/>
				<Button
					variant="secondary"
					className="group"
					onClick={addNewRecipient}
				>
					<PlusCircle className="mr-2 h-4 w-4 group-hover:scale-125 transform duration-300" />
					Add
				</Button>
			</div>

			<div className="w-full">
				<ListOfRecipients
					recipients={listOfRexipients}
					removeRecipientFromList={(recipientEmail) => {
						deleteRecipient(recipientEmail);
					}}
					updateRecipientFromList={(recipientEmail, index) => {
						UpdateRecipient(recipientEmail, index);
					}}
				/>
			</div>

			<div className="flex flex-col items-center justify-center gap-4 pt-12">
				<p> Next Quotes will be sent in:</p>
				<h1 className="font-semibold text-xl md:text-3xl text-slate-700 flex items-center gap-4">
					<span>⏰</span>{" "}
					{countDown ? (
						countDown
					) : (
						<Skeleton className="md:w-80 w-56 rounded-lg h-10" />
					)}
				</h1>
			</div>

			<SettingsManagement
				time={timeSet}
				updateTime={(newTime) => setTimeSet(newTime)}
			/>
		</main>
	);
}

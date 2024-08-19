"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
	SelectGroup,
	SelectItem,
	SelectLabel,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
	Edit,
	PlusCircle,
	Settings,
	FlaskConical,
	Trash2,
	Ban,
	Save,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
				<Table>
					<TableCaption>List of recipients</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="min-w-40">Email</TableHead>
							<TableHead>Added At</TableHead>
							<TableHead className="text-right">
								Actions
							</TableHead>
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
									<Button
										variant="link"
										size="icon"
										className="text-blue-500 bg-blue-50 group"
									>
										<Edit className="md:h-4 md:w-4 group-hover:scale-125 transition duration-300" />
									</Button>
									<Button
										size="icon"
										variant="link"
										className="text-red-500 bg-red-50 group"
									>
										<Trash2 className="md:h-4 md:w-4 group-hover:scale-125 transition duration-300" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<Dialog>
				<DialogTrigger asChild>
					<div className="flex justify-center py-12">
						<Button className="group" variant="outline" size="lg">
							<Settings className="mr-2 h-4 w-4 group-hover:scale-125 transform duration-300 " />
							Manage my settings
						</Button>
					</div>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>Settings</DialogHeader>
					<DialogDescription>
						View today's quote{" "}
						<a
							href="https://www.brainyquote.com/quotes_of_the_day.html"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 underline"
						>
							here
						</a>
					</DialogDescription>

					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4 w-full">
							<Label htmlFor="day" className="text-right">
								Every
							</Label>
							<Select>
								<SelectTrigger className="w-[240px] md:w-[275px]">
									<SelectValue placeholder="Select a day" />
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
								defaultValue="9:00 AM"
								className="col-span-3"
							/>
						</div>
					</div>
					<DialogFooter>
						<div className="flex justify-between w-full">
							<Button
								variant="secondary"
								className="text-orange-500 bg-orange-50"
							>
								<FlaskConical className="mr-2 h-4 w-4" />
								Test!
							</Button>
							<Button>
								<Save className="mr-2 h-4 w-4" />
								Save
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</main>
	);
}

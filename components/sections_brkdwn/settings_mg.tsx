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
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, FlaskConical, Save } from "lucide-react";

export default function SettingsManagement() {
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
						<Select value="everyday">
							<SelectTrigger className="w-[240px] md:w-[275px]">
								<SelectValue />
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
						<Input defaultValue="9:00 AM" className="col-span-3" />
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
	);
}

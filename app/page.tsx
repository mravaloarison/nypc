"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
	const [scrappedData, setScrappedData] = useState("");

	function scrapLLf() {
		setLoading(true);
		fetch("/api/scrap_living_life")
			.then((res) => res.json())
			.then((data) => setScrappedData(data.quote))
			.catch((error) => setScrappedData(error.error))
			.finally(() => setLoading(false));
	}

	const [loading, setLoading] = useState(false);

	return (
		<main className="flex h-96 flex-col items-center justify-between py-8 px-4 md:p-24">
			<div className="flex gap-8 flex-col justify-center items-center">
				{loading ? (
					<Loader className="animate-spin" />
				) : (
					<>
						{scrappedData ? (
							<p className="text-center font-semibold text-indigo-500">
								&apos;{scrappedData}&apos;
							</p>
						) : (
							<p className="text-center">
								Click the button to scrap the living life API
								for today's QT
							</p>
						)}
					</>
				)}
				<Button
					variant="secondary"
					disabled={loading}
					onClick={() => scrapLLf()}
				>
					Test scrapping living life API here
				</Button>
				<Link
					href="/test"
					className="text-blue-500 text-sm hover:underline underline-offset-4"
				>
					Go to testing page &rarr;
				</Link>
			</div>
		</main>
	);
}

import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div>
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

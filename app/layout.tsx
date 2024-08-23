import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "NYPC | EM - Automated Email App",
	description: "An automated email app for NYPC English Ministry",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="flex md:min-h-screen flex-col justify-between py-4 w-full">
					<nav className=" max-w-5xl mx-auto w-full flex justify-center items-center">
						<img
							alt="NYPC EM Logo"
							className="w-20 h-auto"
							src="https://www.nypcenglish.com/wp-content/uploads/2021/11/cropped-cropped-cropped-cropped-NYPC_EM_Logo.png"
						/>
					</nav>
					{children}
					<footer>
						<p className="text-center text-slate-300 font-medium text-xs">
							&copy; {new Date().getFullYear()} By Rava
						</p>
					</footer>
				</div>
				<Toaster richColors />
			</body>
		</html>
	);
}

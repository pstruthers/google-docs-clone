import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
	return (
		<nav className="flex items-center justify-between w-full h-full">
			<div className="flex items-center shrink-0 pr-6 gap-3">
				<Link href="/">
					<Image src="/logo.svg" alt="Logo" width={36} height={36} />
				</Link>
				<h3 className="text-xl">Docs</h3>
			</div>
			<SearchInput />
			<UserButton />
		</nav>
	);
};
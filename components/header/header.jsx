import Image from "next/image";
import logoSrc from './logo.svg'
import { Profile } from "../profile";
import { ArrowDownIcon } from "./icons/arrow-down-icon";
import { UiButton } from "../uikit/UiButton";


export function Header() {
	return (
		<header className='flex items-center h-24 bg-white shadow-lg px-8'>
			<Image src={logoSrc} alt='logo' />
			<div className="w-px h-8 bg-slate-200 mx-6" />
			<UiButton className='w-44' variant="primary" size="lg">Play</UiButton>
			<button className="ml-auto flex items-center gap-2 text-start text-teal-600 ">
				<Profile />
				<ArrowDownIcon />
			</button>
		</header>
	);
}

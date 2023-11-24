import clsx from "clsx"
import { UiButton } from "../uikit/UiButton"
import { CrossIcon } from "./icons/cross-icon"
import { ZeroIcon } from './icons/zero-icon'

export function GameField({ className }) {
	return <div className={clsx(className, 'bg-white rounded-2xl shadow-md px-8 pt-5 pb-7 ')}>

		<div className="flex gap-3">
			<div className="mr-auto">
				<div className="flex items-center gap-1 text-xl leading-tight font-semibold">
					Xod: <ZeroIcon className='w-5 h-5' />
				</div>
				<div className="flex items-center gap-1 text-xs leading-tight text-slate-400">
					CLEDY: <CrossIcon /> 
				</div>
			</div>

			<UiButton size="md" variant="primary">
				Нічия
			</UiButton>
			<UiButton size="md" variant="outline">
				здатися
			</UiButton>
		</div>
	</div>
}
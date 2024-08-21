import React from 'react'
import { Search } from 'lucide-react'

type SearchAndbtnProps = {
	value: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const SearchAndbtn: React.FC<SearchAndbtnProps> = ({ value, onChange, onSubmit }) => {
	return (
		<form
			onSubmit={onSubmit}
			className="p-2 rounded-lg dark:bg-slate-800 bg-white flex items-center gap-2 w-full shadow-md focus-within:ring-2 dark:focus-within:ring-gray-200 focus-within:ring-slate-200"
		>
			<section className="flex items-center h-full w-full gap-2">
				<Search className="text-2xl" />
				<input
					value={value}
					onChange={onChange}
					type="text"
					placeholder="Search Github username"
					className="p-2 rounded w-full h-[40px] bg-inherit outline-none px-1 text-sm"
				/>
			</section>
			<button type="submit" className="px-5 py-2 bg-blue-500 text-white rounded hover:opacity-80">
				Search
			</button>
		</form>
	)
}

export default SearchAndbtn

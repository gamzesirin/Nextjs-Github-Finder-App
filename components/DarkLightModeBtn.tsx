'use client'

import { Moon, Sun } from 'lucide-react'

import React from 'react'
import { useTheme } from 'next-themes'

const DarkLightModeBtn = () => {
	const { theme, setTheme } = useTheme()

	function toggleDark() {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	return (
		<div className="flex gap-2 items-center">
			<p className="text-sm">{theme === 'light' ? 'DARK' : 'LIGHT'}</p>
			<button onClick={toggleDark} className="text-2xl">
				{theme === 'light' ? <Moon /> : <Sun />}
			</button>
		</div>
	)
}

export default DarkLightModeBtn

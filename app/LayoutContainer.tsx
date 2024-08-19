'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import React from 'react'
import { ThemeProvider } from 'next-themes'

const queryClient = new QueryClient()

type LayoutContainerProps = {
	children: React.ReactNode
}

const LayoutContainer = ({ children }: LayoutContainerProps) => {
	return (
		<ThemeProvider attribute="class">
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</ThemeProvider>
	)
}

export default LayoutContainer

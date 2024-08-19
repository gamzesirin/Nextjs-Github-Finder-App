'use client'

import { Building, LinkIcon, MapPin, Twitter } from 'lucide-react'

import DarkLightModeBtn from '@/components/DarkLightModeBtn'
import Image from 'next/image'
import Link from 'next/link'
import SearchAndbtn from '@/components/SearchAndbtn'
import dateFormat from 'dateformat'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

type GitHubUser = {
	avatar_url: string
	bio: string | null
	blog: string | null
	company: string | null
	created_at: string
	email: string | null
	events_url: string
	followers: number
	followers_url: string
	following: number
	following_url: string
	gists_url: string
	gravatar_id: string
	hireable: boolean | null
	html_url: string
	id: number
	location: string | null
	login: string
	name: string | null
	node_id: string
	organizations_url: string
	public_gists: number
	public_repos: number
	received_events_url: string
	repos_url: string
	site_admin: boolean
	starred_url: string
	subscriptions_url: string
	twitter_username: string | null
	type: string
	updated_at: string
	url: string
}

type GitHubUserResponse = GitHubUser | { message: string }

export default function Home() {
	const [userName, setUserName] = useState('gamzesirin')

	const { isPending, error, data, refetch } = useQuery<GitHubUserResponse>({
		queryKey: ['repoData'],
		queryFn: () => fetch(`https://api.github.com/users/${userName}`).then((res) => res.json())
	})

	if (isPending) return 'Loading...'

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		refetch()
	}

	const isError = 'message' in (data || {})
	const user = isError ? null : (data as GitHubUser)

	return (
		<div className="flex w-full min-h-screen bg-stone-100 p-1.5 pt-10 sm:p-4 sm:pt-12 transition-all dark:bg-slate-900">
			<div className="flex w-full mx-auto max-w-[600px] flex-col gap-8 rounded p-2">
				<section className="flex gap-3 justify-between">
					<p className="text-lg font-semibold">Github User Finder App</p>
					<DarkLightModeBtn />
				</section>
				<section className="flex flex-col gap-6">
					<SearchAndbtn
						onChange={(e: any) => setUserName(e.target.value)}
						value={userName}
						onSubmit={(e: any) => handleSubmit(e)}
					/>
					{isError ? (
						<div className="flex flex-col w-full gap-5 rounded-lg bg-white dark:bg-slate-800 px-4 py-8 text-center text-red-600">
							{error ? (
								<p>{(error as Error).message}</p>
							) : (
								<p>{(data as { message: string }).message ?? 'User not found'}</p>
							)}
						</div>
					) : (
						<main className="flex flex-col w-full gap-5 rounded-lg bg-white dark:bg-slate-800 px-4 py-8 min-h-[200px]">
							{/* User information display */}
							<section className="flex gap-4">
								<Image
									src={user?.avatar_url ?? ''}
									alt="user image"
									width={200}
									height={200}
									className="w-20 h-20 rounded-full"
								/>
								<section className="flex flex-col justify-between gap-1 transition-all sm:w-full sm:flex-row">
									<div>
										<h1>{user?.name}</h1>
										<Link
											href={`https://github.com/${user?.login}/`}
											className="text-sm transition-all"
											target="_blank"
										>
											@{user?.login}
										</Link>
									</div>
									<p>
										<span>Joined </span>
										<span>{user?.created_at ? dateFormat(user.created_at, 'dd mm yyyy') : ''}</span>
									</p>
								</section>
							</section>
							<section className="flex flex-col gap-5">
								<p>{user?.bio ?? <span className="opacity-60 ">This profile has no bio</span>}</p>
								<div className="flex justify-between gap-3 rounded-lg bg-stone-100 px-6 py-4 dark:bg-slate-900 min-h-[50px]">
									<div className="flex flex-col items-center gap-2 ">
										<p className="text-xs opacity-60">Repos</p>
										<p className="text-sm font-bold sm:text-base">{user?.public_repos}</p>
									</div>
									<div className="flex flex-col items-center gap-2 ">
										<p className="text-xs opacity-60">Followers</p>
										<p className="text-sm font-bold sm:text-base">{user?.followers}</p>
									</div>
									<div className="flex flex-col items-center gap-2 ">
										<p className="text-xs opacity-60">Following</p>
										<p className="text-sm font-bold sm:text-base">{user?.following}</p>
									</div>
								</div>
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<div className="flex items-center gap-2">
										<MapPin className="text-xl" />
										<p>{user?.location ?? <span className="opacity-60 ">Not Available</span>}</p>
									</div>
									<div className="flex items-center gap-2">
										<LinkIcon className="text-xl" />
										{user?.blog ? (
											<Link href={user.blog} className="text-blue-500" target="_blank">
												{user.blog}
											</Link>
										) : (
											<p className="opacity-60">Not Available</p>
										)}
									</div>
									<div className="flex items-center gap-2">
										<Twitter className="text-xl" />
										<p>{user?.twitter_username ?? <span className="opacity-60 ">Not Available</span>}</p>
									</div>
									<div className="flex items-center gap-2">
										<Building className="text-xl" />
										<p>{user?.company ?? <span className="opacity-60 ">Not Available</span>}</p>
									</div>
								</div>
							</section>
						</main>
					)}
				</section>
			</div>
		</div>
	)
}

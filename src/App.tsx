import {
	RouterProvider,
	ScrollRestoration,
	createBrowserRouter,
} from 'react-router-dom'
import { RootLayout } from '@/layouts'
import { useEffect } from 'react'
import { useAppDispatch } from '@/services/store'
import { useSelector } from 'react-redux'
import {
	filmsPageCountSelector,
	getFilmsThunk,
} from '@/services/slices/filmsSlice'

const router = createBrowserRouter([
	{
		element: (
			<>
				<ScrollRestoration
					getKey={(location) => {
						const paths = '/'
						return paths === location.pathname
							? location.pathname
							: location.key
					}}
				/>
				<RootLayout />
			</>
		),
		children: [
			{
				path: '/',
				children: [
					{
						index: true,
						lazy: async () => {
							const { MainPage } = await import('@/pages')
							return { Component: MainPage }
						},
					},
					{
						path: ':type/:id',
						lazy: async () => {
							const { FilmPage } = await import('@/pages')
							return { Component: FilmPage }
						},
					},

					// {
					// 	path: ':type/:id',
					// 	Component: FilmPage,
					// 	loader: async ({ params }) => {
					// 		const film = await getFilm(params.id!);
					// 		return defer(film);
					// 	},
					// },
					// {
					// 	path: 'search',
					// 	lazy: async () => {
					// 		const { SearchPage } = await import('pages');
					// 		return { Component: SearchPage };
					// 	},
					// },
				],
			},
		],
	},
])

export const App = () => {
	const dispatch = useAppDispatch()
	const pageCount = useSelector(filmsPageCountSelector)

	useEffect(() => {
		dispatch(getFilmsThunk(pageCount))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <RouterProvider router={router} />
}

import {
	RouterProvider,
	ScrollRestoration,
	createBrowserRouter,
} from 'react-router-dom'
import { RootLayout } from '@/layouts'

const router = createBrowserRouter([
	{
		element: (
			<>
				<ScrollRestoration
					getKey={(location) => {
						return location.key
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
	return <RouterProvider router={router} />
}

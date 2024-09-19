/* eslint-disable react-hooks/exhaustive-deps */
import {
	filmsAllPagesSelector,
	filmsIsLoadingSelector,
	getFilmsSelector,
	getFilmsThunk,
} from '@/services/slices/filmsSlice'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { FilmsBlock, Filter } from '@/shared'
import { Box, LinearProgress } from '@mui/material'
import { FC, useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

export const MainPage: FC = () => {
	const films = useAppSelector(getFilmsSelector)
	const allPages = useAppSelector(filmsAllPagesSelector)
	const isLoading = useAppSelector(filmsIsLoadingSelector)
	const dispatch = useAppDispatch()
	const [searchParams, setSearchParams] = useSearchParams()
	const page = Number(searchParams.get('page')) || 1
	const location = useLocation()
	const type = searchParams.get('type')
	const genre = searchParams.get('genres.name')
	const country = searchParams.get('countries.name')
	const year = searchParams.get('year')

	const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setSearchParams((params) => {
			params.set('page', String(value))
			return params
		})
	}

	useEffect(() => {
		setSearchParams((params) => {
			params.set('page', String(page))
			return params
		})
	}, [])

	useEffect(() => {
		dispatch(
			getFilmsThunk({
				pageCount: page,
				options: {
					type: type || undefined,
					'genres.name': genre || undefined,
					'countries.name': country || undefined,
					year: year || undefined,
				},
			})
		)
	}, [location])

	return (
		<>
			{films.length === 0 && (
				<Box width={'100%'}>
					<LinearProgress />
				</Box>
			)}
			{films.length > 0 && (
				<Box
					component={'section'}
					position={'relative'}
					maxWidth='1524px'
					padding={'0 6px'}
					margin={'0 auto'}
					display={'flex'}
				>
					<Filter />
					<FilmsBlock
						items={films}
						isLoading={isLoading}
						pagesCount={allPages}
						currentPage={page}
						handleChange={handleChange}
					/>
				</Box>
			)}
		</>
	)
}

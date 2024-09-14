/* eslint-disable react-hooks/exhaustive-deps */
import {
	filmsAllPagesSelector,
	filmsIsLoadingSelector,
	getFilmsSelector,
	getFilmsThunk,
} from '@/services/slices/filmsSlice'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { FilmsBlock } from '@/shared'
import { Container } from '@mui/material'
import { FC, useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

export const MainPage: FC = () => {
	const films = useAppSelector(getFilmsSelector)
	const allPages = useAppSelector(filmsAllPagesSelector)
	const isLoading = useAppSelector(filmsIsLoadingSelector)
	const dispatch = useAppDispatch()
	const [searchParams, setSearchParams] = useSearchParams()
	const page = Number(searchParams.get('page') || 1)
	const location = useLocation()

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
		dispatch(getFilmsThunk(page))
	}, [location])

	return (
		<Container maxWidth='lg' component={'section'}>
			<FilmsBlock
				items={films}
				isLoading={isLoading}
				pagesCount={allPages}
				currentPage={page}
				handleChange={handleChange}
			/>
		</Container>
	)
}

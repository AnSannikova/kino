import {
	filmsAllPagesSelector,
	filmsIsLoadingSelector,
	filmsPageCountSelector,
	getFilmsSelector,
	getFilmsThunk,
} from '@/services/slices/filmsSlice'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { FilmsSection } from '@/shared'
import { FC } from 'react'

export const MainPage: FC = () => {
	const films = useAppSelector(getFilmsSelector)
	const allPages = useAppSelector(filmsAllPagesSelector)
	const page = useAppSelector(filmsPageCountSelector)
	const isLoading = useAppSelector(filmsIsLoadingSelector)
	const dispatch = useAppDispatch()

	const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		dispatch(getFilmsThunk(value))
	}

	return (
		<FilmsSection
			items={films}
			isLoading={isLoading}
			pagesCount={allPages}
			currentPage={page}
			handleChange={handleChange}
		/>
	)
}

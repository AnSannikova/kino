import {
	// searchPageCountSelector,
	// searchPagesLengthSelector,
	searchWordSelector,
	// searchFilmsSelector,
	// searchErrorsSelector,
	// searchIsLoadingSelector,
	searchFilmThunk,
} from '@/services/slices/searchSlice'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { SectionTitle } from '@/shared'
import { Container } from '@mui/material'
import { FC, memo, useEffect } from 'react'

export const SearchPage: FC = memo(() => {
	const searchWord = useAppSelector(searchWordSelector)
	const dispatch = useAppDispatch()
	// const pageCount = useAppSelector(searchPageCountSelector)
	// const pagesLength = useAppSelector(searchPagesLengthSelector)
	// const films = useAppSelector(searchFilmsSelector)
	// const cards = getCardsData(films)
	// const error = useAppSelector(searchErrorsSelector)
	// const isLoading = useAppSelector(searchIsLoadingSelector)

	useEffect(() => {
		dispatch(searchFilmThunk({ name: searchWord, pageCount: 1, limit: 15 }))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Container maxWidth={'lg'} component={'section'}>
			<SectionTitle>Найденные фильмы</SectionTitle>
		</Container>
	)
})

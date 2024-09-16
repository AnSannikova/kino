import {
	searchWordSelector,
	searchFilmsSelector,
	searchFilmThunk,
	searchErrorsSelector,
} from '@/services/slices/searchSlice'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { Error, SearchFilmItem, SectionTitle } from '@/shared'
import { Paths } from '@/utils/paths'
import { Box, Container, LinearProgress, List, Typography } from '@mui/material'
import { FC, memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

export const SearchPage: FC = memo(() => {
	const paths = Paths
	const searchWord = useAppSelector(searchWordSelector)
	const dispatch = useAppDispatch()
	const films = useAppSelector(searchFilmsSelector)
	const error = useAppSelector(searchErrorsSelector)

	useEffect(() => {
		dispatch(searchFilmThunk({ name: searchWord, limit: 20, pageCount: 1 }))
		console.log(searchWord)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchWord])

	return (
		<>
			{films.length === 0 && (
				<Box width={'100%'}>
					<LinearProgress />
				</Box>
			)}
			<Container
				maxWidth={'lg'}
				component={'section'}
				sx={{ paddingTop: 3, paddingBottom: 3 }}
			>
				{error && <Error value={error} />}
				{!searchWord && (
					<Typography
						variant='h1'
						sx={{ fontSize: '2.25rem', lineHeight: '2.5rem' }}
					>
						Здесь пока ничего нет
					</Typography>
				)}
				{films.length > 0 && searchWord && (
					<Box>
						<SectionTitle>Найденные фильмы</SectionTitle>
						<List>
							{films.map((item) => (
								<Link
									key={uuidv4()}
									to={`${paths.main}${item.type}/${item.id}`}
								>
									<SearchFilmItem
										size='base'
										imgSrc={item.poster?.previewUrl}
										name={item?.name || ''}
										year={item.year || undefined}
										genre={
											item.genres && item.genres.length > 0
												? item.genres[0].name
												: ''
										}
										rating={item.rating.kp !== 0 ? item.rating.kp : undefined}
									/>
								</Link>
							))}
						</List>
					</Box>
				)}
			</Container>
		</>
	)
})

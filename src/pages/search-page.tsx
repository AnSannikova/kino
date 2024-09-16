import {
	searchWordSelector,
	searchFilmsSelector,
	searchFilmThunk,
	searchErrorsSelector,
	searchPersonThunk,
	searchPersonsSelector,
} from '@/services/slices/searchSlice'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { Error, SearchFilmItem, SearchPersonItem, SectionTitle } from '@/shared'
import { TFilm, TPerson } from '@/types'
import { Paths } from '@/utils/paths'
import { Box, Container, LinearProgress, List, Typography } from '@mui/material'
import { FC, memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

export const SearchPage: FC = memo(() => {
	const mainPath = Paths.main
	const searchWord = useAppSelector(searchWordSelector)
	const dispatch = useAppDispatch()
	const films = useAppSelector(searchFilmsSelector)
	const persons = useAppSelector(searchPersonsSelector)
	const error = useAppSelector(searchErrorsSelector)

	useEffect(() => {
		dispatch(searchFilmThunk({ name: searchWord, limit: 15, pageCount: 1 }))
		dispatch(searchPersonThunk({ name: searchWord, limit: 15, pageCount: 1 }))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchWord])

	return (
		<>
			{films.length === 0 && persons.length === 0 && (
				<Box width={'100%'}>
					<LinearProgress />
				</Box>
			)}
			<Container
				maxWidth={'lg'}
				component={'section'}
				sx={{ display: 'flex', paddingTop: 3, paddingBottom: 3 }}
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
				{searchWord && (
					<>
						<FilmsSection films={films} path={mainPath} />
						<PersonSection persons={persons} />
					</>
				)}
			</Container>
		</>
	)
})

interface IFilmsSection {
	films: TFilm[]
	path: string
}

const FilmsSection: FC<IFilmsSection> = ({ films, path }) => (
	<Box width={'50%'} component={'section'}>
		<SectionTitle>Найденные фильмы</SectionTitle>
		{films.length === 0 && <Typography>Ничего не найдено</Typography>}
		<List>
			{films.map((item) => (
				<Link key={uuidv4()} to={`${path}${item.type}/${item.id}`}>
					<SearchFilmItem
						size='base'
						imgSrc={item.poster?.previewUrl}
						name={item?.name || ''}
						year={item.year || undefined}
						genre={
							item.genres && item.genres.length > 0 ? item.genres[0].name : ''
						}
						rating={item.rating.kp !== 0 ? item.rating.kp : undefined}
					/>
				</Link>
			))}
		</List>
	</Box>
)

interface IPersonSection {
	persons: TPerson[]
}

const PersonSection: FC<IPersonSection> = ({ persons }) => (
	<Box width={'50%'} component={'section'}>
		<SectionTitle>Найденные имена</SectionTitle>
		{persons.length === 0 && <Typography>Ничего не найдено</Typography>}
		<List>
			{persons.map((item) => (
				<Link
					key={uuidv4()}
					to={`https://www.kinopoisk.ru/name/${item.id}`}
					target='_blank'
				>
					<SearchPersonItem
						name={item.name}
						imgSrc={
							item.photo && item.photo?.length > 0 ? item.photo : undefined
						}
					/>
				</Link>
			))}
		</List>
	</Box>
)

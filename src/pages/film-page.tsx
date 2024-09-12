import { fetchFilm } from '@/api/filmsApi'
import {
	Description,
	Facts,
	FilmsCarousel,
	Hero,
	PersonCarousel,
} from '@/shared'
import { TFilmFull } from '@/types'
import { filterPersonsData, findActors } from '@/utils/utils'
import { Container } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const getHeroData = (film: TFilmFull) => {
	return {
		id: film.id,
		type: film.type,
		imgSrc: film.backdrop.url,
		title: film.name,
		year: film.year,
		description: film.shortDescription,
		genres: film.genres?.map((genre) => genre.name),
		countries: film.countries.map((country) => country.name),
		director: filterPersonsData(film.persons, 'режиссеры'),
		actors: findActors(film.persons),
		rating: String(film.rating.kp.toFixed(1)),
		length: film.movieLength ?? film.seriesLength ?? 0,
		ageRating: String(film.ageRating),
	}
}

export const FilmPage: FC = () => {
	const { id } = useParams()
	const [film, setFilm] = useState<TFilmFull | null>(null)

	useEffect(() => {
		try {
			const getFilm = async () => {
				const data = await fetchFilm(id!)
				setFilm(data)
			}
			getFilm()
		} catch (error) {
			console.log(error)
		}
	}, [id])

	return (
		film && (
			<>
				<Hero {...getHeroData(film)} />
				<Container
					maxWidth={'xl'}
					component={'section'}
					sx={{
						paddingTop: 5,
						paddingBottom: 7,
						display: 'flex',
						flexDirection: 'column',
						gap: 6,
					}}
				>
					<Description text={film.description} />
					{film.persons && <PersonCarousel items={film.persons} />}

					{film.sequelsAndPrequels && film.sequelsAndPrequels.length > 0 && (
						<FilmsCarousel
							items={film.sequelsAndPrequels}
							title='Сиквелы и приквелы'
						/>
					)}

					{film.similarMovies && film.similarMovies.length > 0 && (
						<FilmsCarousel items={film.similarMovies} title='Похожие фильмы' />
					)}

					{film.facts && <Facts facts={film.facts} />}
				</Container>
			</>
		)
	)
}

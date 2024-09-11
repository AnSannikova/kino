import { timeConverter } from '@/utils/utils'
import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { Rating } from './rating'
import { TFilmType } from '@/types'
import { KinopoiskLink } from './kinopoisk-link'

interface IAboutFilm {
	id: number
	type: TFilmType
	title: string
	year: number
	description: string
	genres?: string[]
	countries: string[]
	director: string[]
	actors: string[]
	rating: string
	length?: number
	ageRating?: string
}

export const AboutFilm: FC<IAboutFilm> = ({
	id,
	type,
	title,
	year,
	description,
	genres,
	countries,
	director,
	actors,
	rating,
	length,
	ageRating,
}) => (
	<Box
		sx={{
			position: 'relative',
			zIndex: 10,
			maxWidth: '650px',
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			gap: 2,
			padding: '40px 0',
			fontSize: '1.2rem',
			lineHeight: 1.2,
		}}
	>
		<Typography
			variant='h1'
			sx={{
				fontWeight: 700,
				fontSize: 'clamp(1.875rem, 0rem + 3.9063vw, 3.75rem)',
			}}
		>
			{title}
		</Typography>

		<Box display={'flex'} alignItems={'center'} gap={1.5}>
			<Rating>{rating}</Rating>
			{year > 0 && <span>{year} г.</span>}
			{length && (
				<span>{length < 60 ? `${length} мин.` : timeConverter(length)}</span>
			)}
			{ageRating && <span>{ageRating}+</span>}
		</Box>

		<Box display={'flex'} alignItems={'center'} gap={1.5}>
			<p>
				<span>
					{countries.length > 1 ? countries.join(' · ') : countries[0]}
				</span>{' '}
				·{' '}
				{genres && (
					<span>{genres.length > 1 ? genres.join(' · ') : genres[0]}</span>
				)}
			</p>
		</Box>

		<p>{description}</p>
		<p>
			<Box component={'span'} fontWeight={800}>
				Режиссер:
			</Box>{' '}
			{director.length > 1 ? director.join(', ') : director[0]}
		</p>
		<p>
			<Box component={'span'} fontWeight={800}>
				Актеры:
			</Box>{' '}
			{actors.join(', ')}
		</p>

		<KinopoiskLink type={type} id={id} />
	</Box>
)

/* eslint-disable @typescript-eslint/no-unused-vars */
import { TFilmType } from '@/types'
import { Box, Container, Typography } from '@mui/material'
import { FC, memo } from 'react'
import cover from '@/assets/cover.webp'
import { timeConverter } from '@/utils/utils'
import { Rating } from './rating'

interface IHero {
	id: number
	type: TFilmType
	imgSrc?: string
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

export const Hero: FC<IHero> = memo(
	({
		id,
		type,
		imgSrc,
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
			component={'section'}
			sx={{
				position: 'relative',
				zIndex: 5,
				width: '100%',
				height: '88dvh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-end',
				':before': {
					content: '""',
					display: 'block',
					position: 'absolute',
					inset: 0,
					zIndex: 10,
					background:
						'linear-gradient(270deg, rgba(0,0,0,0) 18%, rgba(0,0,0,1) 100%);',
				},
			}}
		>
			<Box
				component={'img'}
				src={imgSrc ?? cover}
				alt={`Постер к ${title}`}
				sx={{
					position: 'absolute',
					inset: 0,
					width: '100%',
					height: '100%',
					display: 'block',
					objectFit: 'cover',
					objectPosition: '200px 25%',
				}}
			/>

			<Container maxWidth='xl' sx={{ margin: '0 auto' }}>
				<Box
					sx={{
						position: 'relative',
						zIndex: 10,
						maxWidth: '650px',
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						padding: 5,
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
							<span>
								{length < 60 ? `${length} мин.` : timeConverter(length)}
							</span>
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
								<span>
									{genres.length > 1 ? genres.join(' · ') : genres[0]}
								</span>
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
				</Box>
			</Container>
		</Box>
	)
)

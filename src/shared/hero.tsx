import { TFilmType } from '@/types'
import { Box, Container } from '@mui/material'
import { FC, memo } from 'react'
import cover from '@/assets/cover.webp'
import { AboutFilm } from './about-film'

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
	rating?: string
	length?: number
	ageRating?: string
}

export const Hero: FC<IHero> = memo((props) => (
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
			'::before': {
				content: '""',
				display: 'block',
				position: 'absolute',
				inset: 0,
				zIndex: 10,
				background:
					'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,0.78) 38%, rgba(0,0,0,0) 75%)',
			},
		}}
	>
		<Box
			component={'img'}
			src={props.imgSrc ?? cover}
			alt={`Постер к ${props.title}`}
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

		<Container maxWidth='lg' sx={{ margin: '0 auto' }}>
			<AboutFilm {...props} />
		</Container>
	</Box>
))

import { Box, Card, CardActionArea, CardMedia, Typography } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { CardRating } from './card-rating'

interface IFilmCard {
	id: number
	type: string
	imgSrc: string
	title: string
	rating?: {
		kp: string
		imdb?: string
	}
	year?: string
	genre?: string
}

export const FilmCard: FC<IFilmCard> = ({
	id,
	imgSrc,
	title,
	rating,
	year,
	genre,
	type,
}) => {
	const meta = [year, genre]
	return (
		<Link to={`/${type}/${id}`}>
			<Box component={'article'}>
				<Card sx={{ position: 'relative' }}>
					<CardActionArea>
						<Box sx={{ aspectRatio: 1 / 1.45 }}>
							<CardMedia
								component={'img'}
								src={imgSrc}
								alt={title}
								height={'100%'}
								width={'100%'}
							/>
						</Box>
					</CardActionArea>
					<Box sx={{ position: 'absolute', top: 5, left: 5 }}>
						{rating?.kp && <CardRating>{rating.kp}</CardRating>}
					</Box>
				</Card>
				<Typography
					variant='subtitle1'
					noWrap={true}
					sx={{
						fontWeight: 700,
						fontSize: '1rem',
						lineHeight: 1.2,
						marginTop: '10px',
						marginBottom: '6px',
					}}
				>
					{title}
				</Typography>
				<Box
					display={'flex'}
					gap={'8px'}
					alignItems={'center'}
					fontSize={'1rem'}
				>
					{year && genre && (
						<Typography variant='body2' sx={{ lineHeight: 1.2 }}>
							{meta.join(', ')}
						</Typography>
					)}
				</Box>
			</Box>
		</Link>
	)
}

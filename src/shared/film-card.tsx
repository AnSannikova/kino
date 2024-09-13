import { Box, Card, CardActionArea, CardMedia, Typography } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'

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
				<Card>
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
				</Card>
				<Typography
					variant='subtitle1'
					noWrap={true}
					sx={{
						fontWeight: 700,
						lineHeight: 1.2,
						marginTop: '10px',
						marginBottom: '6px',
						fontSize: '18px',
					}}
				>
					{title}
				</Typography>
				<Box display={'flex'} gap={'8px'} alignItems={'center'}>
					{rating?.kp && (
						<Typography
							variant='body2'
							sx={{
								lineHeight: 1,
								bgcolor: '#5d5d5d',
								padding: '1px 4px',
								borderRadius: '4px',
							}}
						>
							{rating.kp}
						</Typography>
					)}
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

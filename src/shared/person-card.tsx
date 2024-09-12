import { Box, Card, CardActionArea, CardMedia, Typography } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface IPersonCard {
	id: number
	imgSrc: string
	name: string
	profession: string
}

export const PersonCard: FC<IPersonCard> = ({
	id,
	imgSrc,
	name,
	profession,
}) => (
	<Link to={`https://www.kinopoisk.ru/name/${id}`} target='_blank'>
		<Box
			component={'article'}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '2px',
				alignItems: 'flex-start',
			}}
		>
			<Card
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					overflow: 'hidden',
					aspectRatio: 1 / 1,
					borderRadius: '100%',
				}}
			>
				<CardActionArea>
					<CardMedia
						component={'img'}
						src={imgSrc}
						alt={name}
						sx={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							objectPosition: 'center',
						}}
					/>
				</CardActionArea>
			</Card>
			<Typography
				variant='body1'
				sx={{
					fontSize: '14px',
					lineHeight: 1.43,
					fontWeight: 700,
				}}
			>
				{name.length && (
					<>
						<Box component={'span'} display={'block'}>
							{name.split(' ')[0]}
						</Box>
						<Box component={'span'} display={'block'}>
							{name.split(' ').slice(1).join(' ')}
						</Box>
					</>
				)}
			</Typography>
			<Typography variant='body1' sx={{ fontSize: '14px', lineHeight: 1.43 }}>
				{profession}
			</Typography>
		</Box>
	</Link>
)

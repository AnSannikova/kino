import { Box, Card, CardActionArea, CardMedia, Typography } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface IServiceCard {
	name: string
	imgSrc: string
	link: string
}

export const ServiceCard: FC<IServiceCard> = ({ name, imgSrc, link }) => (
	<Link to={link} target='_blank'>
		<Box component={'article'}>
			<Card
				sx={{
					marginBottom: '0.25rem',
				}}
			>
				<CardActionArea>
					<CardMedia
						component={'img'}
						src={imgSrc}
						alt={name}
						sx={{
							width: '72px',
							height: '72px',
							borderRadius: '0.25rem',
						}}
					/>
				</CardActionArea>
			</Card>
			<Typography
				sx={{
					maxWidth: '72px',
					width: '100%',
					fontSize: '16px',
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
				}}
			>
				{name}
			</Typography>
		</Box>
	</Link>
)

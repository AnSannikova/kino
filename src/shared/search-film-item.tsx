import { Box, ListItemButton, ListItemText } from '@mui/material'
import { FC } from 'react'
import { CardRating } from './card-rating'
import cover from '@/assets/card-cover.svg'

interface ISearchFilmItem {
	imgSrc?: string | null
	name: string
	rating?: number
	year?: number
	genre?: string
	size?: 'small' | 'base'
}

export const SearchFilmItem: FC<ISearchFilmItem> = ({
	imgSrc,
	name,
	rating,
	year,
	genre,
	size = 'small',
}) => {
	const smallSize = size === 'small'

	return (
		<ListItemButton>
			<Box
				component={'img'}
				src={imgSrc ?? cover}
				alt={`Постер к ${name}`}
				width={smallSize ? '32px' : '80px'}
				height={smallSize ? '48px' : '120px'}
				marginRight={'14px'}
				sx={{ '&:hover': { color: '#855AF6' } }}
			/>
			<ListItemText>
				<p>{name}</p>
				<Box
					display={'flex'}
					fontSize={smallSize ? '16px' : '18px'}
					alignItems={'center'}
					gap={1}
				>
					{rating && <CardRating>{rating.toFixed(1)}</CardRating>}
					{year && <span>{year}</span>}
					{year && genre && <span>{' · '}</span>}
					{genre && <span>{genre}</span>}
				</Box>
			</ListItemText>
		</ListItemButton>
	)
}

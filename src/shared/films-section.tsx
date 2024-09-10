import { TFilm } from '@/types'
import { getCardsData } from '@/utils/utils'
import { Box, List, ListItem, Pagination, Skeleton } from '@mui/material'
import { FC } from 'react'
import { FilmCard } from './film-card'

interface IFilmsSection {
	items: TFilm[]
	isLoading: boolean
	pagesCount: number
	currentPage: number
	handleChange: (event: React.ChangeEvent<unknown>, value: number) => void
}

export const FilmsSection: FC<IFilmsSection> = ({
	items,
	isLoading,
	pagesCount,
	currentPage,
	handleChange,
}) => {
	const cardItems = getCardsData(items)

	return (
		<Box component={'section'} padding={'16px 0'}>
			<List
				sx={{
					width: '100%',
					display: 'flex',
					flexWrap: 'wrap',
					alignContent: 'flex-start',
					padding: '0 0 16px',
				}}
			>
				{cardItems.map((item) => (
					<ListItem
						key={item.id}
						sx={{
							width: 'calc(100% / 7)',
							display: 'block',
							padding: '8px 20px 20px',
						}}
					>
						{isLoading ? (
							<Box>
								<Box sx={{ aspectRatio: 1 / 1.45 }}>
									<Skeleton
										width={'100%'}
										height={'100%'}
										variant='rectangular'
										sx={{ borderRadius: '4px' }}
									/>
								</Box>
								<Skeleton width={'100%'} sx={{ margin: '10px 0 6px' }} />
								<Skeleton width={'100%'} />
							</Box>
						) : (
							<FilmCard {...item} />
						)}
					</ListItem>
				))}
			</List>

			<Box display={'flex'} justifyContent={'center'}>
				{isLoading ? (
					<Skeleton width={365.5} height={32} />
				) : (
					<Pagination
						count={pagesCount}
						page={currentPage}
						color='primary'
						onChange={handleChange}
					/>
				)}
			</Box>
		</Box>
	)
}

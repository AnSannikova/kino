import { Box, InputAdornment, List, OutlinedInput } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { ChangeEvent, FC, useRef, useState } from 'react'
import { searchFilms } from '@/api/filmsApi'
import { TFilm } from '@/types'
import { SearchItem } from './search-item'
import { useClickAway } from 'react-use'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

export const SearchBlock: FC = () => {
	const [value, setValue] = useState('')
	const [films, setFilms] = useState<TFilm[] | null>(null)
	const [focused, setFocused] = useState(false)
	const ref = useRef(null)

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
		fetchFilm(e.target.value)
	}

	useClickAway(ref, () => {
		setFocused(false)
	})

	const fetchFilm = _.debounce((value: string) => {
		try {
			const getFilm = async () => {
				const data = (await searchFilms(value, 5)).docs
				setFilms(data)
			}
			getFilm()
		} catch (error) {
			console.log(error)
		}
	}, 450)

	return (
		<Box maxWidth={'450px'} width={'100%'} position={'relative'}>
			<OutlinedInput
				onFocus={() => setFocused(true)}
				ref={ref}
				value={value}
				onChange={onChangeInput}
				placeholder='Поиск'
				startAdornment={
					<InputAdornment position='start'>
						<SearchIcon />
					</InputAdornment>
				}
				fullWidth
				sx={{
					'& .MuiInputBase-input': {
						padding: '10px 14px 10px 0',
					},
				}}
			/>
			{focused && value.length > 0 && (
				<Box
					position={'absolute'}
					top={50}
					left={0}
					right={0}
					zIndex={2}
					bgcolor={'#222034'}
					borderRadius={'10px'}
					border={'1px solid #d5d1ea'}
				>
					<List>
						{films?.map((item) => (
							<SearchItem
								key={uuidv4()}
								id={item.id}
								type={item.type}
								imgSrc={item.poster?.previewUrl}
								name={item?.name || ''}
								year={item.year || undefined}
								genre={
									item.genres && item.genres.length > 0
										? item.genres[0].name
										: ''
								}
							/>
						))}
					</List>
				</Box>
			)}
		</Box>
	)
}

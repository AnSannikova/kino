import {
	Box,
	Button,
	CircularProgress,
	InputAdornment,
	List,
	OutlinedInput,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { SearchFilmItem } from './search-items/search-film-item'
import { ChangeEvent, FC, FormEvent, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { searchFilms } from '@/api/filmsApi'
import { TFilm } from '@/types'
import { useClickAway } from 'react-use'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch } from '@/services/store'
import { resetSearchState, setSearchWord } from '@/services/slices/searchSlice'
import { Paths } from '@/utils/paths'

export const SearchBlock: FC = () => {
	const [value, setValue] = useState('')
	const [films, setFilms] = useState<TFilm[] | null>(null)
	const [focused, setFocused] = useState(false)
	const ref = useRef(null)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const paths = Paths

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

	const onClickItem = () => {
		setFocused(false)
		setFilms(null)
		setValue('')
	}

	const goToSearch = () => {
		navigate(paths.search)
		dispatch(setSearchWord(value))
		setValue('')
		dispatch(resetSearchState())
	}

	const onSubmit = (e: FormEvent) => {
		e.preventDefault()
		goToSearch()
	}

	return (
		<Box ref={ref} maxWidth={'450px'} width={'100%'} position={'relative'}>
			<form onSubmit={onSubmit}>
				<OutlinedInput
					onFocus={() => setFocused(true)}
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
			</form>
			{focused && value.length > 0 && (
				<Box
					position={'absolute'}
					top={50}
					left={0}
					right={0}
					zIndex={10}
					bgcolor={'#222034'}
					borderRadius={'10px'}
					border={'1px solid #d5d1ea'}
				>
					{!films && (
						<Box
							display={'flex'}
							justifyContent={'center'}
							alignContent={'center'}
							padding={10}
						>
							<CircularProgress />
						</Box>
					)}
					{films && (
						<List>
							{films.map((item) => (
								<Link
									onClick={onClickItem}
									key={uuidv4()}
									to={`${paths.main}${item.type}/${item.id}`}
								>
									<SearchFilmItem
										imgSrc={item.poster?.previewUrl}
										name={item?.name || ''}
										year={item.year || undefined}
										genre={
											item.genres && item.genres.length > 0
												? item.genres[0].name
												: ''
										}
										rating={item.rating.kp !== 0 ? item.rating.kp : undefined}
									/>
								</Link>
							))}
							<Box display={'flex'} justifyContent={'center'}>
								<Button
									onClick={goToSearch}
									variant='text'
									sx={{ lineHeight: 1.2 }}
								>
									Показать еще
								</Button>
							</Box>
						</List>
					)}
				</Box>
			)}
		</Box>
	)
}

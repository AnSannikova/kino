import {
	countriesSelector,
	genresSelector,
} from '@/services/slices/filterSlice'
import { useAppSelector } from '@/services/store'
import { getYears, resetSearchParams } from '@/utils/utils'
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material'
import { FC, FormEvent, SyntheticEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

interface IFilterForm {
	type?: string
	'genres.name'?: string
	'countries.name'?: string
	yearsStart?: string
	yearsEnd?: string
}

const FilmType = {
	фильм: 'movie',
	сериал: 'tv-series',
	мультфильм: 'cartoon',
	'анимационный сериал': 'animated-series',
	аниме: 'anime',
}

export const Filter: FC = () => {
	const types = Object.keys(FilmType)
	const genres = useAppSelector(genresSelector)
	const countries = useAppSelector(countriesSelector)
	const years = getYears()
	const [searchParams, setSearchParams] = useSearchParams()

	const [formSate, setFormState] = useState<IFilterForm>({
		type:
			Object.keys(FilmType).find(
				(k) => FilmType[k as keyof typeof FilmType] === searchParams.get('type')
			) ?? '',
		'genres.name': searchParams.get('genres.name') ?? '',
		'countries.name': searchParams.get('countries.name') ?? '',
		yearsStart: searchParams.get('year')?.split('-')[0] ?? '',
		yearsEnd: searchParams.get('year')?.split('-')[1] ?? '',
	})

	const onSubmit = (e: FormEvent) => {
		e.preventDefault()
	}

	const resetPageCount = () => {
		setSearchParams((params) => {
			params.set('page', '1')
			return params
		})
	}

	const onChange = (value: string, reason: string, key: string) => {
		if (reason === 'selectOption') {
			setFormState({
				...formSate,
				[key === 'year' ? 'yearsStart' : key]: value,
			})
			setSearchParams((params) => {
				params.set(
					key,
					key === 'type' ? FilmType[value as keyof typeof FilmType] : value
				)
				return params
			})
			resetPageCount()
		} else if (reason === 'clear') {
			setFormState({ ...formSate, [key === 'year' ? 'yearsStart' : key]: '' })
			searchParams.delete(key)
			setSearchParams(searchParams)
			resetPageCount()
		}
	}

	const onChangeYearsEnd = (value: string, reason: string) => {
		if (reason === 'selectOption') {
			setFormState({ ...formSate, yearsEnd: value })
			setSearchParams((params) => {
				params.set('year', `${formSate.yearsStart}-${value}`)
				return params
			})
			resetPageCount()
		} else if (reason === 'clear') {
			setFormState({ ...formSate, yearsEnd: '' })
			setSearchParams((params) => {
				params.set('year', formSate.yearsStart ?? '')
				return params
			})
			resetPageCount()
		}
	}

	const onResetButtonClick = () => {
		resetSearchParams(searchParams, setSearchParams)
		setFormState({
			type: '',
			'genres.name': '',
			'countries.name': '',
			yearsStart: '',
			yearsEnd: '',
		})
	}

	return (
		<Box
			onSubmit={onSubmit}
			component={'form'}
			sx={{
				position: 'sticky',
				top: 0,
				height: 'fit-content',
				width: '100%',
				maxWidth: '280px',
				flexShrink: 0,
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				padding: '24px 16px 0 0',
			}}
		>
			<Autocomplete
				value={formSate.type}
				onInputChange={(_e: SyntheticEvent, value: string, reason: string) =>
					onChange(value, reason, 'type')
				}
				id='type'
				size='small'
				options={types}
				getOptionLabel={(option) => option}
				renderInput={(params) => <TextField {...params} label='Формат' />}
			/>
			<Autocomplete
				value={formSate['genres.name']}
				onInputChange={(_e: SyntheticEvent, value: string, reason: string) =>
					onChange(value, reason, 'genres.name')
				}
				size='small'
				id='genre'
				options={genres}
				getOptionLabel={(option) => option}
				renderInput={(params) => <TextField {...params} label='Жанр' />}
			/>
			<Autocomplete
				value={formSate['countries.name']}
				onInputChange={(_e: SyntheticEvent, value: string, reason: string) =>
					onChange(value, reason, 'countries.name')
				}
				size='small'
				id='country'
				limitTags={1}
				options={countries}
				getOptionLabel={(option) => option}
				renderInput={(params) => (
					<TextField {...params} label='Страна производства' />
				)}
			/>

			<Box>
				<Typography sx={{ marginBottom: 1 }}>Период:</Typography>
				<Box
					display={'flex'}
					width={'100%'}
					gap={1}
					sx={{ '& .MuiAutocomplete-root': { width: '100%' } }}
				>
					<Autocomplete
						value={formSate.yearsStart}
						onInputChange={(
							_e: SyntheticEvent,
							value: string,
							reason: string
						) => onChange(value, reason, 'year')}
						size='small'
						id='yearsStart'
						options={years}
						getOptionLabel={(option) => option}
						renderInput={(params) => <TextField {...params} label='C' />}
					/>
					<Autocomplete
						value={formSate.yearsEnd}
						disabled={!formSate.yearsStart}
						onInputChange={(
							_e: SyntheticEvent,
							value: string,
							reason: string
						) => onChangeYearsEnd(value, reason)}
						size='small'
						id='yearsEnd'
						options={years}
						getOptionLabel={(option) => option}
						renderInput={(params) => <TextField {...params} label='По' />}
					/>
				</Box>
			</Box>
			<Button
				onClick={onResetButtonClick}
				disabled={
					Object.values(formSate).filter((item) => item.length > 1).length === 0
				}
				type='reset'
				variant='contained'
				sx={{ minWidth: '250px' }}
			>
				Сбросить
			</Button>
		</Box>
	)
}

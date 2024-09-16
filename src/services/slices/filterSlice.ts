import { fetchPossibleCountries, fetchPossibleGenres } from '@/api/filmsApi'
import { TPossibleValuesField } from '@/types'
import { getYears } from '@/utils/utils'
import { createAsyncThunk } from '@reduxjs/toolkit'

type TFilterState = {
	genres: TPossibleValuesField[]
	countries: TPossibleValuesField[]
	years: string[]
	isLoading: boolean
	errors: string | undefined
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initialState: TFilterState = {
	genres: [],
	countries: [],
	years: getYears(),
	isLoading: false,
	errors: undefined,
}

export const getPossibleGenresThunk = createAsyncThunk(
	'filter/getGenres',
	async () => fetchPossibleGenres()
)

export const getPossibleCountriesThunk = createAsyncThunk(
	'filter/getCountries',
	async () => fetchPossibleCountries()
)

import { fetchPossibleCountries, fetchPossibleGenres } from '@/api/filmsApi'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { RootState } from '../store'

type TFilterState = {
	genres: string[]
	countries: string[]
	isLoading: boolean
	errors: string | undefined
}

const initialState: TFilterState = {
	genres: [],
	countries: [],
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
const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getPossibleGenresThunk.fulfilled, (state, action) => {
				state.errors = undefined
				state.isLoading = false
				state.genres = action.payload.map((item) => item.name)
			})
			.addCase(getPossibleCountriesThunk.fulfilled, (state, action) => {
				state.errors = undefined
				state.isLoading = false
				state.countries = action.payload.map((item) => item.name)
			})
			.addMatcher(
				isAnyOf(
					getPossibleGenresThunk.rejected,
					getPossibleCountriesThunk.rejected
				),
				(state, action) => {
					state.errors = action.error.message
					state.isLoading = false
				}
			)
			.addMatcher(
				isAnyOf(
					getPossibleGenresThunk.pending,
					getPossibleCountriesThunk.pending
				),
				(state) => {
					state.errors = undefined
					state.isLoading = true
				}
			)
	},
})

export const filterReducer = filterSlice.reducer
export const genresSelector = (state: RootState) => state.filter.genres
export const countriesSelector = (state: RootState) => state.filter.countries
export const filterErrorsSelector = (state: RootState) => state.filter.errors
export const filterIsLoadingSelector = (state: RootState) =>
	state.filter.isLoading

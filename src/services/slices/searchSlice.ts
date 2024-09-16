import {
	createAsyncThunk,
	createSlice,
	isAnyOf,
	PayloadAction,
} from '@reduxjs/toolkit'
import { TFilm, TPerson } from '../../types'
import { RootState } from '../store'
import { searchFilms, searchPersons } from '@/api/filmsApi'

type TSearchState = {
	filmItems: TFilm[]
	personItems: TPerson[]
	searchWord: string
	errors: string | undefined
}

const initialState: TSearchState = {
	filmItems: [],
	personItems: [],
	searchWord: '',
	errors: undefined,
}

export const searchFilmThunk = createAsyncThunk(
	'search/findFilm',
	async ({
		name,
		limit,
		pageCount,
	}: {
		name: string
		limit: number
		pageCount: number
	}) => searchFilms(name, limit, pageCount)
)

export const searchPersonThunk = createAsyncThunk(
	'search/findPerson',
	async ({
		name,
		limit,
		pageCount,
	}: {
		name: string
		limit: number
		pageCount: number
	}) => searchPersons(name, limit, pageCount)
)

const filmsSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		resetSearchState: (state) => {
			state.filmItems = []
			state.personItems = []
		},
		setSearchWord: (state, action: PayloadAction<string>) => {
			state.searchWord = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(searchFilmThunk.fulfilled, (state, action) => {
				state.errors = undefined
				state.filmItems = []
				state.filmItems = state.filmItems.concat(action.payload.docs)
			})
			.addCase(searchPersonThunk.fulfilled, (state, action) => {
				state.errors = undefined
				state.personItems = []
				state.personItems = state.personItems.concat(action.payload.docs)
			})
			.addMatcher(
				isAnyOf(searchFilmThunk.rejected, searchPersonThunk.rejected),
				(state, action) => {
					state.errors = action.error.message
				}
			)
			.addMatcher(
				isAnyOf(searchFilmThunk.pending, searchPersonThunk.pending),
				(state) => {
					state.errors = undefined
				}
			)
	},
})

export const searchReducer = filmsSlice.reducer
export const { resetSearchState, setSearchWord } = filmsSlice.actions
export const searchWordSelector = (state: RootState) => state.search.searchWord
export const searchFilmsSelector = (state: RootState) => state.search.filmItems
export const searchPersonsSelector = (state: RootState) =>
	state.search.personItems
export const searchErrorsSelector = (state: RootState) => state.search.errors

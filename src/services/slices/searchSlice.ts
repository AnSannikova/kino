import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TFilm } from '../../types'
import { RootState } from '../store'
import { searchFilms } from '@/api/filmsApi'

type TSearchState = {
	items: TFilm[]
	searchWord: string
	errors: string | undefined
}

const initialState: TSearchState = {
	items: [],
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

const filmsSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		resetSearchState: (state) => {
			state.items = []
		},
		setSearchWord: (state, action: PayloadAction<string>) => {
			state.searchWord = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(searchFilmThunk.fulfilled, (state, action) => {
				state.errors = undefined
				state.items = []
				state.items = state.items.concat(action.payload.docs)
			})
			.addCase(searchFilmThunk.rejected, (state, action) => {
				state.errors = action.error.message
			})
			.addCase(searchFilmThunk.pending, (state) => {
				state.errors = undefined
			})
	},
})

export const searchReducer = filmsSlice.reducer
export const { resetSearchState, setSearchWord } = filmsSlice.actions
export const searchWordSelector = (state: RootState) => state.search.searchWord
export const searchFilmsSelector = (state: RootState) => state.search.items
export const searchErrorsSelector = (state: RootState) => state.search.errors

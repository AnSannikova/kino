import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TFilm } from '../../types'
import { RootState } from '../store'
import { searchFilms } from '@/api/filmsApi'

type TSearchState = {
	items: TFilm[]
	searchWord: string
	pageCount: number
	pagesLength: number | null
	isLoading: boolean
	errors: string | undefined
}

const initialState: TSearchState = {
	items: [],
	searchWord: '',
	pageCount: 1,
	pagesLength: null,
	isLoading: false,
	errors: undefined,
}

export const searchFilmThunk = createAsyncThunk(
	'search/findFilm',
	async ({
		name,
		pageCount,
		limit,
	}: {
		name: string
		pageCount: number
		limit: number
	}) => searchFilms(name, pageCount, limit)
)

const filmsSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		resetSearchState: (state) => {
			state.items = []
			state.pageCount = 1
			state.searchWord = ''
			state.pagesLength = null
		},
		setSearchWord: (state, action: PayloadAction<string>) => {
			state.searchWord = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(searchFilmThunk.fulfilled, (state, action) => {
				state.isLoading = false
				state.errors = undefined
				if (action.meta.arg.name !== state.searchWord) {
					state.searchWord = action.meta.arg.name
					state.pagesLength = action.payload.pages
					state.items = []
					state.items = state.items.concat(action.payload.docs)
				} else {
					state.items = [...state.items, ...action.payload.docs]
				}
				state.pageCount = action.payload.page + 1
			})
			.addCase(searchFilmThunk.rejected, (state, action) => {
				state.isLoading = false
				state.errors = action.error.message
			})
			.addCase(searchFilmThunk.pending, (state) => {
				state.isLoading = true
				state.errors = undefined
			})
	},
})

export const searchReducer = filmsSlice.reducer
export const { resetSearchState, setSearchWord } = filmsSlice.actions
export const searchWordSelector = (state: RootState) => state.search.searchWord
export const searchFilmsSelector = (state: RootState) => state.search.items
export const searchIsLoadingSelector = (state: RootState) =>
	state.search.isLoading
export const searchPageCountSelector = (state: RootState) =>
	state.search.pageCount
export const searchPagesLengthSelector = (state: RootState) =>
	state.search.pagesLength
export const searchErrorsSelector = (state: RootState) => state.search.errors

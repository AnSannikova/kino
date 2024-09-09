import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TFilm } from '@/types'
import { fetchFilms } from '@/api/filmsApi'
import { RootState } from '../store'

const node = import.meta.env.VITE_NODE_ENV

type TFilmsState = {
	items: TFilm[]
	pageCount: number
	allPages: number
	isLoading: boolean
	errors: string | undefined
}

const initialState: TFilmsState = {
	items: [],
	pageCount: 1,
	allPages: 0,
	isLoading: false,
	errors: undefined,
}

export const getFilmsThunk = createAsyncThunk(
	'films/getAllFilms',
	async (pageCount: number) => fetchFilms(pageCount)
)

const filmsSlice = createSlice({
	name: 'films',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getFilmsThunk.fulfilled, (state, action) => {
				state.isLoading = false
				state.errors = undefined
				state.items =
					state.pageCount === 1
						? node !== 'production'
							? []
							: [...state.items, ...action.payload.docs]
						: state.items.concat(action.payload.docs)
				state.pageCount = action.payload.page + 1
				state.allPages = action.payload.pages
			})
			.addCase(getFilmsThunk.rejected, (state, action) => {
				state.isLoading = false
				state.errors = action.error.message
			})
			.addCase(getFilmsThunk.pending, (state) => {
				state.isLoading = true
				state.errors = undefined
			})
	},
})

export const filmsReducer = filmsSlice.reducer
export const getFilmsSelector = (state: RootState) => state.films.items
export const filmsIsLoadingSelector = (state: RootState) =>
	state.films.isLoading
export const filmsPageCountSelector = (state: RootState) =>
	state.films.pageCount
export const filmsAllPagesSelector = (state: RootState) => state.films.allPages
export const filmsErrorsSelector = (state: RootState) => state.films.errors

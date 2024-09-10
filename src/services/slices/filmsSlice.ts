import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TFilm } from '@/types'
import { fetchFilms } from '@/api/filmsApi'
import { RootState } from '../store'

type TFilmsState = {
	items: TFilm[]
	currentPage: number
	allPages: number
	isLoading: boolean
	errors: string | undefined
}

const initialState: TFilmsState = {
	items: [],
	currentPage: 1,
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
				state.currentPage = action.payload.page
				state.allPages = action.payload.pages
				state.items = []
				state.items = [...state.items, ...action.payload.docs]
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
	state.films.currentPage
export const filmsAllPagesSelector = (state: RootState) => state.films.allPages
export const filmsErrorsSelector = (state: RootState) => state.films.errors

import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { filmsReducer } from './slices/filmsSlice'
import { searchReducer } from './slices/searchSlice'
import { filterReducer } from './slices/filterSlice'

const rootReducer = {
	films: filmsReducer,
	search: searchReducer,
	filter: filterReducer,
}

const store = configureStore({
	reducer: rootReducer,
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

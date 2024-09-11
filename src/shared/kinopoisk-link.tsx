import { TFilmType } from '@/types'
import { Link } from '@mui/material'
import { FC } from 'react'

interface IKinopoiskLink {
	type: TFilmType
	id: number
}

export const KinopoiskLink: FC<IKinopoiskLink> = ({ type, id }) => {
	const filmType = type.includes('series') ? 'series' : 'film'
	const link = `https://www.kinopoisk.ru/${filmType}/${id}`

	return (
		<Link href={link} underline='hover' rel='noreferrer' target='_blank'>
			Подробнее на Кинопоиске
		</Link>
	)
}

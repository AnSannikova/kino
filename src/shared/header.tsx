import { Box, Container } from '@mui/material'
import { FC } from 'react'
import logo from '@/assets/logo.svg'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SearchBlock } from './search-block'
import { Paths } from '@/utils/paths'
import { resetSearchParams } from '@/utils/utils'

export const Header: FC = () => {
	const mainPath = Paths.main
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()

	const onLogoClick = () => {
		resetSearchParams(searchParams, setSearchParams)
		navigate(`${mainPath}?page=1`)
	}

	return (
		<Box component={'header'} paddingBlock={'12px'} bgcolor={'#222034'}>
			<Container
				maxWidth='xl'
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Box
					component={'button'}
					onClick={onLogoClick}
					sx={{
						maxWidth: 56,
						width: '100%',
						p: 0,
						border: 'none',
						backgroundColor: 'transparent',
						cursor: 'pointer',
					}}
				>
					<Box
						component={'img'}
						src={logo}
						alt='Логотип'
						display={'block'}
						width={'100%'}
					/>
				</Box>
				<SearchBlock />
			</Container>
		</Box>
	)
}

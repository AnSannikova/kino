import { Box, Container } from '@mui/material'
import { FC } from 'react'
import logo from '@/assets/logo.svg'
import { Link } from 'react-router-dom'
import { SearchBlock } from './search-block'

export const Header: FC = () => (
	<Box component={'header'} paddingBlock={'12px'} bgcolor={'#222034'}>
		<Container
			maxWidth='xl'
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<Link to={'/'}>
				<Box maxWidth={56}>
					<Box
						component={'img'}
						src={logo}
						alt='Логотип'
						display={'block'}
						width={'100%'}
					/>
				</Box>
			</Link>
			<SearchBlock />
		</Container>
	</Box>
)

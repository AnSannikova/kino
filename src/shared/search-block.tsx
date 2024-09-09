import { Box, InputAdornment, OutlinedInput } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { FC } from 'react'

export const SearchBlock: FC = () => {
	return (
		<Box maxWidth={'450px'} width={'100%'}>
			<OutlinedInput
				placeholder='Поиск'
				startAdornment={
					<InputAdornment position='start'>
						<SearchIcon />
					</InputAdornment>
				}
				fullWidth
				sx={{
					'& .MuiInputBase-input': {
						padding: '10px 14px 10px 0',
					},
				}}
			/>
		</Box>
	)
}

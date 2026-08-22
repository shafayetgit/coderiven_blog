import { Box, Stack, Typography } from '@mui/material'
import { useNavigate, useRouteError } from 'react-router'
import CButton from '../CButton'

export default function NotFound() {
  const navigate = useNavigate()
  const error = useRouteError()
  // Function to go back
  const goBack = () => {
    navigate(-1) // Navigates back one step in the history stack
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box>
        <Typography variant="h1" textAlign="center">
          Oops!
        </Typography>
        <Typography textAlign="center">Sorry, an unexpected error has occurred.</Typography>
        <Typography variant="h6" fontWeight="bold" textAlign="center">
          {`${error.status}! ${error.statusText}`}
        </Typography>
        <Stack direction="row" justifyContent="center">
          <CButton label="Go Back" onClick={goBack} />
        </Stack>
      </Box>
    </Box>
  )
}

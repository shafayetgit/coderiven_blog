import { Box, Typography } from '@mui/material'
import { Component } from 'react'
import CButton from './CButton'
import { useNavigate } from 'react-router'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
    // Removed the useNavigate hook from the constructor
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  // Function to go back
  goBack = () => {
    const navigate = useNavigate() // Use useNavigate inside the function component
    navigate(-1) // Navigates back one step in the history stack
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render a fallback UI here
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
            <Typography>Sorry, an unexpected error has occurred.</Typography>
            <Typography variant="h6" fontWeight="bold" textAlign="center">
              {`500! Server Error!`}
            </Typography>
          </Box>
          <Stack direction="row" justifyContent="center">
            <CButton label="Go Back" onClick={this.goBack} />
          </Stack>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

import Box from '@mui/material/Box'
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress'

function BaseCircularProgress(props) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: 'primary.main',
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
        aria-label="Loading"
        {...props}
      />
    </Box>
  )
}

export default function CCircularProgress() {
  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        justifyContent: 'center',
      }}
    >
      <BaseCircularProgress />
    </Box>
  )
}

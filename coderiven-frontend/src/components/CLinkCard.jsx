import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  height: 200,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  // backgroundColor: 'rgba(255, 87, 51, 0.05)', // Transparent primary background
  backgroundColor: 'transparent', // Transparent primary background
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  boxShadow: theme.shadows[4],
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[8],
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.text.primary,
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  textAlign: 'center',
}));

const CLinkCard = ({ title, to }) => {
  return (
    <StyledCard>
      <StyledLink to={to}>
        <CardContent>
          <StyledTitle>{title}</StyledTitle>
        </CardContent>
      </StyledLink>
    </StyledCard>
  );
};

export default CLinkCard;

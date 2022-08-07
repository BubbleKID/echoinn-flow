import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import EchodaoIcon from '../assets/img/echodao-logo-lg.svg';
import EchodaoIconWithoutText from '../assets/img/echodao-icon.png';


// ----------------------------------------------------------------------

interface Props extends BoxProps {
  disabledLink?: boolean;
  withoutText?: boolean;
}

const Icon = styled('i')(({ theme }) => ({
  width: '200px',
  height: '70px',
  display: 'inline-block',
  backgroundImage: `url(${EchodaoIcon})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));

const IconWithoutText = styled('i')(({ theme }) => ({
  width: '64px',
  height: '64px',
  display: 'inline-block',
  backgroundImage: `url(${EchodaoIconWithoutText})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));

export default function Logo({ disabledLink = false, sx, withoutText }: Props) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box sx={{ width: 200, height: 70, ...sx }}>
      { withoutText ? <IconWithoutText/>
      : <Icon/>}
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

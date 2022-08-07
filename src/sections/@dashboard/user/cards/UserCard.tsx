// @mui
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack, Button, Chip } from '@mui/material';
import { alpha } from '@mui/material/styles';
// utils
import cssStyles from '../../../../utils/cssStyles';
import { fShortenNumber } from '../../../../utils/formatNumber';
// @types
import { UserData } from '../../../../@types/user';
// components
import Image from '../../../../components/Image';
import SocialsButton from '../../../../components/SocialsButton';
import SvgIconStyle from '../../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

type Props = {
  user: UserData;
  className?: string;
  status?: string;
};

export default function UserCard({ user, className, status }: Props) {
  const { name, cover, position, follower, totalPost, avatarUrl, tag } = user;
  const theme = useTheme();
  return (
    <Card sx={{ textAlign: 'center' }} className={className}>
      <Box sx={{ position: 'relative' }}>
        <Avatar
          alt={name}
          src={avatarUrl}
          sx={{
            width: 120,
            height: 120,
            zIndex: 11,
            left: 0,
            right: 0,
            top: 24,
            mx: 'auto',
            position: 'absolute',
          }}
        />        
      </Box>
      <Box sx={{ mt: 20, mb: 2, mx: 3, textAlign: "left" }}>
        <Stack direction="row" alignItems="center">
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 0.5 }}>
            Status: 
          </Typography>
          <Typography sx={{ ml: 1,display: 'inline', color: theme.palette.primary.main }}>Finished</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 0.5 }}>
            By: 
          </Typography>
          <Typography sx={{ ml: 1, color: theme.palette.primary.main }}>{name}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 0.5 }}>
            Follower:
          </Typography>
          <Typography sx={{ ml: 1, display: 'inline-block', color: theme.palette.primary.main }}>{follower}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography variant="body1" sx={{ color: 'text.secondary'}}>
            Topic: 
          </Typography>
          <Chip label={tag} sx={{ml: 1, backgroundColor: alpha(theme.palette.primary.main, 0.2) }}></Chip>
        </Stack>
        <Typography variant="body2" sx={{
            color: 'text.secondary',
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 6,
          }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.{" "}
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, {" "}
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </Typography>
        { status === 'purchased' && <Button sx={{mt: 2, fontSize: '18px', py: 4}} variant="contained" size="large" fullWidth>View the answer</Button> }
        { status === 'viewer' && <Button sx={{mt: 2, fontSize: '18px', py: 4}} variant="contained" size="large" fullWidth>Buy the answer</Button> }
        { (status === 'editor' ||  status === 'pending') && <Button sx={{mt: 2, fontSize: '18px', py: 4}} variant="contained" size="large" fullWidth>View the question</Button> }
      </Box>
    </Card>
  );
}

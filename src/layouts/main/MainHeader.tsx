import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Stack, Chip } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// hooks
import useAuth from '../../hooks/useAuth';
// components
import Logo from '../../components/Logo';
import Iconify from '../../components/Iconify';
import { IconButtonAnimate } from '../../components/animate';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
//
import AccountPopover from '../../layouts/dashboard/header/AccountPopover';
import LanguagePopover from '../../layouts/dashboard/header/LanguagePopover';
import ContactsPopover from '../../layouts/dashboard/header/ContactsPopover';
import NotificationsPopover from '../../layouts/dashboard/header/NotificationsPopover';
import QuestionModal from '../../sections/question-modal/QuestionModal';
// helper
import { shortenAddress } from '../../utils/metaMaskHelper';
// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------
type Props = {
  connect: () => void;
  account: string | null;
};

export default function MainHeader(props: Props) {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const { account, connect } = props;

  const { isAuthenticated } = useAuth();

  const theme = useTheme();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'md');

  const isHome = pathname === '/';

  const [open, setOpen] = useState(false);

  const { themeLayout } = useSettings();

  const verticalLayout = themeLayout === 'vertical';

  const openQuestionModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    console.log(isAuthenticated)
  }, [])

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo sx={{ mr: 5 }} />

          {isDesktop && (
            <MenuDesktop
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          )}

          <Button sx={{minWidth: '200px'}} variant="contained" onClick={openQuestionModal}>
            Ask a Question
            <Iconify
              icon={'akar-icons:chat-question'}
              width={30}
              height={30}
              sx={{ ml: 2 }}
            />
          </Button>

          {!isDesktop && (
            <MenuMobile
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          )}
          <Box sx={{ flexGrow: 1 }} />

          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 0.5, sm: 1.5 }}
          >
            { 
              isAuthenticated && <>
                <NotificationsPopover />
                <ContactsPopover />
                {/* 0 ETH */}
                <Chip 
                  variant="outlined"
                  avatar={<Iconify icon={'logos:metamask-icon'}/>}
                  label={shortenAddress(account)}
                  sx={{display: 'flex', px: 1, py: 2, outline: '#red'}} 
                />
                <AccountPopover /> 
              </>
            }
            {!isAuthenticated && <Button sx={{color: 'primary'}} onClick={connect}>
              <Iconify icon={'bx:wallet'} sx={{mr: 1, color: 'primary'}} width={20} height={20} />
              Connect Wallet
            </Button>}
          </Stack>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
      <QuestionModal open={open} setOpen={setOpen} />
    </AppBar>
  );
}

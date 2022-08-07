import { useState } from 'react';
import { capitalCase } from 'change-case';
// types
import { UserData } from '../../@types/user';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Box, Tabs, Tab, Modal, IconButton } from '@mui/material';
// hooks
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userCards } from '../../_mock';
// components
import Iconify from '../../components/Iconify';
import AnswerCard from './AnswerCard';
import CloseIcon from '@mui/icons-material/Close';
// sections
import { QuestionCard } from '../../sections/@dashboard/user/cards';
// ----------------------------------------------------------------------

export default function Explore() {
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const { currentTab, onChangeTab } = useTabs('trending');
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData>(_userCards[0]);
  const [token, setToken] = useState(0);

  const openDetailModel = (user: UserData) => {
    setOpen(true);
    setCurrentUser(user);
    setToken(0);
  };
  const style = {
    '&:focus-visible': {
      outline: 'none',
    },
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 960,
    bgcolor: 'background.paper',
    borderRadius: 2,
    border: 'none',
    boxShadow: 24,
    p: 2,
  };
  const EXPLORE_TABS = [
    {
      value: 'trending',
      icon: <Iconify icon={'ci:trending-up'} width={30} height={30} />,
      component: _userCards
        .slice(0, 8)
        .map((user) => (
          <QuestionCard
            openDetailModel={openDetailModel}
            key={user.id}
            user={user}
          />
        )),
    },
    {
      value: 'art',
      icon: <Iconify icon={'map:art-gallery'} width={30} height={30} />,
      component: _userCards
        .slice(8, 16)
        .map((user) => (
          <QuestionCard
            openDetailModel={openDetailModel}
            key={user.id}
            user={user}
          />
        )),
    },
    {
      value: 'game',
      icon: <Iconify icon={'carbon:game-console'} width={30} height={30} />,
      component: _userCards
        .slice(16, 24)
        .map((user) => (
          <QuestionCard
            openDetailModel={openDetailModel}
            key={user.id}
            user={user}
          />
        )),
    },
    {
      value: 'finance',
      icon: (
        <Iconify icon={'icon-park-outline:finance'} width={30} height={30} />
      ),
      component: _userCards
        .slice(24, 32)
        .map((user) => (
          <QuestionCard
            openDetailModel={openDetailModel}
            key={user.id}
            user={user}
          />
        )),
    },
    {
      value: 'literature',
      icon: <Iconify icon={'akar-icons:book'} width={30} height={30} />,
      component: _userCards
        .slice(32, 40)
        .map((user) => (
          <QuestionCard
            openDetailModel={openDetailModel}
            key={user.id}
            user={user}
          />
        )),
    },
    {
      value: 'history',
      icon: <Iconify icon={'bx:book'} width={30} height={30} />,
      component: _userCards
        .slice(40, 48)
        .map((user) => (
          <QuestionCard
            openDetailModel={openDetailModel}
            key={user.id}
            user={user}
          />
        )),
    },
  ];

  return (
    <Container
      maxWidth={themeStretch ? false : 'lg'}
      sx={{ mb: 5, minHeight: 650 }}
    >
      <Tabs
        allowScrollButtonsMobile
        scrollButtons="auto"
        value={currentTab}
        variant="fullWidth"
        onChange={onChangeTab}
        sx={{ mb: 5 }}
      >
        {EXPLORE_TABS.map((tab) => (
          <Tab
            disableRipple
            key={tab.value}
            label={capitalCase(tab.value)}
            icon={tab.icon}
            value={tab.value}
            sx={{ fontSize: 20 }}
          />
        ))}
      </Tabs>
      {EXPLORE_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return (
          isMatched && (
            <Box
              key={tab.value}
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)',
                },
              }}
            >
              {tab.component}
            </Box>
          )
        );
      })}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AnswerCard
            setOpen={setOpen}
            user={currentUser}
            status="purchased"
            token={token}
          />
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 32,
              height: 32,
              color: theme.palette.info.contrastText,
            }}
          >
            <CloseIcon sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Box>
      </Modal>
    </Container>
  );
}

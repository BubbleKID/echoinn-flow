import { capitalCase } from 'change-case';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
// _mock_
import {
  _userAbout,
  _userFeeds,
  _userFriends,
  _userGallery,
  _userFollowers,
} from '../../_mock';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import UserNFT from '../../pages/dashboard/UserNFT';
// sections
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
  ProfileQuestions,
  ProfileAnswers,
  ProfileFollowers,
  KOLConsole,
} from '../../sections/@dashboard/user/profile';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },

  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function UserProfile() {
  const { themeStretch } = useSettings();

  const { user } = useAuth();

  const { currentTab, onChangeTab } = useTabs('Profile');

  const [findFriends, setFindFriends] = useState('');

  const handleFindFriends = (value: string) => {
    setFindFriends(value);
  };

  const PROFILE_TABS = [
    {
      value: 'KOL console',
      icon: <Iconify icon={'bi:person-heart'} width={20} height={20} />,
      component:  (
        <KOLConsole
          friends={_userFriends}
          findFriends={findFriends}
          onFindFriends={handleFindFriends}
        />
      ),
    },
    {
      value: 'Profile',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Profile myProfile={_userAbout} posts={_userFeeds} />,
    },
    {
      value: 'Questions',
      icon: <Iconify icon={'eva:people-fill'} width={20} height={20} />,
      component: (
        <ProfileQuestions
          friends={_userFriends}
          findFriends={findFriends}
          onFindFriends={handleFindFriends}
        />
      ),
    },
    {
      value: 'Answers',
      icon: <Iconify icon={'eva:people-fill'} width={20} height={20} />,
      component: (
        <ProfileAnswers
          friends={_userFriends}
          findFriends={findFriends}
          onFindFriends={handleFindFriends}
        />
      ),
    },
    {
      value: 'NFTs',
      icon: <Iconify icon={'eva:people-fill'} width={20} height={20} />,
      component: <UserNFT />,
    },
    {
      value: 'Follower',
      icon: <Iconify icon={'fluent:people-32-filled'} width={20} height={20} />,
      component: (
        <ProfileFollowers
          followers={_userFollowers.filter((follower) => !follower.isFollowed)}
        />
      ),
    },
    {
      value: 'Following',
      icon: (
        <Iconify icon={'fluent:people-add-20-filled'} width={20} height={20} />
      ),
      component: (
        <ProfileFollowers
          followers={_userFollowers.filter((follower) => follower.isFollowed)}
        />
      ),
    },
  ];

  return (
    <Page title="User: Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover myProfile={_userAbout} />

          <TabsWrapperStyle>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={tab.value}
                />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}

// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material/';
// components
import Page from '../components/Page';
// sections
import { Kol } from '../sections/kol';
import { Explore } from '../sections/explore';
import HomeBanner from '../sections/banner/HomeBanner';
import MainFooter from '../layouts/main/MainFooter';
// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="Echo DAO">
      <ContentStyle>
        <Box sx={{mt: 20}}/>
        <HomeBanner/>
        <Explore/>
        <Kol/>
      </ContentStyle>
      <MainFooter />
    </Page>
  );
}

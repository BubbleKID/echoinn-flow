import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {
  Grid,
  Link,
  Divider,
  Container,
  Typography,
  Stack,
  TextField,
  Button,
} from '@mui/material';
// routes
import { PATH_PAGE } from '../../routes/paths';
// components
import Logo from '../../components/Logo';
import SocialsButton from '../../components/SocialsButton';
// types
import { EmailProps } from './type';
import { bgcolor } from '@mui/system';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Our Product',
    children: [
      { name: 'Support', href: '#' },
      { name: 'Guide', href: '#' },
      { name: 'Chat', href: '#' },
      { name: 'Talk', href: '#' },
      { name: 'Explore', href: '#' },
      { name: 'Connect', href: '#' },
      { name: 'Sell', href: '#' },
    ],
  },
  {
    headline: 'Top Features',
    children: [
      { name: 'Information System', href: '#' },
      { name: 'Knowledge Base', href: '#' },
      { name: 'Community Forums', href: '#' },
      { name: 'Help Desk', href: '#' },
      { name: 'Tech Specs', href: '#' },
    ],
  },
  {
    headline: 'Product Support',
    children: [
      { name: 'Request Demo', href: '#' },
      { name: 'Library', href: '#' },
      { name: 'Training', href: '#' },
      { name: 'Services & Partners', href: '#' },
      { name: 'Related Site', href: '#' },
      { name: 'Customer Stories', href: '#' },
    ],
  },
  {
    headline: 'About Us',
    children: [
      { name: 'Press', href: '#' },
      { name: 'Investors', href: '#' },
      { name: 'Events', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact Us', href: '#' },
    ],
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  // states
  const [emailObj, setEmailObj] = useState<EmailProps>({
    email: '',
  });

  // handlers
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailObj({ ...emailObj, email: event.target.value });
  };

  const handleSubmitEmail = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    // TODO: fetch server's API
    console.log(emailObj);
  };

  return (
    <RootStyle>
      <Divider />
      <Container sx={{ pt: 3 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={12} sx={{ mt: 3, mb: { xs: 5, md: 3 } }}>
            <SocialsButton sx={{ mx: 0.5 }} />
          </Grid>
          {/* <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} /> */}

          <Grid item xs={12}>
            <Stack
              spacing={5}
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              sx={{ mt: 3 }}
            >
              {LINKS.map((list) => (
                <Stack key={list.headline} spacing={2}>
                  <Typography component="p" variant="overline" fontSize={16}>
                    {list.headline}
                  </Typography>
                  {list.children.map((link) => (
                    <Link
                      to={link.href}
                      key={link.name}
                      color="inherit"
                      variant="body2"
                      component={RouterLink}
                      sx={{ display: 'block' }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              ))}
              <Stack>
                <Typography component="p" variant="overline" fontSize={16}>
                  Be the first to know
                </Typography>
                <TextField
                  label="Email Address"
                  variant="standard"
                  onChange={handleChange}
                  value={emailObj.email}
                  sx={{ mt: 2 }}
                />
                <Button
                  variant="contained"
                  sx={{ mt: 5 }}
                  onClick={(e) => {
                    handleSubmitEmail(e);
                  }}
                >
                  Get Started
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

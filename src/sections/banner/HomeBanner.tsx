import { m } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, MenuItem, Container, Typography, FormControl, InputAdornment, TextField, Button } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { tag } from '../../_mock/text'
// components
import { MotionViewport, varFade } from '../../components/animate';
import Iconify from '../../components/Iconify';
import { useNavigate } from 'react-router-dom';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import wave from '../../assets/wave.json';

// ----------------------------------------------------------------------

const BannerAnimation = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if(lottieRef.current) // add this
      lottieRef.current.setSpeed(0.4);
  }, [lottieRef]);

  return <Lottie lottieRef={lottieRef} animationData={wave} autoplay loop/>;
};

export default function HomeBanner() {
  const theme = useTheme();
  const navigate = useNavigate();

  const settings = {
    arrows: false,
    slidesToShow: 4,
    centerMode: true,
    centerPadding: '0px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };
  const [type, setType] = useState('0');
  const [filterName, setFilterName] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
  };

  return (
    <Container component={MotionViewport} sx={{ mb: 5, textAlign: 'center' }}>

      <m.div variants={varFade().inUp}>
        <Typography variant="h1">
          Knowledge as NFT
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Stack direction="row" sx={{ flexWrap: 'wrap-reverse', width: '100%' }}>
          <Grid item md={12} lg={6}>
            <Stack sx={{ py: 5, height: '100%', display: 'flex', alignItems: 'center', mx: 'auto', my: 2 }}>
              <Typography
                sx={{
                  mb: 2,
                  mx: 'auto',
                  maxWidth: 550,
                  textAlign: 'left',
                  color: theme.palette.primary.main,
                  fontSize: '32px',
                  fontWeight: '100'
                }}
              >
              Echo DAO is a platform for knowledge sharing and content consumption in Web 3.0. We pioneered the{' '}
              concept of Knowledge as NFT, allowing it to protect the ownership of high-quality Q&A in the form{' '}
              of NFT and enabling those content producers who have made witty repartee to gain continuous revenue.
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={12} lg={6}>
            <BannerAnimation/>
          </Grid>
        </Stack>
        <Stack direction="row" sx={{ display: 'flex', alignItems: 'center', mx: 'auto', width: '100%', justifyContent: 'center' }}>
          <FormControl sx={{ m: 2, width: 220 }}>
            <Select
              value={type}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              onChange={handleChange}
            >
              <MenuItem value={0}><em>Select Type</em> </MenuItem>
              {
                tag.map((_item, index) => <MenuItem key={index} value={index + 1}>{_item}</MenuItem>)
              }
            </Select>
          </FormControl>
          <FormControl sx={{ m: 2, width: 450,  display: "flex", flexDirection: "row" }}>
            <TextField
              fullWidth
              value={filterName}
              onChange={(event) => handleFilterName(event.target.value)}
              placeholder="Please search for what interests you..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify
                      icon={'eva:search-fill'}
                      sx={{ color: 'text.disabled', width: 20, height: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl sx={{ m: 2}}>
            <Button variant="contained" sx={{ height: 56, width: 220 }} onClick={() => { navigate('/explore', { replace: true }) }}>
              explore more
            </Button>
          </FormControl>
        </Stack>
      </m.div>
    </Container>
  );
}

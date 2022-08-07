import { m } from 'framer-motion';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Stack,
  Card,
  Button,
  Container,
  Typography,
  Link,
} from '@mui/material';
// _mock_
import { _carouselsMembers } from '../../_mock';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { CarouselArrows } from '../../components/carousel';
import { MotionViewport, varFade } from '../../components/animate';
import QuestionModal from '../../sections/question-modal/QuestionModal';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function Kol() {
  const carouselRef = useRef<Slider>(null);

  const theme = useTheme();

  const [open, setOpen] = useState(false);

  let navigate = useNavigate();

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

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  const openQuestionModal = () => {
    setOpen(true);
    console.log('Open question modal');
  };

  return (
    <Container component={MotionViewport} sx={{ pb: 10, textAlign: 'center' }}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Find a KOL you'd like to ask
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mx: 'auto',
            maxWidth: 630,
            letterSpacing: 0.5,
            variant: 'body1',
            color: (theme) =>
              theme.palette.mode === 'light'
                ? 'text.secondary'
                : 'common.white',
          }}
        >
          Check out all the KOLs available straddling multiple fields, and find
          the very one you like, then you can own the NFT after they answer it,
          gooo~ ahead.
        </Typography>
      </m.div>

      <Box sx={{ position: 'relative' }}>
        <CarouselArrows filled onNext={handleNext} onPrevious={handlePrevious}>
          <Slider ref={carouselRef} {...settings}>
            {_carouselsMembers.map((member: any) => (
              <Box
                key={member.id}
                component={m.div}
                variants={varFade().in}
                sx={{ px: 1.5, py: 10 }}
              >
                <MemberCard
                  member={member}
                  openQuestionModal={openQuestionModal}
                />
              </Box>
            ))}
          </Slider>
        </CarouselArrows>
        <QuestionModal open={open} setOpen={setOpen} />
      </Box>
      <Button
        variant="outlined"
        color="inherit"
        size="large"
        endIcon={
          <Iconify icon={'ic:round-arrow-right-alt'} width={24} height={24} />
        }
        sx={{ mx: 'auto' }}
        onClick={() => navigate('/kol', { replace: true })}
      >
        View all KOLs
      </Button>
    </Container>
  );
}

// ----------------------------------------------------------------------

type MemberCardProps = {
  member: {
    id: string;
    name: string;
    role: string | undefined;
    avatar: string;
    kolPrice: number;
    kolAnswers: number;
    kolIntro: string;
  };
  openQuestionModal: () => void;
};

function MemberCard({ member, openQuestionModal }: MemberCardProps) {
  const { name, role, avatar, kolPrice, kolAnswers, kolIntro } = member;
  const theme = useTheme();

  return (
    <Card key={name} sx={{ p: 1, overflow: 'visible', marginTop: 20 }}>
      <Image
        alt={name}
        src={avatar}
        ratio="1/1"
        sx={{ borderRadius: '50%', marginTop: -20 }}
      />
      <Stack alignItems="center" sx={{ px: 2, mt: 2, mb: 1 }} direction="row">
        <Typography
          variant="subtitle1"
          align="left"
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
          }}
        >
          {name}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{ minWidth: 45, ml: 2 }}
          onClick={openQuestionModal}
        >
          Ask me
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center" sx={{ px: 2 }}>
        <Typography
          variant="body1"
          align="left"
          sx={{ color: 'text.secondary' }}
        >
          Price (per Q):
        </Typography>
        <Typography
          sx={{ ml: 1, display: 'inline', color: theme.palette.primary.main }}
        >
          {kolPrice} eth
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" sx={{ px: 2 }}>
        <Typography
          variant="body1"
          align="left"
          sx={{ mb: 0.5, color: 'text.secondary' }}
        >
          Answers:
        </Typography>
        <Typography
          sx={{
            ml: 1,
            display: 'inline-block',
            color: theme.palette.primary.main,
          }}
        >
          {kolAnswers}
        </Typography>
      </Stack>
      <Typography
        variant="body1"
        align="left"
        sx={{
          px: 2,
          mb: 0.5,
          color: 'text.secondary',
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
        }}
      >
        {kolIntro}
      </Typography>
    </Card>
  );
}

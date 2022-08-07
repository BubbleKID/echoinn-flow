import { useState } from 'react';
// @mui
import {
  Box,
  List,
  Button,
  Rating,
  Avatar,
  ListItem,
  Pagination,
  Typography,
  Divider,
} from '@mui/material';
// utils
import { fDate } from '../../utils/formatTime';
import { fShortenNumber } from '../../utils/formatNumber';
// @types
import { ProductReview } from '../../@types/product';
// components
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

type Props = {
  reviews: ProductReview[];
};

export default function UserCommentList(props: Props) {
  // props
  const { reviews } = props;

  // states
  const [currentPage, setCurrentPage] = useState(1);

  // methods
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ pt: 3, px: 2, pb: 5 }}>
      <List disablePadding>
        {reviews.slice((currentPage - 1) * 3, currentPage * 3).map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <Pagination
          count={Math.floor(reviews.length / 3) + 1}
          color="primary"
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

type ReviewItemProps = {
  review: ProductReview;
};

function ReviewItem({ review }: ReviewItemProps) {
  const { name, rating, comment, postedAt, avatarUrl, isPurchased } = review;

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          my: 1,
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box
          sx={{
            mr: 6,
            display: 'flex',
            alignItems: 'center',
            mb: { xs: 2, sm: 0 },
            minWidth: { xs: 160, md: 240 },
            textAlign: { sm: 'center' },
            flexDirection: { sm: 'column' },
          }}
        >
          <Avatar
            src={avatarUrl}
            sx={{
              mr: { xs: 2, sm: 0 },
              mb: { sm: 2 },
              width: { md: 64 },
              height: { md: 64 },
            }}
          />
          <div>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary' }}
              noWrap
            >
              {fDate(postedAt)}
            </Typography>
          </div>
        </Box>

        <div>
          {isPurchased && (
            <Rating size="small" value={rating} precision={0.1} readOnly />
          )}

          {isPurchased && (
            <Typography
              variant="caption"
              sx={{
                my: 1.5,
                display: 'flex',
                alignItems: 'center',
                color: 'primary.main',
              }}
            >
              <Iconify icon={'ic:round-verified'} width={16} height={16} />
              &nbsp;Puchased Listener
            </Typography>
          )}

          <Typography variant="body2" sx={{ fontSize: 16 }}>
            {comment}
          </Typography>
        </div>
      </ListItem>
      <Divider />
    </>
  );
}

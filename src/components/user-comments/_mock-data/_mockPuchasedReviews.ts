import { ProductReview } from '../../../@types/product';

type Props = {
  reviews: ProductReview[];
};

// mock reviews
export const _mockPurchasedReviews: Props = {
  reviews: [
    {
      id: '1',
      name: 'Jack Dawson',
      avatarUrl:
        'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_1.jpg',
      comment: `it's really awesome!!!`,
      rating: 5,
      isPurchased: true,
      helpful: 0,
      postedAt: new Date(),
    },
    {
      id: '2',
      name: 'Joanna Dyson',
      avatarUrl:
        'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_2.jpg',
      comment: `Just far-fetched......`,
      rating: 3,
      isPurchased: true,
      helpful: 0,
      postedAt: new Date(),
    },
    {
      id: '3',
      name: 'Rosie Pinky',
      avatarUrl:
        'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_3.jpg',
      comment: `Not really good, bro.....`,
      rating: 2,
      isPurchased: true,
      helpful: 0,
      postedAt: new Date(),
    },
    {
      id: '4',
      name: 'Omini C. Brown',
      avatarUrl:
        'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_4.jpg',
      comment: `For some points of his view, I do think those make sense. But the point xxx is way too like a charade....`,
      rating: 3.5,
      isPurchased: true,
      helpful: 0,
      postedAt: new Date(),
    },
  ],
};

export const _mockNotPurchasedReviews: Props = {
  reviews: [
    {
      id: '1',
      name: 'John',
      avatarUrl:
        'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_5.jpg',
      comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      rating: 0,
      isPurchased: false,
      helpful: 0,
      postedAt: new Date(),
    },
  ],
};

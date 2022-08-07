import { ReactElement } from 'react';
import { SxProps } from '@mui/material';

// ----------------------------------------------------------------------

export type MenuItemProps = {
  title: string;
  path: string;
  icon?: ReactElement;
  to?: string;
  children?: {
    subheader: string;
    items: {
      title: string;
      path: string;
    }[];
  }[];
};

export type MenuProps = {
  isOffset: boolean;
  isHome: boolean;
  navConfig: MenuItemProps[];
  sx?: SxProps;
};

export type EmailProps = {
  email: string;
};

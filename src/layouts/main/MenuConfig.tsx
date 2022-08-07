// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE } from '../../routes/paths';
// components
import { PATH_AFTER_LOGIN } from '../../config';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Home',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'Explore',
    path: '/explore',
    icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
  },
  {
    title: 'Plaza',
    path: '/plaza',
    icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
  },
  {
    title: 'KOL',
    path: '/kol',
    icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
  },
];

export default menuConfig;

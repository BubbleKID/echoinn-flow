import React, { memo, useEffect } from 'react';
import { Box, Paper, PaperProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PropaneRounded, Translate } from '@mui/icons-material';

interface Props extends PaperProps {
  iconUrl: string;
  iconName: string;
  iconClickedProp: boolean;
}

// 'props' type is to be defined
const CategoryLogo: React.FC<Props> = memo((props) => {
  const { iconClickedProp } = props;
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.2s',
    transitionTimingFunction: 'ease-in',
    borderRadius: 3,
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    '&:hover': {
      backgroundColor: '#2c3e50',
      transform: 'scale(1.1)',
    },
  }));

  const Icon = styled('i')(({ theme }) => ({
    width: '40px',
    height: '40px',
    display: 'inline-block',
    boxSizing: 'border-box',
    backgroundImage: `url(${props.iconUrl})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    marginBottom: '7px',
  }));

  const overrideSxProps =
    iconClickedProp === true
      ? {
          bgcolor: '#2c3e50',
          transform: 'scale(1.1)',
          border: '1px dotted #FFEF5A',
        }
      : {};

  return (
    <Item elevation={2} sx={overrideSxProps}>
      <Icon />
      {props.iconName}
    </Item>
  );
});

export default CategoryLogo;

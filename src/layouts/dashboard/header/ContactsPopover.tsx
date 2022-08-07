import { useState } from 'react';
import * as React from 'react';
// @mui
import { red } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Avatar, Typography, ListItemText, ListItemAvatar, IconButton, ListItem, List } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// _mock_
import { _contacts } from '../../../_mock';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

// ----------------------------------------------------------------------

export default function ContactsPopover() {
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const [dense, setDense] = React.useState(false);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <Iconify icon={'eva:people-fill'} width={20} height={20} />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 320,
          '& .MuiMenuItem-root': {
            px: 1.5,
            height: ITEM_HEIGHT,
            borderRadius: 0.75,
          },
        }}
      >
        <Typography variant="h6" sx={{ p: 1.5 }}>
          <Typography component="span">({_contacts.length})</Typography>
        </Typography>

        <Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}>
          {_contacts.map((contact) => (
            <List dense={dense} key={contact.id}>
              <ListItem
                key={contact.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="newAnswer">
                    {contact.notification !== 0 ? <CampaignIcon sx={{ color: red[500] }} /> : ''}
                  </IconButton>
                }
              >
                <ListItemAvatar sx={{ position: 'relative' }}>
                  <Avatar src={contact.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primaryTypographyProps={{ typography: 'subtitle2', mb: 0.25 }}
                  secondaryTypographyProps={{ typography: 'caption' }}
                  primary={contact.name}
                  secondary={contact.status === 'offline' && fToNow(contact.lastActivity)}
                />
              </ListItem>
            </List>
          ))}
        </Scrollbar>
      </MenuPopover>
    </>
  );
}

import React from "react";
import "./QuestionCard.scss";
// @types
import { UserData } from '../../../../@types/user';
// components
import { useMetaMask } from "metamask-react";
import UserCard from "./UserCard";
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack, Button, Chip } from '@mui/material';
import { alpha } from '@mui/material/styles';

type Props = {
  questionData: any;
  openDetailModel: (question: any) => void;
  status?: string;
  isKOLConsole?: boolean;
};

const NewQuestionCard = (props: Props) => {
  const theme = useTheme();
  const { questionData, openDetailModel, isKOLConsole } = props;
  const { answerer, brief, ownerAddress, status: questionStatus, topic } = questionData;
  const {account} = useMetaMask();

  const fakeUserData = {
    name: "Charles V",
    avatarUrl: "https://www.onthisday.com/images/people/charles-v-medium.jpg",
    follower: 100,
  };

  const fakeQuestionData = {
    topic: "Technology",
  }

  return (
    <div className="question-card" onClick={() => openDetailModel(questionData)}>
      {/* <UserCard className="question-card__front" key={user.id} user={user} status={props?.status} /> */}
      <Card sx={{ textAlign: 'center' }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            alt={fakeUserData.name}
            src={fakeUserData.avatarUrl}
            sx={{
              width: 120,
              height: 120,
              zIndex: 11,
              left: 0,
              right: 0,
              top: 24,
              mx: 'auto',
              position: 'absolute',
            }}
          />        
        </Box>
        <Box sx={{ mt: 20, mb: 2, mx: 3, textAlign: "left" }}>
          <Stack direction="row" alignItems="center">
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 0.5 }}>
              Status: 
            </Typography>
            <Typography sx={{ ml: 1,display: 'inline', color: theme.palette.primary.main }}>{questionStatus}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 0.5 }}>
              By: 
            </Typography>
            <Typography sx={{ ml: 1, color: theme.palette.primary.main }}>{fakeUserData.name}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 0.5 }}>
              Follower:
            </Typography>
            <Typography sx={{ ml: 1, display: 'inline-block', color: theme.palette.primary.main }}>{fakeUserData.follower}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography variant="body1" sx={{ color: 'text.secondary'}}>
              Topic: 
            </Typography>
            <Chip label={topic} sx={{ml: 1, backgroundColor: alpha(theme.palette.primary.main, 0.2) }}></Chip>
          </Stack>
          <Typography variant="body2" sx={{
              color: 'text.secondary',
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 6,
              height: '80px',
            }}>
            {brief}
          </Typography>
          { questionStatus ==="FINISHED" && <Button sx={{mt: 2, fontSize: '18px', py: 4}} variant="outlined" size="large" fullWidth>Review it</Button>}
          { (questionStatus === "UNFINISHED" && !isKOLConsole) && <Button sx={{mt: 2, fontSize: '18px', py: 4}} color="warning" variant="contained" size="large" fullWidth>Redeem question</Button>}
          { (questionStatus === "UNFINISHED" && isKOLConsole) && <Button sx={{mt: 2, fontSize: '18px', py: 4}} variant="contained" size="large" fullWidth>Answer question</Button>}
          { status === 'purchased' && <Button sx={{mt: 2, fontSize: '18px', py: 4}} variant="contained" size="large" fullWidth>View the answer</Button> }
          { status === 'viewer' && <Button sx={{mt: 2, fontSize: '18px', py: 4}} variant="contained" size="large" fullWidth>Buy the answer</Button> }
          { (status === 'editor' ||  status === 'pending') && <Button sx={{mt: 2, fontSize: '18px', py: 4}} variant="contained" size="large" fullWidth>View the question</Button> }
        </Box>
      </Card>
    </div>
  )
};

export default NewQuestionCard;

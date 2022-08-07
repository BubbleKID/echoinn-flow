import {useState} from 'react';
// @mui
import {
  Box,
  Grid,
  Card,
  Link,
  Modal,
  Avatar,
  IconButton,
  Typography,
  InputAdornment,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
// @types
import { Friend, UserData } from '../../../../@types/user';
// _mock_
import { _userCards } from '../../../../_mock';
// components
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import SocialsButton from '../../../../components/SocialsButton';
import SearchNotFound from '../../../../components/SearchNotFound';
import { QuestionCard, NewQuestionCard } from '../cards';
import ProfileAnswerCard from './ProfileAnswerCard';
import NewAnswerCard from '.././../../../sections/explore/NewAnswerCard';
import { useMetaMask } from "metamask-react";
// querys
import { gql, useQuery } from '@apollo/client';
// ----------------------------------------------------------------------

type Props = {
  friends: Friend[];
  findFriends: string;
  onFindFriends: (value: string) => void;
};

type Question = {
  status: string;
  kolAddress: string;
  brief: string;
  ownerAddress: string;
};

export default function ProfileAnswers({ friends, findFriends, onFindFriends }: Props) {
  const theme = useTheme();
  const friendFiltered = applyFilter(friends, findFriends);
  const isNotFound = friendFiltered.length === 0;
  const [open, setOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [isLoading, setIsloading] = useState(false);
  const [token, setToken] = useState(0);
  const GET_QUESTIONS = gql`
    query GetAllQuestion {
      getAllQuestions {
        id
        claim
        ownerAddress
        kolAddress
        brief
        topic
        createdAt
        status
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_QUESTIONS);
  const {account} = useMetaMask();

  const openDetailModel = (question: Question) => {
    setOpen(true);
    setCurrentQuestion(question);
  };

  const style = {
    '&:focus-visible': {
      outline: 'none',
    },
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 960,
    bgcolor: 'background.paper',
    borderRadius: 2,
    border: 'none',
    boxShadow: 24,
    p: 2,
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Purchased anwsers
      </Typography>

      <InputStyle
        stretchStart={240}
        value={findFriends}
        onChange={(event) => onFindFriends(event.target.value)}
        placeholder="Find questions..."
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
        sx={{ mb: 5 }}
      />

      {!loading &&<Grid container spacing={3}>
        {
          data && data.getAllQuestions.map((question: any) => (question.status === "FINISHED") && (
            <Grid key={question.id} item xs={12} md={3}>
              <NewQuestionCard openDetailModel={() => openDetailModel(question)} questionData={question} status="editor"/>
            </Grid>
          ))
        }
      </Grid>}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {currentQuestion && currentQuestion.status === "FINISHED" && (<NewAnswerCard isUserQuestionPage setOpen={setOpen} question={currentQuestion} status="FINISHED" token={token}/>)}
          <IconButton color="primary" 
            aria-label="add to shopping cart" 
            onClick={()=>setOpen(false)}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 32,
              height: 32,
              color: theme.palette.info.contrastText
            }}
          >
            <CloseIcon sx={{width: 32, height: 32}}/>
          </IconButton>
        </Box>
      </Modal>
      {isNotFound && (
        <Box sx={{ mt: 5 }}>
          <SearchNotFound searchQuery={findFriends} />
        </Box>
      )}
    </Box>
  );
}

 
// ----------------------------------------------------------------------

function applyFilter(array: Friend[], query: string) {
  if (query) {
    return array.filter((friend) => friend.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  return array;
}

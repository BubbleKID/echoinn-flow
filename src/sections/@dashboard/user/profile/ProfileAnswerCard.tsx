/* eslint-disable import/extensions */
import React, {useState, useEffect} from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Stack, LinearProgress } from '@mui/material';
import 'react-h5-audio-player/lib/styles.css';
import './ProfileAnswerCard.scss';
// utils
import cssStyles from '../../../../utils/cssStyles';
// @types
import { UserData } from '../../../../@types/user';
// components
import { Recorder } from "react-voice-recorder";
import { useUploadAudioMutation } from '../../../../graphql/generated';
import AudioPlayer from 'react-h5-audio-player';

// ----------------------------------------------------------------------

type Props = {
  user: UserData;
  className? : string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status?: string
};

export default function ProfileAnswerCard({ user, className, setOpen, status }: Props) {
  const srcSet = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  const theme = useTheme();
  const [audioDetails, setAudioDetails] = useState({
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0
      }
    });
  const [ executeMutation, { data, loading } ] = useUploadAudioMutation();
  const [isUploading, setIsUpLoading] = useState(false);

  const handleAudioUpload = async(file: File) => {
    // Todo: get claim from the chain
    // const { claim  } = await provider.xxxxx();
    const claim = "fake claim";

    setIsUpLoading(true)
    await executeMutation({
      variables: {
        uploadAudioClaim2: claim,
        uploadAudioFile2: file,
      }
    });
    setIsUpLoading(false)
  };

  const handleAudioStop = (data: any) => {
    console.log(data);
    setAudioDetails(data);
  };

  const handleReset = () => {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0
      }
    };
    setAudioDetails(reset);
  };

  return (
    <Box sx={{ mt: 2, mb: 2, mx: 3, textAlign: "left" }}>
      <Typography variant="h4" sx={{ color: 'text.primary', mb: 0.5  }}>
        Why would a CEO get paid 100 times more than the average employee? Are they worth it?
      </Typography>
      <Stack direction="row" alignItems="center" spacing={4}>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Answerer: 
          <Typography variant="body1" sx={{ ml: 1, display: 'inline-block', color: theme.palette.primary.main }}>
            {user.name}
          </Typography>
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Price: 
          <Typography variant="body1" sx={{ ml: 1, display: 'inline-block', color: theme.palette.primary.main }}>
            0.01ETH
          </Typography>
        </Typography>   
      </Stack>
      <Typography variant="body2" sx={{
        mt: 2,
        color: 'text.secondary',
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 4
      }}>
        No, but a CEO can easily add 1,000 times to the value of the company with {" "}
        a decision made in 20 seconds than a typical employee might add in a year.{" "}
      </Typography>
      <Box sx={{ mt: 4, mx: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <AudioPlayer
          className="audio-player"
          autoPlay={false}
          src={srcSet}
          onPlay={(_e) => console.log('onPlay')}
        />        
      </Box>
      {isUploading && <Box sx={{ width: '100%' }}>
        <LinearProgress color="primary"/>
      </Box>}
    </Box>
  );
}

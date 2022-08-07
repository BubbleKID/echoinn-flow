/* eslint-disable import/extensions */
import React, {useState, useEffect} from 'react';
import { capitalCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Alert, Typography, Stack, LinearProgress, CircularProgress } from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './ProfileAnswerCard.scss';
// utils
import cssStyles from '../../../../utils/cssStyles';
// @types
import { UserData } from '../../../../@types/user';
// components
import { ethers } from 'ethers';
import { Recorder } from "react-voice-recorder";
import { useUploadAudioMutation } from '../../../../graphql/generated';
import contractJson from "../../../../assets/contracts/EchoInn.json";
import contractAddress  from "../../../../assets/contracts/echoinnContractInfo.json"
import { useMetaMask } from "metamask-react";
// mock
import { findQuestionUserName } from '../../../../_mock/frontEndMockData';

// ----------------------------------------------------------------------

type Question = {
  status: string;
  kolAddress: string;
  brief: string;
  ownerAddress: string;
};

type Props = {
  question: Question;
  className? : string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status?: string;
  token: number;
};

type MessageProps = {
  type: 'redeem' | 'answer' | 'listen';
  status: string;
  message: string;
}

const MessageBox = (props: MessageProps) => {
  const {type, status, message} = props;

  return (
    <>
      {status === 'success' && <Alert severity={status}>{`${capitalCase(type)} successfully!`}</Alert>}
      {status === 'error' && <Alert severity={status}>{`We have a little problem: ${message}.`}</Alert>}
    </>
  )
}

export default function NewProfileAnswerCard({ question, className, setOpen, status, token }: Props) {
  const srcSet = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  const theme = useTheme();
  const {status:statusMetaMask, connect, account, chainId, ethereum, addChain } = useMetaMask();
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
  const [executeMutation, { data, loading }] = useUploadAudioMutation();
  const [isUploading, setIsUpLoading] = useState(false);
  const [isFetchPriceLoading, setIsFetchPriceLoading] = useState(true);
  const echoInnAddress = contractAddress.contractAddress;
  const [chainRequeststatus, setChainRequeststatus] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // set fake loading time for the price
    setTimeout(() => setIsFetchPriceLoading(false), 1000);
  }, []);

  // handle the purcahse of qeustion
  const handleAnswerQuestion = async () => {
    // Question creater address in assets/contracts/echoinnContractInfo.json
    // 0x86079A67Dd8E1bBe4347Dfcf9fEBf3B572E3B56F

    // setIsLoading(true);
    // setRequestType('answer');
    // TODO: replace the mock data
    let [tokenId] = [48];

    if (statusMetaMask != "connected") {
      console.log("Metamask not connected");
      return;
    }
    if (chainId != '0x507') {
      console.log(`your chain id is ${chainId}
        please change network to Moonbase Alpha
        rpc:https://rpc.api.moonbase.moonbeam.network
        chainId:0x507
        Symbal:DEV
        blockScan:https://moonbase.moonscan.io/
      `);
      return;
    }
    const provider = new ethers.providers.Web3Provider(ethereum)

    // The Contract object
    const echoinn = new ethers.Contract(echoInnAddress, contractJson.abi, provider);
    try {
      // contract question mint.
      const tx = await echoinn.connect(provider.getSigner()).answer(tokenId);
      await tx.wait().then((receipt: any) => {
        console.log('receipt', receipt);
        if (receipt && receipt.status === 1) {
          setChainRequeststatus('success'); 
        } else {
          setChainRequeststatus('failed');
          setMessage(receipt.message);
        }
        setIsUpLoading(false);
      });
    } catch (error: any) {
      console.log(error);
      setChainRequeststatus('failed');
      setMessage(error.data.message);
      setIsUpLoading(false);
    }
  }

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
    await handleAnswerQuestion();
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
        {question.brief}
      </Typography>
      <Stack>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Answerer: 
        </Typography>
        <Typography
          variant="body1"
          sx={{
            display: 'inline-block',
            color: theme.palette.primary.main,
          }}
        >
          {findQuestionUserName(question.kolAddress)}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Answer Price:
        </Typography>
        {isFetchPriceLoading ? <CircularProgress /> : <Typography
          variant="body1"
          sx={{
            display: 'inline-block',
            color: theme.palette.primary.main,
          }}
        >
          0.01ETH
        </Typography>}
      </Stack>
      <Box sx={{ mt: 4, mx: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Recorder
          record={true}
          title={"New recording"}
          style={{width: '500px'}}
          audioURL={audioDetails.url}
          showUIAudio
          handleAudioStop={(data: File) => handleAudioStop(data)}
          handleAudioUpload={(data: any) => handleAudioUpload(data)}
          handleReset={handleReset}
          uploadButtonDisabled ={isUploading}
        />
      </Box>
      {isUploading && <Box sx={{ width: '100%' }}><LinearProgress color="primary"/></Box>}
      {chainRequeststatus && <MessageBox type={"answer"} status={chainRequeststatus} message={message} />}
    </Box>
  );
}

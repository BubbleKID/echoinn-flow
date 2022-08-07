/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { capitalCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Alert,
  Typography,
  Stack,
  Button,
  LinearProgress,
} from '@mui/material';
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './AnswerCard.scss';
// @types
import { UserData } from '../../@types/user';
// components
import { useMetaMask } from 'metamask-react';
import { ethers } from 'ethers';
import contractJson from '../../assets/contracts/EchoInn.json';
import contractAddress from '../../assets/contracts/echoinnContractInfo.json';
import UserCommentList from '../../components/user-comments/';

// mock data
import {
  _mockPurchasedReviews,
  _mockNotPurchasedReviews,
} from '../../components/user-comments/_mock-data';

// ----------------------------------------------------------------------

type Props = {
  user: UserData;
  className?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status?: string;
  token: number;
};

type MessageProps = {
  type: 'redeem' | 'answer' | 'listen';
  status: string;
  message: string;
};

const MessageBox = (props: MessageProps) => {
  const { type, status, message } = props;

  return (
    <>
      {status === 'success' && (
        <Alert severity={status}>{`${capitalCase(type)} successfully!`}</Alert>
      )}
      {status === 'error' && (
        <Alert
          severity={status}
        >{`We have a little problem: ${message}.`}</Alert>
      )}
    </>
  );
};

export default function AnswerCard({
  user,
  className,
  setOpen,
  status,
  token,
}: Props) {
  const srcSet =
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  const theme = useTheme();
  const echoInnAddress = contractAddress.contractAddress;
  const {
    status: statusMetaMask,
    connect,
    account,
    chainId,
    ethereum,
    addChain,
  } = useMetaMask();
  const [chainRequeststatus, setChainRequeststatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [requestType, setRequestType] = useState<
    'redeem' | 'answer' | 'listen'
  >('answer');

  const questionMint = async () => {
    let [kolAddress, award, question] = [
      '0x334885A9719A21Aa7BA62E7ba7F5a59D52eD58cE',
      ethers.utils.parseEther('0.001'),
      'abcdefg',
    ];

    if (statusMetaMask != 'connected') {
      console.log('Metamask not connected');
      return;
    }
    if (chainId != '1287') {
      alert(`your chain id is ${chainId} 
      please change network to Moonbase Alpha
      rpc:https://rpc.api.moonbase.moonbeam.network
      chainId:1287
      Symbal:DEV
      blockScan:https://moonbase.moonscan.io/
      `);
      return;
    }
    const provider = new ethers.providers.Web3Provider(ethereum);

    // The Contract object
    const echoinn = new ethers.Contract(
      echoInnAddress,
      contractJson.abi,
      provider
    );
    // contract question mint.
    const tx = await echoinn
      .connect(provider.getSigner())
      .questionMint(account, kolAddress, question, { value: award });
    await tx.wait();
  };
  const [isPurchased, setIsPurchased] = useState(false);

  // handle the purcahse of qeustion
  const handleAnswerQuestion = async () => {
    // Question creater address in assets/contracts/echoinnContractInfo.json
    // 0x86079A67Dd8E1bBe4347Dfcf9fEBf3B572E3B56F

    setIsLoading(true);
    setRequestType('answer');
    // TODO: replace the mock data
    let [tokenId] = [18];

    if (statusMetaMask != 'connected') {
      console.log('Metamask not connected');
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
    const provider = new ethers.providers.Web3Provider(ethereum);

    // The Contract object
    const echoinn = new ethers.Contract(
      echoInnAddress,
      contractJson.abi,
      provider
    );
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
        setIsLoading(false);
      });
    } catch (error: any) {
      console.log(error);
      setChainRequeststatus('failed');
      setMessage(error.data.message);
      setIsLoading(false);
    }
  };

  // handle the redeem the question
  const handleRedeemQuestion = async () => {
    setIsLoading(true);
    setRequestType('redeem');
    // TODO: replace the mock data
    let [tokenId] = [17];

    if (statusMetaMask != 'connected') {
      console.log('Metamask not connected');
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
    const provider = new ethers.providers.Web3Provider(ethereum);

    // The Contract object
    const echoinn = new ethers.Contract(
      echoInnAddress,
      contractJson.abi,
      provider
    );
    // contract question mint.

    try {
      const tx = await echoinn.connect(provider.getSigner()).refund(tokenId);
      await tx.wait().then((receipt: any) => {
        console.log('receipt', receipt);
        if (receipt && receipt.status === 1) {
          setChainRequeststatus('success');
        } else {
          setChainRequeststatus('failed');
          setMessage(receipt.message);
        }
        setIsLoading(false);
      });
    } catch (error: any) {
      console.log(error);
      setChainRequeststatus('failed');
      setMessage(error.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => setChainRequeststatus(''), 3000);
  }, [message]);

  // handle the subsctibe of the question
  const handleListenQuestion = async () => {
    setIsLoading(true);
    setRequestType('listen');
    // TODO: replace the mock data
    let [tokenId, subscribeFee] = [0, ethers.utils.parseEther('0.001')];

    if (statusMetaMask != 'connected') {
      console.log('Metamask not connected');
      return;
    }
    if (chainId != '0x507') {
      console.log(`
        please change network to Moonbase Alpha
        rpc:https://rpc.api.moonbase.moonbeam.network
        chainId:0x507
        Symbal:DEV
        blockScan:https://moonbase.moonscan.io/
      `);
      return;
    }
    const provider = new ethers.providers.Web3Provider(ethereum);

    // The Contract object
    const echoinn = new ethers.Contract(
      echoInnAddress,
      contractJson.abi,
      provider
    );

    try {
      // contract question mint.
      const tx = await echoinn
        .connect(provider.getSigner())
        .subscribe(tokenId, { value: subscribeFee });
      await tx.wait().then((response: any) => {
        console.log('receipt', response);
        if (response && response.status === 1) {
          setChainRequeststatus('success');
        } else {
          setChainRequeststatus('failed');
          setMessage(response.message);
        }
        setIsPurchased(true);
        setIsLoading(false);
      });
    } catch (error: any) {
      console.log(error);
      setChainRequeststatus('failed');
      setMessage(error.data.message);
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 2, mb: 2, mx: 3, textAlign: 'left' }}>
      <Typography variant="h4" sx={{ color: 'text.primary', mb: 0.5 }}>
        Why would a CEO get paid 100 times more than the average employee? Are
        they worth it??
      </Typography>
      <Stack direction="row" alignItems="center" spacing={4}>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Answerer:
        </Typography>
        <Typography
          variant="body1"
          sx={{
            ml: 1,
            display: 'inline-block',
            color: theme.palette.primary.main,
          }}
        >
          {user.name}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Price:
        </Typography>
        <Typography
          variant="body1"
          sx={{
            ml: 1,
            display: 'inline-block',
            color: theme.palette.primary.main,
          }}
        >
          0.01ETH
        </Typography>
      </Stack>
      <Box
        sx={{
          mt: 4,
          mx: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <AudioPlayer
          className="audio-player"
          autoPlay={false}
          src={srcSet}
          onPlay={(_e) => console.log('onPlay')}
        /> */}
      </Box>
      {!isPurchased && <Stack direction="row" sx={{ mt: 4, justifyContent: 'space-between' }}>
        <Button sx={{ mt: 2, fontSize: '24px', py: 4, minWidth: 120, mx: 'auto' }} variant="contained" size="large" onClick={handleListenQuestion}>Listen it</Button>
      </Stack>}
      {isPurchased &&<Box sx={{ mt: 4, mx: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <AudioPlayer
          className="audio-player"
          autoPlay={false}
          src={srcSet}
          onPlay={(_e) => console.log('onPlay')}
        />        
      </Box>}
      {/* {<Stack direction="row" sx={{ mt: 4, justifyContent: 'space-between' }}>
        <Button sx={{ my: 2, fontSize: '24px', py: 4, minWidth: 120, mx: 'auto' }} variant="contained" size="large" onClick={handleRedeemQuestion}>Redeem</Button>
      </Stack>} */}
      {/* comments */}
      {isPurchased && (
        <UserCommentList reviews={_mockPurchasedReviews.reviews} />
      )}
      {status === 'view' && (
        <Stack direction="row" sx={{ mt: 4, justifyContent: 'space-between' }}>
          <Button
            sx={{ mt: 2, fontSize: '24px', py: 4, minWidth: 120, mx: 'auto' }}
            variant="contained"
            size="large"
          >
            Buy it
          </Button>
        </Stack>
      )}
      {isLoading && (
        <Box sx={{ width: '100%', my: 4 }}>
          <LinearProgress color="primary" />
        </Box>
      )}
      {chainRequeststatus && (
        <MessageBox
          type={requestType}
          status={chainRequeststatus}
          message={message}
        />
      )}
    </Box>
  );
}

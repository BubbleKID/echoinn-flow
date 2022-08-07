import { useEffect, useState } from 'react';
import { capitalCase } from 'change-case';
import { CryptoPriceProvider } from 'react-realtime-crypto-prices';
import RealTimeCryptoPrice from './RealTimeCryptoPrice';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Stack,
  Button,
  Modal,
  Typography,
  IconButton,
  TextField,
  Grid,
  LinearProgress,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// _mock_
import { _carouselsMembers } from '../../_mock';
// components
import Iconify from '../../components/Iconify';
import UserSelect from './UserSelect';
import CategoryLogo from './category-logo';

// icons
import ArtIcon from '../../assets/img/art-icon.svg';
import FinanceIcon from '../../assets/img/finance-icon.svg';
import GameIcon from '../../assets/img/game-icon.svg';
import HistoryIcon from '../../assets/img/history-icon.svg';
import LiteratureIcon from '../../assets/img/literature-icon.svg';
import TechIcon from '../../assets/img/tech-icon.svg';

import 'react-voice-recorder/dist/index.css';
import 'react-voice-recorder/dist/index.css';

import { useMetaMask } from 'metamask-react';
import { ethers } from 'ethers';
import contractJson from '../../assets/contracts/EchoInn.json';
import contractAddress from '../../assets/contracts/echoinnContractInfo.json';

// querys
import { gql, useMutation } from '@apollo/client';
// import { MINT_NFT } from 'src/flow/mint-col-nft.tx';

// import { mutate } from '@onflow/fcl'
// import { mutate ,tx } from '@onflow/fcl';
import * as fcl from "@onflow/fcl";
import {MINT_COL_NFT} from '../../flow/mint-col-nft.tx';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface IconType {
  iconUrl: string;
  iconName: string;
}


export default function QuestionModal(props: Props) {
  const theme = useTheme();
  const { status, connect, account, chainId, ethereum, addChain } =
    useMetaMask();
  const { open, setOpen } = props;
  const [answerer, setAnswerer] = useState('');
  const [mintStatus, setMintStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questionContent, setQuestionContent] = useState('');
  const [amount, setAmount] = useState(0);
  const [clickedName, setClickedName] = useState('');
  const [iconsClicked, setIconsClicked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  // const CREATE_QUESTION = gql`
  //   mutation Mutation($createQuestion: CreateQuestionInput!) {
  //     createQuestion(createQuestion: $createQuestion) {
  //       id
  //       claim
  //       ownerAddress
  //       kolAddress
  //       status
  //       brief
  //       createdAt
  //     }
  //   }
  // `;
  // const [createQuestion, { data, loading, error }] = useMutation(MINT_col_NFT);

  const icons: IconType[] = [
    { iconUrl: ArtIcon, iconName: 'Art' },
    { iconUrl: FinanceIcon, iconName: 'Finance' },
    { iconUrl: GameIcon, iconName: 'Game' },
    { iconUrl: HistoryIcon, iconName: 'History' },
    { iconUrl: LiteratureIcon, iconName: 'Literature' },
    { iconUrl: TechIcon, iconName: 'Tech' },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleCategoryClicked = (index: number) => {
    const newIconsClicked = [...iconsClicked];
    icons.forEach((icon, i) => {
      if (i === index) {
        newIconsClicked[i] = true;
        setClickedName(icon.iconName);
      } else {
        newIconsClicked[i] = false;
      }
      setIconsClicked(newIconsClicked);
    });
  };

  const handleQuestionContentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestionContent(event.target.value);
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

  // Use this function to handle the payment request
  const handlePayment = async () => {
    setIsLoading(true);
    // Question mint
    console.log('sending payment request');

    if(answerer !== '') {
      let [kolAddress, award, question] = [
        answerer,
        ethers.utils.parseEther(amount.toString()),
        questionContent,
      ];

         // mint nft
      const mintNft =async ( kolAddress: any, question: any, account: any)=>{
        try{
            let res =await fcl.mutate({
              cadence:MINT_COL_NFT,
              limit :55,
                args:(arg: (arg0: string, arg1: any) => any , t: { Ufix64: any; string: any; }) => [
                  arg(kolAddress, t.Ufix64),
                  arg(questionContent, t.string),
                  // arg(user.signer, t.Address)
                  arg(account, t.Ufix64)
                ]
                
              })
              // addTx(res)
              await fcl.tx(res).onceSealed()
            }catch(error){
              console.log(error)
            }

          }


      // const echoDAOAddress = contractAddress.contractAddress;

      // if (status != 'connected') {
      //   console.log('Metamask not connected');
      //   return;
      // }
      // if (chainId != '0x507') {
      //   console.log(`please change network to Moonbase Alpha
      //   rpc:https://rpc.api.moonbase.moonbeam.network
      //   chainId:1287
      //   Symbal:DEV
      //   blockScan:https://moonbase.moonscan.io/
      //   `);
      //   const gnosisChainNetworkParams = {
      //     chainId: '0x507', //1287
      //     chainName: 'Moonbase Alpha',
      //     rpcUrls: ['https://rpc.api.moonbase.moonbeam.network'],
      //     nativeCurrency: {
      //       name: 'Dev',
      //       symbol: 'Dev',
      //       decimals: 18,
      //     },
      //     blockExplorerUrls: ['https://moonbase.moonscan.io/'],
      //   };
      //   // Add the moonbean to metamask

      //   // addChain(gnosisChainNetworkParams)
      // }
      // const provider = new ethers.providers.Web3Provider(ethereum);

      // // The Contract object
      // const echoDAO = new ethers.Contract(
      //   echoDAOAddress,
      //   contractJson.abi,
      //   provider
      // );
      // // Post server(question),=> hash
      // // Mock hash

      // // contract question mint.
      // const tx = await echoDAO
      //   .connect(provider.getSigner())
      //   .questionMint(account, kolAddress, question, { value: award });
      // console.log('tx', tx);
 
      // let claim;
      // let tokenId;
    
      // tx.wait().then((receipt: any) => {
      //   console.log('receipt', receipt);

      //   if (receipt && receipt.status === 1) {
      //     claim = receipt.to;
      //     tokenId = parseInt(receipt.events[0].args.tokenId._hex, 16);

      //     setMintStatus('success');
         
          
          



      //     // createQuestion({ variables: {
      //     //   createQuestion: { 
      //     //     kolAddress: kolAddress,
      //     //     brief: questionContent,
      //     //     ownerAddress: account,
      //     //     // claim: claim,
      //     //     // status: "UNFINISHED",
      //     //     // topic: "general"
      //     //   }
      //     // }});
      //   } else {
      //     setMintStatus('failed');
      //   }
      //   setIsLoading(false);
      // });
    }
  };

  // useEffect(() => {
  //   setTimeout(() => setMintStatus(''), 10000);
  // }, [mintStatus]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ m: 2, textAlign: 'left' }}>
          <Typography variant="h4" sx={{ color: 'text.primary', mb: 1 }}>
            Question
          </Typography>
          <Typography variant="body1" color="primary" sx={{ mb: 1 }}>
            Answerer:
          </Typography>
          <UserSelect  setAnswerer={setAnswerer} />

          <Typography variant="body1" color="primary" sx={{ my: 2 }}>
            Topic:
          </Typography>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {icons.map((icon, index) => (
              <Grid item xs={6} sm={2} key={icon.iconName}>
                <div
                  onClick={() => {
                    console.log(icon.iconName, ': clicked');
                    handleCategoryClicked(index);
                  }}
                >
                  <CategoryLogo
                    iconUrl={icon.iconUrl}
                    iconName={icon.iconName}
                    iconClickedProp={iconsClicked[index]}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
          <Typography variant="body1" color="primary" sx={{ mt: 2, mb: 1 }}>
            Question Content:
          </Typography>
          <Box
            sx={{
              mx: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextField
              disabled={isLoading}
              fullWidth
              label=""
              multiline
              rows={6}
              id="fullWidth"
              placeholder="I'd like to ask..."
              onChange={handleQuestionContentChange}
            />
          </Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 4, display: 'flex', alignItems: 'center' }}
          >
            <TextField
              disabled={isLoading}
              label="Enter the amount"
              type="number"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              onChange={handleChange}
            />
            <Typography
              variant="subtitle1"
              sx={{ color: 'text.primary', mb: 0.5 }}
            >
              <CryptoPriceProvider>
                <RealTimeCryptoPrice amount={amount} setAmount={setAmount} />
              </CryptoPriceProvider>
            </Typography>
          </Stack>
          {!isLoading && (<Stack direction="row" sx={{ my: 4, justifyContent: 'space-between' }}>           
            <Button
              sx={{
                mt: 2,
                fontSize: '24px',
                py: 4,
                minWidth: 120,
                mx: 'auto',
              }}
              variant="contained"
              size="large"
              onClick={handlePayment}
            >
              <Iconify
                icon={'clarity:coin-bag-solid'}
                width={32}
                height={32}
                sx={{ mr: 1 }}
              />
              Make my payment
            </Button>
          </Stack>)}
          {isLoading && <Box sx={{ width: '100%', my: 4 }}><LinearProgress color="primary"/></Box>}
          {mintStatus === 'success' && (
            <Alert severity="success">
              Your question has successfully created!
            </Alert>
          )}
          {mintStatus === 'failed' && (
            <Alert severity="error">
              We have a little problem: Your question creation failed.
            </Alert>
          )}
        </Box>
        <IconButton
          color="primary"
          aria-label="close modal"
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 32,
            height: 32,
            color: theme.palette.info.contrastText,
          }}
        >
          <CloseIcon sx={{ width: 32, height: 32 }} />
        </IconButton>
      </Box>
    </Modal>
  );
}

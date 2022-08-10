import React, { useState, useEffect, useReducer } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { useMetaMask } from 'metamask-react';
// @mui
import { Box, Link, Container, Typography, Stack } from '@mui/material';
// components
import Logo from '../../components/Logo';
//
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';
// hooks
import useAuth from '../../hooks/useAuth';
// in the browser
import * as fcl from "@onflow/fcl";
// querys
import { gql, useLazyQuery } from '@apollo/client';
// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();

  const isHome = pathname === '/';

  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [metaMaskStatus, setMetaMaskStatus] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userIsConnecting, setUserIsConnecting] = useState(false);
  const { isAuthenticated, publicAddress, fakeMetaMaskLogin, logout } = useAuth();
  const GET_USER = gql`
    query Query($userAddress: String!) {
      user(address: $userAddress) {
        nickName
        address
        email
        avatar
      }
    }
  `;
  const [getUser, { loading, error, data }] = useLazyQuery(GET_USER);

  const connectWallet = async () => {
    fcl.config({
      "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Endpoint set to Testnet
    });

    fcl.authenticate();
  };

  // to do: put publicAddress in store
  useEffect(() => {
    if(account) {
      setUserAddress(account);
    }
  }, [account]);

  useEffect(() => {
    console.log("status", status);

    if (status === 'initializing')
      setMetaMaskStatus('Synchronisation with MetaMask ongoing...');

    if (status === 'unavailable')
      setMetaMaskStatus('MetaMask not available :(');

    if (status === 'notConnected') setMetaMaskStatus('notConnected');
    if (status === 'connecting') {
      setUserIsConnecting(true);
      setMetaMaskStatus('Connecting...');
    }

    if (status === 'connected') {
      setMetaMaskStatus(`Connected account ${account} on chain ID ${chainId}`);
      if(account && userIsConnecting) {
          const userData = getUser({variables: { userAddress: userAddress}});       
          fakeMetaMaskLogin(account, userData);
          console.log('publicAddress2222', publicAddress);
      }
    }
  }, [status]);
  
  return (
    <Stack sx={{ minHeight: 1 }}>
      <MainHeader connect={connectWallet} account={account} />
      {!isHome && <div style={{height: '100px'}}> </div>}
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />

      {!isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default',
          }}
        >
          <Container>
            <Logo sx={{ mb: 2, mx: 'auto' }} />

            <Typography variant="caption" component="p">
              © 2022 All rights reserved
              <br /> Made By &nbsp;
              <Link href="#">Echo Dao Group</Link>
            </Typography>
          </Container>
        </Box>
      )}
    </Stack>
  );
}

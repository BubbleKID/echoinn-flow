import React from 'react';
import ReactDOM from "react-dom";
import {
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import App from './App';
import { AuthProvider } from './contexts/JWTContext';
// apollo
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
// MetaMask
import { MetaMaskProvider } from "metamask-react";
// redux
import { store, persistor } from './redux/store';
// contexts
import { SettingsProvider } from './contexts/SettingsContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
// API
import { HOST_API } from './config';

// highlight
import './utils/highlight';

// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'react-image-lightbox/style.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri:`${HOST_API}/graphql`
  })
});

class MyComponent extends React.Component {
  render() {
    return (
      <AuthProvider>
        <HelmetProvider>
          <ApolloProvider client={client}>
            <ReduxProvider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <SettingsProvider>
                  <CollapseDrawerProvider>
                    <BrowserRouter>
                      <MetaMaskProvider>
                        <App/>
                      </MetaMaskProvider>
                    </BrowserRouter>
                  </CollapseDrawerProvider>
                </SettingsProvider>
              </PersistGate>
            </ReduxProvider>
          </ApolloProvider>
        </HelmetProvider>
      </AuthProvider>
    );
  }
}

ReactDOM.render(<MyComponent/>, document.getElementById('root'));

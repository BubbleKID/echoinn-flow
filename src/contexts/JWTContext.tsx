import { createContext, ReactNode, useEffect, useReducer } from 'react';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
// @types
import { ActionMap, AuthState, AuthUser, JWTContextType } from '../@types/auth';



// ----------------------------------------------------------------------



enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  FakeLogin = 'FAKE_LOGIN',
  Logout = 'LOGOUT',
  Register = 'REGISTER',
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Login]: {
    user: AuthUser;
  };
  [Types.FakeLogin]: {
    publicAddress: string;
    user: AuthUser;
  };
  [Types.Logout]: undefined;
  [Types.Register]: {
    user: AuthUser;
  };
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  publicAddress: "",
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
        publicAddress: "",
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'FAKE_LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        publicAddress: action.payload.publicAddress,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get('/api/account/my-account');
          const { user } = response.data;

          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {  
        console.error(err);
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post('/api/account/login', {
      email,
      password,
    });
    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: Types.Login,
      payload: {
        user,
      },
    });
  };

  const fakeMetaMaskLogin = async (id: string, userData: any) => {
    let user;
    console.log('userData', userData);
    if(userData && userData.data) {
      user = {
        photoURL: userData.data.user.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcttIQoTjsAFIstSy8vpqbzv0y1VQyANWltw&usqp=CAU",
        displayName: userData.data.user.nickName || "anonymous",
        email: userData.data.user.email || "",
        role: "User",
      }
    } else {
      user = {
        photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcttIQoTjsAFIstSy8vpqbzv0y1VQyANWltw&usqp=CAU",
        displayName: "anonymous",
        email: "",
        role: "User",
      }
    }

    dispatch({
      type: Types.FakeLogin,
      payload: {
        publicAddress: id,
        user: user,
      },
    });
  };

  // const LOGIN_QUERY = `
  //   query Query($userId: Int!) {
  //     user(id: $userId) {
  //       address
  //       nickName
  //     }
  //   }
  // `;

  // const login = async (email: string, password: string) => {
  //   const response = await axios.post('/graphql', {
  //     query: LOGIN_QUERY,
  //     variables: {
  //       userId: 1,
  //     }
  //   });
  //   const { accessToken, user } = response.data;
  //   // setSession(accessToken);

  //   // dispatch({
  //   //   type: Types.Login,
  //   //   payload: {
  //   //     user,
  //   //   },
  //   // });
  // };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: Types.Register,
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: Types.Logout });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        fakeMetaMaskLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

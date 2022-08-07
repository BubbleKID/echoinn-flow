import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type CreateKolInput = {
  floorPrice: Scalars['Float'];
  /** kolAddress account address */
  kolAddress: Scalars['String'];
};

export type CreateOrderInput = {
  /** Answer account address */
  answerer: Scalars['String'];
  /** Order description */
  description?: InputMaybe<Scalars['String']>;
  /** Expired duration */
  duration: Scalars['Float'];
  expired?: InputMaybe<Scalars['Date']>;
  /** Order and question owner account address */
  owner: Scalars['String'];
};

export type CreateQuestionInput = {
  /** Answer account claim */
  answerer: Scalars['String'];
  /** Question brief */
  brief?: InputMaybe<Scalars['String']>;
  /** Question NFT claim */
  claim: Scalars['String'];
  /** NFT owner account claim */
  ownerAddress: Scalars['String'];
};

export type CreateUserInput = {
  /** User account address */
  address: Scalars['String'];
  /** User avatar url */
  avatar?: InputMaybe<Scalars['String']>;
  /** User email */
  email?: InputMaybe<Scalars['String']>;
  /** User nickName */
  nickName?: InputMaybe<Scalars['String']>;
};

/** The KOL verification status. */
export enum Kol_Status {
  /** @deprecated KOL verify fail */
  Fail = 'FAIL',
  /** @deprecated KOL verify handling */
  Handling = 'HANDLING',
  /** @deprecated KOL verify success */
  Success = 'SUCCESS'
}

export type Kol = {
  __typename?: 'Kol';
  createdAt: Scalars['Date'];
  floorPrice: Scalars['Float'];
  /** ID of the KOL */
  id: Scalars['Int'];
  /** kolAddress account address */
  kolAddress: Scalars['String'];
  /** KOL apply status */
  status: Kol_Status;
  updatedAt: Scalars['Date'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createKol: Kol;
  createOrder: Order;
  createQuestion: Question;
  createUser: User;
  removeOrder: Order;
  updateKol: Kol;
  updateOrder: Order;
  /** Update a questions */
  updateQuestion: Question;
  updateUser: User;
  uploadAudio: Scalars['String'];
};


export type MutationCreateKolArgs = {
  createKolInput: CreateKolInput;
};


export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
};


export type MutationCreateQuestionArgs = {
  createQuestion: CreateQuestionInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveOrderArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateKolArgs = {
  updateKolInput: UpdateKolInput;
};


export type MutationUpdateOrderArgs = {
  updateOrderInput: UpdateOrderInput;
};


export type MutationUpdateQuestionArgs = {
  createQuestionInput: UpdateQuestionInput;
  id: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUploadAudioArgs = {
  claim: Scalars['String'];
  file: Scalars['Upload'];
};

/** The order status. */
export enum Order_Status {
  /** @deprecated Order expired */
  Expired = 'EXPIRED',
  /** @deprecated Order question has been resolved */
  Resolved = 'RESOLVED',
  /** Order within expired duration is valid status */
  Valid = 'VALID'
}

export type Order = {
  __typename?: 'Order';
  /** Answer account address */
  answerer: Scalars['String'];
  createdAt: Scalars['Date'];
  /** Order description */
  description?: Maybe<Scalars['String']>;
  /** Expired duration */
  duration: Scalars['Float'];
  expired?: Maybe<Scalars['Date']>;
  /** ID of the question */
  id: Scalars['Int'];
  /** Order and question owner account address */
  owner: Scalars['String'];
  /** Order and question owner account address */
  status: Order_Status;
};

export type Query = {
  __typename?: 'Query';
  getAllKol: Array<Kol>;
  /** Get all questions */
  getAllQuestion: Array<Question>;
  getKol: Kol;
  getOrder: Order;
  getOrders: Array<Order>;
  getQuestion: Question;
  user: User;
  users: Array<User>;
};


export type QueryGetKolArgs = {
  id: Scalars['Int'];
};


export type QueryGetOrderArgs = {
  id: Scalars['Int'];
};


export type QueryGetQuestionArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type Question = {
  __typename?: 'Question';
  /** Answer account claim */
  answerer: Scalars['String'];
  /** Question brief */
  brief?: Maybe<Scalars['String']>;
  /** Question NFT claim */
  claim: Scalars['String'];
  createdAt: Scalars['Date'];
  /** ID of the question */
  id: Scalars['Int'];
  /** NFT owner account claim */
  ownerAddress: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Subscription a question updated */
  quesquestionUpdatedt: Scalars['String'];
  /** Subscription a question created */
  questionAdded: Scalars['String'];
};

export type UpdateKolInput = {
  /** ID of the KOL */
  id: Scalars['Int'];
  /** KOL apply status */
  status: Kol_Status;
};

export type UpdateOrderInput = {
  /** Order description */
  description?: InputMaybe<Scalars['String']>;
  /** Expired duration */
  duration: Scalars['Float'];
  /** ID of the question */
  id: Scalars['Int'];
  /** Order and question owner account address */
  status: Order_Status;
};

export type UpdateQuestionInput = {
  /** Question brief */
  brief?: InputMaybe<Scalars['String']>;
  /** NFT owner account claim */
  ownerAddress: Scalars['String'];
};

export type UpdateUserInput = {
  /** User account address */
  address: Scalars['String'];
  /** User avatar url */
  avatar?: InputMaybe<Scalars['String']>;
  /** User email */
  email?: InputMaybe<Scalars['String']>;
  /** User nickName */
  nickName?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  /** User account address */
  address: Scalars['String'];
  /** User avatar url */
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  /** User email */
  email?: Maybe<Scalars['String']>;
  /** User nickName */
  nickName?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type KolMutationMutationVariables = Exact<{
  createKolInput: CreateKolInput;
  updateKolInput: UpdateKolInput;
}>;


export type KolMutationMutation = { __typename?: 'Mutation', createKol: { __typename?: 'Kol', id: number, status: Kol_Status, kolAddress: string, createdAt: any, updatedAt: any, floorPrice: number }, updateKol: { __typename?: 'Kol', id: number, status: Kol_Status, kolAddress: string, createdAt: any, updatedAt: any, floorPrice: number } };

export type OrderMutationMutationVariables = Exact<{
  removeOrderId: Scalars['Int'];
  updateOrderInput: UpdateOrderInput;
  createOrderInput: CreateOrderInput;
}>;


export type OrderMutationMutation = { __typename?: 'Mutation', removeOrder: { __typename?: 'Order', id: number, duration: number, owner: string, status: Order_Status, answerer: string, description?: string | null, createdAt: any, expired?: any | null }, updateOrder: { __typename?: 'Order', id: number, duration: number, owner: string, status: Order_Status, answerer: string, description?: string | null, createdAt: any, expired?: any | null }, createOrder: { __typename?: 'Order', id: number, duration: number, owner: string, status: Order_Status, answerer: string, description?: string | null, createdAt: any, expired?: any | null } };

export type MutationMutationVariables = Exact<{
  createQuestion: CreateQuestionInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', createQuestion: { __typename?: 'Question', id: number, claim: string, ownerAddress: string, answerer: string, brief?: string | null, createdAt: any } };

export type UploadAudioMutationVariables = Exact<{
  uploadAudioFile2: Scalars['Upload'];
  uploadAudioClaim2: Scalars['String'];
}>;


export type UploadAudioMutation = { __typename?: 'Mutation', uploadAudio: string };

export type UserMutationMutationVariables = Exact<{
  createUserInput: CreateUserInput;
  updateUserInput: UpdateUserInput;
}>;


export type UserMutationMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', createdAt: any, updatedAt: any, address: string, email?: string | null, nickName?: string | null, avatar?: string | null }, updateUser: { __typename?: 'User', createdAt: any, updatedAt: any, address: string, email?: string | null, nickName?: string | null, avatar?: string | null } };

export type KolQueryQueryVariables = Exact<{
  getKolId: Scalars['Int'];
}>;


export type KolQueryQuery = { __typename?: 'Query', getAllKol: Array<{ __typename?: 'Kol', id: number, status: Kol_Status, kolAddress: string, createdAt: any, updatedAt: any, floorPrice: number }>, getKol: { __typename?: 'Kol', id: number, status: Kol_Status, kolAddress: string, createdAt: any, updatedAt: any, floorPrice: number } };

export type OrderQueryQueryVariables = Exact<{
  getOrderId: Scalars['Int'];
}>;


export type OrderQueryQuery = { __typename?: 'Query', getOrder: { __typename?: 'Order', id: number, duration: number, owner: string, status: Order_Status, answerer: string, description?: string | null, createdAt: any, expired?: any | null } };

export type OrderQueryAllQueryVariables = Exact<{ [key: string]: never; }>;


export type OrderQueryAllQuery = { __typename?: 'Query', getOrders: Array<{ __typename?: 'Order', id: number, duration: number, owner: string, status: Order_Status, answerer: string, description?: string | null, createdAt: any, expired?: any | null }> };

export type QuestionQueryQueryVariables = Exact<{
  getQuestionId: Scalars['Int'];
}>;


export type QuestionQueryQuery = { __typename?: 'Query', getQuestion: { __typename?: 'Question', id: number, claim: string, ownerAddress: string, answerer: string, brief?: string | null, createdAt: any } };

export type QuestionAllQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QuestionAllQueryQuery = { __typename?: 'Query', getAllQuestion: Array<{ __typename?: 'Question', id: number, claim: string, ownerAddress: string, answerer: string, brief?: string | null, createdAt: any }> };

export type UserQueryQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type UserQueryQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', createdAt: any, updatedAt: any, address: string, email?: string | null, nickName?: string | null, avatar?: string | null }>, user: { __typename?: 'User', createdAt: any, updatedAt: any, address: string, email?: string | null, nickName?: string | null, avatar?: string | null } };

export type AddSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type AddSubscriptionSubscription = { __typename?: 'Subscription', questionAdded: string };

export type UpdateSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UpdateSubscriptionSubscription = { __typename?: 'Subscription', quesquestionUpdatedt: string };


export const KolMutationDocument = gql`
    mutation KOLMutation($createKolInput: CreateKolInput!, $updateKolInput: UpdateKolInput!) {
  createKol(createKolInput: $createKolInput) {
    id
    status
    kolAddress
    createdAt
    updatedAt
    floorPrice
  }
  updateKol(updateKolInput: $updateKolInput) {
    id
    status
    kolAddress
    createdAt
    updatedAt
    floorPrice
  }
}
    `;
export type KolMutationMutationFn = Apollo.MutationFunction<KolMutationMutation, KolMutationMutationVariables>;

/**
 * __useKolMutationMutation__
 *
 * To run a mutation, you first call `useKolMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useKolMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [kolMutationMutation, { data, loading, error }] = useKolMutationMutation({
 *   variables: {
 *      createKolInput: // value for 'createKolInput'
 *      updateKolInput: // value for 'updateKolInput'
 *   },
 * });
 */
export function useKolMutationMutation(baseOptions?: Apollo.MutationHookOptions<KolMutationMutation, KolMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<KolMutationMutation, KolMutationMutationVariables>(KolMutationDocument, options);
      }
export type KolMutationMutationHookResult = ReturnType<typeof useKolMutationMutation>;
export type KolMutationMutationResult = Apollo.MutationResult<KolMutationMutation>;
export type KolMutationMutationOptions = Apollo.BaseMutationOptions<KolMutationMutation, KolMutationMutationVariables>;
export const OrderMutationDocument = gql`
    mutation OrderMutation($removeOrderId: Int!, $updateOrderInput: UpdateOrderInput!, $createOrderInput: CreateOrderInput!) {
  removeOrder(id: $removeOrderId) {
    id
    duration
    owner
    status
    answerer
    description
    createdAt
    expired
  }
  updateOrder(updateOrderInput: $updateOrderInput) {
    id
    duration
    owner
    status
    answerer
    description
    createdAt
    expired
  }
  createOrder(createOrderInput: $createOrderInput) {
    id
    duration
    owner
    status
    answerer
    description
    createdAt
    expired
  }
}
    `;
export type OrderMutationMutationFn = Apollo.MutationFunction<OrderMutationMutation, OrderMutationMutationVariables>;

/**
 * __useOrderMutationMutation__
 *
 * To run a mutation, you first call `useOrderMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderMutationMutation, { data, loading, error }] = useOrderMutationMutation({
 *   variables: {
 *      removeOrderId: // value for 'removeOrderId'
 *      updateOrderInput: // value for 'updateOrderInput'
 *      createOrderInput: // value for 'createOrderInput'
 *   },
 * });
 */
export function useOrderMutationMutation(baseOptions?: Apollo.MutationHookOptions<OrderMutationMutation, OrderMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderMutationMutation, OrderMutationMutationVariables>(OrderMutationDocument, options);
      }
export type OrderMutationMutationHookResult = ReturnType<typeof useOrderMutationMutation>;
export type OrderMutationMutationResult = Apollo.MutationResult<OrderMutationMutation>;
export type OrderMutationMutationOptions = Apollo.BaseMutationOptions<OrderMutationMutation, OrderMutationMutationVariables>;
export const MutationDocument = gql`
    mutation Mutation($createQuestion: CreateQuestionInput!) {
  createQuestion(createQuestion: $createQuestion) {
    id
    claim
    ownerAddress
    answerer
    brief
    createdAt
  }
}
    `;
export type MutationMutationFn = Apollo.MutationFunction<MutationMutation, MutationMutationVariables>;

/**
 * __useMutationMutation__
 *
 * To run a mutation, you first call `useMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationMutation, { data, loading, error }] = useMutationMutation({
 *   variables: {
 *      createQuestion: // value for 'createQuestion'
 *   },
 * });
 */
export function useMutationMutation(baseOptions?: Apollo.MutationHookOptions<MutationMutation, MutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationMutation, MutationMutationVariables>(MutationDocument, options);
      }
export type MutationMutationHookResult = ReturnType<typeof useMutationMutation>;
export type MutationMutationResult = Apollo.MutationResult<MutationMutation>;
export type MutationMutationOptions = Apollo.BaseMutationOptions<MutationMutation, MutationMutationVariables>;
export const UploadAudioDocument = gql`
    mutation UploadAudio($uploadAudioFile2: Upload!, $uploadAudioClaim2: String!) {
  uploadAudio(file: $uploadAudioFile2, claim: $uploadAudioClaim2)
}
    `;
export type UploadAudioMutationFn = Apollo.MutationFunction<UploadAudioMutation, UploadAudioMutationVariables>;

/**
 * __useUploadAudioMutation__
 *
 * To run a mutation, you first call `useUploadAudioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadAudioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadAudioMutation, { data, loading, error }] = useUploadAudioMutation({
 *   variables: {
 *      uploadAudioFile2: // value for 'uploadAudioFile2'
 *      uploadAudioClaim2: // value for 'uploadAudioClaim2'
 *   },
 * });
 */
export function useUploadAudioMutation(baseOptions?: Apollo.MutationHookOptions<UploadAudioMutation, UploadAudioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadAudioMutation, UploadAudioMutationVariables>(UploadAudioDocument, options);
      }
export type UploadAudioMutationHookResult = ReturnType<typeof useUploadAudioMutation>;
export type UploadAudioMutationResult = Apollo.MutationResult<UploadAudioMutation>;
export type UploadAudioMutationOptions = Apollo.BaseMutationOptions<UploadAudioMutation, UploadAudioMutationVariables>;
export const UserMutationDocument = gql`
    mutation UserMutation($createUserInput: CreateUserInput!, $updateUserInput: UpdateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    createdAt
    updatedAt
    address
    email
    nickName
    avatar
  }
  updateUser(updateUserInput: $updateUserInput) {
    createdAt
    updatedAt
    address
    email
    nickName
    avatar
  }
}
    `;
export type UserMutationMutationFn = Apollo.MutationFunction<UserMutationMutation, UserMutationMutationVariables>;

/**
 * __useUserMutationMutation__
 *
 * To run a mutation, you first call `useUserMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userMutationMutation, { data, loading, error }] = useUserMutationMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUserMutationMutation(baseOptions?: Apollo.MutationHookOptions<UserMutationMutation, UserMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserMutationMutation, UserMutationMutationVariables>(UserMutationDocument, options);
      }
export type UserMutationMutationHookResult = ReturnType<typeof useUserMutationMutation>;
export type UserMutationMutationResult = Apollo.MutationResult<UserMutationMutation>;
export type UserMutationMutationOptions = Apollo.BaseMutationOptions<UserMutationMutation, UserMutationMutationVariables>;
export const KolQueryDocument = gql`
    query KOLQuery($getKolId: Int!) {
  getAllKol {
    id
    status
    kolAddress
    createdAt
    updatedAt
    floorPrice
  }
  getKol(id: $getKolId) {
    id
    status
    kolAddress
    createdAt
    updatedAt
    floorPrice
  }
}
    `;

/**
 * __useKolQueryQuery__
 *
 * To run a query within a React component, call `useKolQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useKolQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKolQueryQuery({
 *   variables: {
 *      getKolId: // value for 'getKolId'
 *   },
 * });
 */
export function useKolQueryQuery(baseOptions: Apollo.QueryHookOptions<KolQueryQuery, KolQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<KolQueryQuery, KolQueryQueryVariables>(KolQueryDocument, options);
      }
export function useKolQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<KolQueryQuery, KolQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<KolQueryQuery, KolQueryQueryVariables>(KolQueryDocument, options);
        }
export type KolQueryQueryHookResult = ReturnType<typeof useKolQueryQuery>;
export type KolQueryLazyQueryHookResult = ReturnType<typeof useKolQueryLazyQuery>;
export type KolQueryQueryResult = Apollo.QueryResult<KolQueryQuery, KolQueryQueryVariables>;
export const OrderQueryDocument = gql`
    query OrderQuery($getOrderId: Int!) {
  getOrder(id: $getOrderId) {
    id
    duration
    owner
    status
    answerer
    description
    createdAt
    expired
  }
}
    `;

/**
 * __useOrderQueryQuery__
 *
 * To run a query within a React component, call `useOrderQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderQueryQuery({
 *   variables: {
 *      getOrderId: // value for 'getOrderId'
 *   },
 * });
 */
export function useOrderQueryQuery(baseOptions: Apollo.QueryHookOptions<OrderQueryQuery, OrderQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderQueryQuery, OrderQueryQueryVariables>(OrderQueryDocument, options);
      }
export function useOrderQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderQueryQuery, OrderQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderQueryQuery, OrderQueryQueryVariables>(OrderQueryDocument, options);
        }
export type OrderQueryQueryHookResult = ReturnType<typeof useOrderQueryQuery>;
export type OrderQueryLazyQueryHookResult = ReturnType<typeof useOrderQueryLazyQuery>;
export type OrderQueryQueryResult = Apollo.QueryResult<OrderQueryQuery, OrderQueryQueryVariables>;
export const OrderQueryAllDocument = gql`
    query OrderQueryAll {
  getOrders {
    id
    duration
    owner
    status
    answerer
    description
    createdAt
    expired
  }
}
    `;

/**
 * __useOrderQueryAllQuery__
 *
 * To run a query within a React component, call `useOrderQueryAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderQueryAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderQueryAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrderQueryAllQuery(baseOptions?: Apollo.QueryHookOptions<OrderQueryAllQuery, OrderQueryAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderQueryAllQuery, OrderQueryAllQueryVariables>(OrderQueryAllDocument, options);
      }
export function useOrderQueryAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderQueryAllQuery, OrderQueryAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderQueryAllQuery, OrderQueryAllQueryVariables>(OrderQueryAllDocument, options);
        }
export type OrderQueryAllQueryHookResult = ReturnType<typeof useOrderQueryAllQuery>;
export type OrderQueryAllLazyQueryHookResult = ReturnType<typeof useOrderQueryAllLazyQuery>;
export type OrderQueryAllQueryResult = Apollo.QueryResult<OrderQueryAllQuery, OrderQueryAllQueryVariables>;
export const QuestionQueryDocument = gql`
    query QuestionQuery($getQuestionId: Int!) {
  getQuestion(id: $getQuestionId) {
    id
    claim
    ownerAddress
    answerer
    brief
    createdAt
  }
}
    `;

/**
 * __useQuestionQueryQuery__
 *
 * To run a query within a React component, call `useQuestionQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestionQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestionQueryQuery({
 *   variables: {
 *      getQuestionId: // value for 'getQuestionId'
 *   },
 * });
 */
export function useQuestionQueryQuery(baseOptions: Apollo.QueryHookOptions<QuestionQueryQuery, QuestionQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestionQueryQuery, QuestionQueryQueryVariables>(QuestionQueryDocument, options);
      }
export function useQuestionQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionQueryQuery, QuestionQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestionQueryQuery, QuestionQueryQueryVariables>(QuestionQueryDocument, options);
        }
export type QuestionQueryQueryHookResult = ReturnType<typeof useQuestionQueryQuery>;
export type QuestionQueryLazyQueryHookResult = ReturnType<typeof useQuestionQueryLazyQuery>;
export type QuestionQueryQueryResult = Apollo.QueryResult<QuestionQueryQuery, QuestionQueryQueryVariables>;
export const QuestionAllQueryDocument = gql`
    query QuestionAllQuery {
  getAllQuestion {
    id
    claim
    ownerAddress
    answerer
    brief
    createdAt
  }
}
    `;

/**
 * __useQuestionAllQueryQuery__
 *
 * To run a query within a React component, call `useQuestionAllQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestionAllQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestionAllQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuestionAllQueryQuery(baseOptions?: Apollo.QueryHookOptions<QuestionAllQueryQuery, QuestionAllQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestionAllQueryQuery, QuestionAllQueryQueryVariables>(QuestionAllQueryDocument, options);
      }
export function useQuestionAllQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionAllQueryQuery, QuestionAllQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestionAllQueryQuery, QuestionAllQueryQueryVariables>(QuestionAllQueryDocument, options);
        }
export type QuestionAllQueryQueryHookResult = ReturnType<typeof useQuestionAllQueryQuery>;
export type QuestionAllQueryLazyQueryHookResult = ReturnType<typeof useQuestionAllQueryLazyQuery>;
export type QuestionAllQueryQueryResult = Apollo.QueryResult<QuestionAllQueryQuery, QuestionAllQueryQueryVariables>;
export const UserQueryDocument = gql`
    query UserQuery($userId: Int!) {
  users {
    createdAt
    updatedAt
    address
    email
    nickName
    avatar
  }
  user(id: $userId) {
    createdAt
    updatedAt
    address
    email
    nickName
    avatar
  }
}
    `;

/**
 * __useUserQueryQuery__
 *
 * To run a query within a React component, call `useUserQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQueryQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQueryQuery(baseOptions: Apollo.QueryHookOptions<UserQueryQuery, UserQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQueryQuery, UserQueryQueryVariables>(UserQueryDocument, options);
      }
export function useUserQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQueryQuery, UserQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQueryQuery, UserQueryQueryVariables>(UserQueryDocument, options);
        }
export type UserQueryQueryHookResult = ReturnType<typeof useUserQueryQuery>;
export type UserQueryLazyQueryHookResult = ReturnType<typeof useUserQueryLazyQuery>;
export type UserQueryQueryResult = Apollo.QueryResult<UserQueryQuery, UserQueryQueryVariables>;
export const AddSubscriptionDocument = gql`
    subscription AddSubscription {
  questionAdded
}
    `;

/**
 * __useAddSubscriptionSubscription__
 *
 * To run a query within a React component, call `useAddSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAddSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddSubscriptionSubscription({
 *   variables: {
 *   },
 * });
 */
export function useAddSubscriptionSubscription(baseOptions?: Apollo.SubscriptionHookOptions<AddSubscriptionSubscription, AddSubscriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<AddSubscriptionSubscription, AddSubscriptionSubscriptionVariables>(AddSubscriptionDocument, options);
      }
export type AddSubscriptionSubscriptionHookResult = ReturnType<typeof useAddSubscriptionSubscription>;
export type AddSubscriptionSubscriptionResult = Apollo.SubscriptionResult<AddSubscriptionSubscription>;
export const UpdateSubscriptionDocument = gql`
    subscription UpdateSubscription {
  quesquestionUpdatedt
}
    `;

/**
 * __useUpdateSubscriptionSubscription__
 *
 * To run a query within a React component, call `useUpdateSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateSubscriptionSubscription({
 *   variables: {
 *   },
 * });
 */
export function useUpdateSubscriptionSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UpdateSubscriptionSubscription, UpdateSubscriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UpdateSubscriptionSubscription, UpdateSubscriptionSubscriptionVariables>(UpdateSubscriptionDocument, options);
      }
export type UpdateSubscriptionSubscriptionHookResult = ReturnType<typeof useUpdateSubscriptionSubscription>;
export type UpdateSubscriptionSubscriptionResult = Apollo.SubscriptionResult<UpdateSubscriptionSubscription>;
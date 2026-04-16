import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Category = {
  __typename?: 'Category';
  created_at?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type DashboardStats = {
  __typename?: 'DashboardStats';
  assigned?: Maybe<Scalars['Int']['output']>;
  averageOfficerRating?: Maybe<Scalars['Float']['output']>;
  closed?: Maybe<Scalars['Int']['output']>;
  escalated?: Maybe<Scalars['Int']['output']>;
  inProgress?: Maybe<Scalars['Int']['output']>;
  rejected?: Maybe<Scalars['Int']['output']>;
  resolved?: Maybe<Scalars['Int']['output']>;
  submitted?: Maybe<Scalars['Int']['output']>;
  totalCitizens?: Maybe<Scalars['Int']['output']>;
  totalGrievances?: Maybe<Scalars['Int']['output']>;
  totalOfficers?: Maybe<Scalars['Int']['output']>;
  totalStaff?: Maybe<Scalars['Int']['output']>;
};

export type District = {
  __typename?: 'District';
  district_code: Scalars['String']['output'];
  district_name: Scalars['String']['output'];
  state_code: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateCategory: Category;
  CreateGrievance: Grievnace;
  DeleteCategory: Category;
  DeleteUser: User;
  Login: WebLoginResponse;
  UpdateCategory: Category;
  UpdateUser: User;
  addDistrictAdmin: RegisterResponse;
  register: RegisterResponse;
  registerSuperAdmin: RegisterResponse;
  requestLoginOtp: OtpResponse;
  selfRegister: RegisterResponse;
  staffLogin: StaffLoginResponse;
  verifyLoginOtp: VerifyOtpResponse;
};


export type MutationCreateCategoryArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationCreateGrievanceArgs = {
  assignedTo?: InputMaybe<Scalars['ID']['input']>;
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
  districtId: Scalars['String']['input'];
  image_data?: InputMaybe<Scalars['String']['input']>;
  stateId: Scalars['String']['input'];
  status: Scalars['String']['input'];
  title: Scalars['String']['input'];
  user_id?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateCategoryArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  district?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  mobile_number?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAddDistrictAdminArgs = {
  district: Scalars['String']['input'];
  email: Scalars['String']['input'];
  mobile_number: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  state: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  district: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  mobile_number: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  role: Scalars['String']['input'];
  state: Scalars['String']['input'];
};


export type MutationRegisterSuperAdminArgs = {
  email: Scalars['String']['input'];
  mobile_number: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRequestLoginOtpArgs = {
  loginType: Scalars['String']['input'];
  mobileNumber: Scalars['String']['input'];
};


export type MutationSelfRegisterArgs = {
  district: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  mobile_number: Scalars['String']['input'];
  name: Scalars['String']['input'];
  state: Scalars['String']['input'];
};


export type MutationStaffLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationVerifyLoginOtpArgs = {
  mobile_number: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};

export type OtpResponse = {
  __typename?: 'OtpResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  GetCategory?: Maybe<Array<Maybe<Category>>>;
  GetFieldStaff?: Maybe<Array<Maybe<User>>>;
  GetGrievance?: Maybe<Array<Maybe<Grievnace>>>;
  GetGrievanceByID?: Maybe<Array<Maybe<Grievnace>>>;
  getDashboardStats?: Maybe<DashboardStats>;
  getDistricts?: Maybe<Array<Maybe<District>>>;
  getStates?: Maybe<Array<Maybe<State>>>;
  getalluser?: Maybe<Array<Maybe<User>>>;
  me?: Maybe<User>;
};


export type QueryGetDashboardStatsArgs = {
  district?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDistrictsArgs = {
  state_code?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetalluserArgs = {
  role?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type StaffLoginResponse = {
  __typename?: 'StaffLoginResponse';
  email?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  mobile_number?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
};

export type State = {
  __typename?: 'State';
  state_code: Scalars['String']['output'];
  state_name: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  active?: Maybe<Scalars['Boolean']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  mobile_number?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  state?: Maybe<Scalars['String']['output']>;
};

export type VerifyOtpResponse = {
  __typename?: 'VerifyOtpResponse';
  email?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  mobile_number?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
};

export type WebLoginResponse = {
  __typename?: 'WebLoginResponse';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  message: Scalars['String']['output'];
  mobile_number?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
};

export type Grievnace = {
  __typename?: 'grievnace';
  assignedTo?: Maybe<Scalars['String']['output']>;
  category: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  districtId: Scalars['String']['output'];
  grievance_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image_data?: Maybe<Scalars['String']['output']>;
  stateId: Scalars['String']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

export type AddDistrictAdminMutationVariables = Exact<{
  name: Scalars['String']['input'];
  mobileNumber: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  state: Scalars['String']['input'];
  district: Scalars['String']['input'];
}>;


export type AddDistrictAdminMutationData = { __typename?: 'Mutation', addDistrictAdmin: { __typename?: 'RegisterResponse', message: string, success: boolean } };

export type CreateCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateCategoryMutationData = { __typename?: 'Mutation', CreateCategory: { __typename?: 'Category', id: string, name: string, description?: string | null, created_at?: string | null } };

export type DeleteCategoryMutationVariables = Exact<{
  deleteCategoryId: Scalars['ID']['input'];
}>;


export type DeleteCategoryMutationData = { __typename?: 'Mutation', DeleteCategory: { __typename?: 'Category', created_at?: string | null, description?: string | null, id: string, name: string } };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['ID']['input'];
}>;


export type DeleteUserMutationData = { __typename?: 'Mutation', DeleteUser: { __typename?: 'User', id: string, email?: string | null, name?: string | null, mobile_number?: string | null, role: string, state?: string | null, district?: string | null } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutationData = { __typename?: 'Mutation', Login: { __typename?: 'WebLoginResponse', success: boolean, message: string, token: string, id?: string | null, name?: string | null, email?: string | null, role?: string | null, mobile_number?: string | null } };

export type RegisterMutationVariables = Exact<{
  name: Scalars['String']['input'];
  mobileNumber: Scalars['String']['input'];
  role: Scalars['String']['input'];
  state: Scalars['String']['input'];
  district: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
}>;


export type RegisterMutationData = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', message: string, success: boolean } };

export type UpdateCategoryMutationVariables = Exact<{
  updateCategoryId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCategoryMutationData = { __typename?: 'Mutation', UpdateCategory: { __typename?: 'Category', id: string, name: string, description?: string | null, created_at?: string | null } };

export type UpdateUserMutationVariables = Exact<{
  updateUserId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  mobileNumber?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  district?: InputMaybe<Scalars['String']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateUserMutationData = { __typename?: 'Mutation', UpdateUser: { __typename?: 'User', id: string, email?: string | null, name?: string | null, mobile_number?: string | null, role: string, state?: string | null, district?: string | null } };

export type GetalluserQueryVariables = Exact<{
  role?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetalluserQueryData = { __typename?: 'Query', getalluser?: Array<{ __typename?: 'User', id: string, email?: string | null, name?: string | null, mobile_number?: string | null, role: string, state?: string | null, district?: string | null, active?: boolean | null } | null> | null };

export type GetCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoryQueryData = { __typename?: 'Query', GetCategory?: Array<{ __typename?: 'Category', id: string, name: string, description?: string | null, created_at?: string | null } | null> | null };

export type GetDashboardStatsQueryVariables = Exact<{
  district?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetDashboardStatsQueryData = { __typename?: 'Query', getDashboardStats?: { __typename?: 'DashboardStats', totalGrievances?: number | null, submitted?: number | null, assigned?: number | null, inProgress?: number | null, escalated?: number | null, resolved?: number | null, rejected?: number | null, closed?: number | null, totalCitizens?: number | null, totalOfficers?: number | null, totalStaff?: number | null, averageOfficerRating?: number | null } | null };

export type GetDistrictsQueryVariables = Exact<{
  stateCode?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetDistrictsQueryData = { __typename?: 'Query', getDistricts?: Array<{ __typename?: 'District', district_code: string, district_name: string, state_code: string } | null> | null };

export type GetGrievanceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGrievanceQueryData = { __typename?: 'Query', GetGrievance?: Array<{ __typename?: 'grievnace', id: string, grievance_id: string, title: string, description: string, category: string, stateId: string, districtId: string, status: string, image_data?: string | null, user_id?: string | null, assignedTo?: string | null, createdAt?: string | null, updatedAt?: string | null } | null> | null };

export type GetStatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStatesQueryData = { __typename?: 'Query', getStates?: Array<{ __typename?: 'State', state_code: string, state_name: string } | null> | null };


export const AddDistrictAdminDocument = gql`
    mutation AddDistrictAdmin($name: String!, $mobileNumber: String!, $email: String!, $password: String!, $state: String!, $district: String!) {
  addDistrictAdmin(
    name: $name
    mobile_number: $mobileNumber
    email: $email
    password: $password
    state: $state
    district: $district
  ) {
    message
    success
  }
}
    `;
export type AddDistrictAdminMutationFn = Apollo.MutationFunction<AddDistrictAdminMutationData, AddDistrictAdminMutationVariables>;

/**
 * __useAddDistrictAdminMutation__
 *
 * To run a mutation, you first call `useAddDistrictAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDistrictAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDistrictAdminMutation, { data, loading, error }] = useAddDistrictAdminMutation({
 *   variables: {
 *      name: // value for 'name'
 *      mobileNumber: // value for 'mobileNumber'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      state: // value for 'state'
 *      district: // value for 'district'
 *   },
 * });
 */
export function useAddDistrictAdminMutation(baseOptions?: Apollo.MutationHookOptions<AddDistrictAdminMutationData, AddDistrictAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDistrictAdminMutationData, AddDistrictAdminMutationVariables>(AddDistrictAdminDocument, options);
      }
export type AddDistrictAdminMutationHookResult = ReturnType<typeof useAddDistrictAdminMutation>;
export type AddDistrictAdminMutationResult = Apollo.MutationResult<AddDistrictAdminMutationData>;
export type AddDistrictAdminMutationOptions = Apollo.BaseMutationOptions<AddDistrictAdminMutationData, AddDistrictAdminMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($name: String!, $description: String) {
  CreateCategory(name: $name, description: $description) {
    id
    name
    description
    created_at
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutationData, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutationData, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutationData, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutationData>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutationData, CreateCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($deleteCategoryId: ID!) {
  DeleteCategory(id: $deleteCategoryId) {
    created_at
    description
    id
    name
  }
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutationData, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      deleteCategoryId: // value for 'deleteCategoryId'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutationData, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutationData, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutationData>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutationData, DeleteCategoryMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($deleteUserId: ID!) {
  DeleteUser(id: $deleteUserId) {
    id
    email
    name
    mobile_number
    role
    state
    district
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutationData, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      deleteUserId: // value for 'deleteUserId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutationData, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutationData, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutationData>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutationData, DeleteUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  Login(email: $email, password: $password) {
    success
    message
    token
    id
    name
    email
    role
    mobile_number
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutationData, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutationData, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutationData, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutationData>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutationData, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($name: String!, $mobileNumber: String!, $role: String!, $state: String!, $district: String!, $email: String, $password: String) {
  register(
    name: $name
    mobile_number: $mobileNumber
    role: $role
    state: $state
    district: $district
    email: $email
    password: $password
  ) {
    message
    success
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutationData, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      mobileNumber: // value for 'mobileNumber'
 *      role: // value for 'role'
 *      state: // value for 'state'
 *      district: // value for 'district'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutationData, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutationData, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutationData>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutationData, RegisterMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($updateCategoryId: ID!, $name: String, $description: String) {
  UpdateCategory(id: $updateCategoryId, name: $name, description: $description) {
    id
    name
    description
    created_at
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutationData, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      updateCategoryId: // value for 'updateCategoryId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutationData, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutationData, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutationData>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutationData, UpdateCategoryMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserId: ID!, $name: String, $email: String, $mobileNumber: String, $role: String, $state: String, $district: String, $active: Boolean) {
  UpdateUser(
    id: $updateUserId
    name: $name
    email: $email
    mobile_number: $mobileNumber
    role: $role
    state: $state
    district: $district
    active: $active
  ) {
    id
    email
    name
    mobile_number
    role
    state
    district
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutationData, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserId: // value for 'updateUserId'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      mobileNumber: // value for 'mobileNumber'
 *      role: // value for 'role'
 *      state: // value for 'state'
 *      district: // value for 'district'
 *      active: // value for 'active'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutationData, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutationData, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutationData>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutationData, UpdateUserMutationVariables>;
export const GetalluserDocument = gql`
    query Getalluser($role: String) {
  getalluser(role: $role) {
    id
    email
    name
    mobile_number
    role
    state
    district
    active
  }
}
    `;

/**
 * __useGetalluserQuery__
 *
 * To run a query within a React component, call `useGetalluserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetalluserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetalluserQuery({
 *   variables: {
 *      role: // value for 'role'
 *   },
 * });
 */
export function useGetalluserQuery(baseOptions?: Apollo.QueryHookOptions<GetalluserQueryData, GetalluserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetalluserQueryData, GetalluserQueryVariables>(GetalluserDocument, options);
      }
export function useGetalluserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetalluserQueryData, GetalluserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetalluserQueryData, GetalluserQueryVariables>(GetalluserDocument, options);
        }
// @ts-ignore
export function useGetalluserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetalluserQueryData, GetalluserQueryVariables>): Apollo.UseSuspenseQueryResult<GetalluserQueryData, GetalluserQueryVariables>;
export function useGetalluserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetalluserQueryData, GetalluserQueryVariables>): Apollo.UseSuspenseQueryResult<GetalluserQueryData | undefined, GetalluserQueryVariables>;
export function useGetalluserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetalluserQueryData, GetalluserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetalluserQueryData, GetalluserQueryVariables>(GetalluserDocument, options);
        }
export type GetalluserQueryHookResult = ReturnType<typeof useGetalluserQuery>;
export type GetalluserLazyQueryHookResult = ReturnType<typeof useGetalluserLazyQuery>;
export type GetalluserSuspenseQueryHookResult = ReturnType<typeof useGetalluserSuspenseQuery>;
export type GetalluserQueryResult = Apollo.QueryResult<GetalluserQueryData, GetalluserQueryVariables>;
export const GetCategoryDocument = gql`
    query GetCategory {
  GetCategory {
    id
    name
    description
    created_at
  }
}
    `;

/**
 * __useGetCategoryQuery__
 *
 * To run a query within a React component, call `useGetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoryQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoryQueryData, GetCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryQueryData, GetCategoryQueryVariables>(GetCategoryDocument, options);
      }
export function useGetCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryQueryData, GetCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryQueryData, GetCategoryQueryVariables>(GetCategoryDocument, options);
        }
// @ts-ignore
export function useGetCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoryQueryData, GetCategoryQueryVariables>): Apollo.UseSuspenseQueryResult<GetCategoryQueryData, GetCategoryQueryVariables>;
export function useGetCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoryQueryData, GetCategoryQueryVariables>): Apollo.UseSuspenseQueryResult<GetCategoryQueryData | undefined, GetCategoryQueryVariables>;
export function useGetCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoryQueryData, GetCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoryQueryData, GetCategoryQueryVariables>(GetCategoryDocument, options);
        }
export type GetCategoryQueryHookResult = ReturnType<typeof useGetCategoryQuery>;
export type GetCategoryLazyQueryHookResult = ReturnType<typeof useGetCategoryLazyQuery>;
export type GetCategorySuspenseQueryHookResult = ReturnType<typeof useGetCategorySuspenseQuery>;
export type GetCategoryQueryResult = Apollo.QueryResult<GetCategoryQueryData, GetCategoryQueryVariables>;
export const GetDashboardStatsDocument = gql`
    query GetDashboardStats($district: String) {
  getDashboardStats(district: $district) {
    totalGrievances
    submitted
    assigned
    inProgress
    escalated
    resolved
    rejected
    closed
    totalCitizens
    totalOfficers
    totalStaff
    averageOfficerRating
  }
}
    `;

/**
 * __useGetDashboardStatsQuery__
 *
 * To run a query within a React component, call `useGetDashboardStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardStatsQuery({
 *   variables: {
 *      district: // value for 'district'
 *   },
 * });
 */
export function useGetDashboardStatsQuery(baseOptions?: Apollo.QueryHookOptions<GetDashboardStatsQueryData, GetDashboardStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDashboardStatsQueryData, GetDashboardStatsQueryVariables>(GetDashboardStatsDocument, options);
      }
export function useGetDashboardStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDashboardStatsQueryData, GetDashboardStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDashboardStatsQueryData, GetDashboardStatsQueryVariables>(GetDashboardStatsDocument, options);
        }
// @ts-ignore
export function useGetDashboardStatsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDashboardStatsQueryData, GetDashboardStatsQueryVariables>): Apollo.UseSuspenseQueryResult<GetDashboardStatsQueryData, GetDashboardStatsQueryVariables>;
export function useGetDashboardStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDashboardStatsQueryData, GetDashboardStatsQueryVariables>): Apollo.UseSuspenseQueryResult<GetDashboardStatsQueryData | undefined, GetDashboardStatsQueryVariables>;
export function useGetDashboardStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDashboardStatsQueryData, GetDashboardStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDashboardStatsQueryData, GetDashboardStatsQueryVariables>(GetDashboardStatsDocument, options);
        }
export type GetDashboardStatsQueryHookResult = ReturnType<typeof useGetDashboardStatsQuery>;
export type GetDashboardStatsLazyQueryHookResult = ReturnType<typeof useGetDashboardStatsLazyQuery>;
export type GetDashboardStatsSuspenseQueryHookResult = ReturnType<typeof useGetDashboardStatsSuspenseQuery>;
export type GetDashboardStatsQueryResult = Apollo.QueryResult<GetDashboardStatsQueryData, GetDashboardStatsQueryVariables>;
export const GetDistrictsDocument = gql`
    query GetDistricts($stateCode: String) {
  getDistricts(state_code: $stateCode) {
    district_code
    district_name
    state_code
  }
}
    `;

/**
 * __useGetDistrictsQuery__
 *
 * To run a query within a React component, call `useGetDistrictsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDistrictsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDistrictsQuery({
 *   variables: {
 *      stateCode: // value for 'stateCode'
 *   },
 * });
 */
export function useGetDistrictsQuery(baseOptions?: Apollo.QueryHookOptions<GetDistrictsQueryData, GetDistrictsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDistrictsQueryData, GetDistrictsQueryVariables>(GetDistrictsDocument, options);
      }
export function useGetDistrictsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDistrictsQueryData, GetDistrictsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDistrictsQueryData, GetDistrictsQueryVariables>(GetDistrictsDocument, options);
        }
// @ts-ignore
export function useGetDistrictsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDistrictsQueryData, GetDistrictsQueryVariables>): Apollo.UseSuspenseQueryResult<GetDistrictsQueryData, GetDistrictsQueryVariables>;
export function useGetDistrictsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDistrictsQueryData, GetDistrictsQueryVariables>): Apollo.UseSuspenseQueryResult<GetDistrictsQueryData | undefined, GetDistrictsQueryVariables>;
export function useGetDistrictsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDistrictsQueryData, GetDistrictsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDistrictsQueryData, GetDistrictsQueryVariables>(GetDistrictsDocument, options);
        }
export type GetDistrictsQueryHookResult = ReturnType<typeof useGetDistrictsQuery>;
export type GetDistrictsLazyQueryHookResult = ReturnType<typeof useGetDistrictsLazyQuery>;
export type GetDistrictsSuspenseQueryHookResult = ReturnType<typeof useGetDistrictsSuspenseQuery>;
export type GetDistrictsQueryResult = Apollo.QueryResult<GetDistrictsQueryData, GetDistrictsQueryVariables>;
export const GetGrievanceDocument = gql`
    query GetGrievance {
  GetGrievance {
    id
    grievance_id
    title
    description
    category
    stateId
    districtId
    status
    image_data
    user_id
    assignedTo
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetGrievanceQuery__
 *
 * To run a query within a React component, call `useGetGrievanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGrievanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGrievanceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGrievanceQuery(baseOptions?: Apollo.QueryHookOptions<GetGrievanceQueryData, GetGrievanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGrievanceQueryData, GetGrievanceQueryVariables>(GetGrievanceDocument, options);
      }
export function useGetGrievanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGrievanceQueryData, GetGrievanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGrievanceQueryData, GetGrievanceQueryVariables>(GetGrievanceDocument, options);
        }
// @ts-ignore
export function useGetGrievanceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetGrievanceQueryData, GetGrievanceQueryVariables>): Apollo.UseSuspenseQueryResult<GetGrievanceQueryData, GetGrievanceQueryVariables>;
export function useGetGrievanceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGrievanceQueryData, GetGrievanceQueryVariables>): Apollo.UseSuspenseQueryResult<GetGrievanceQueryData | undefined, GetGrievanceQueryVariables>;
export function useGetGrievanceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGrievanceQueryData, GetGrievanceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGrievanceQueryData, GetGrievanceQueryVariables>(GetGrievanceDocument, options);
        }
export type GetGrievanceQueryHookResult = ReturnType<typeof useGetGrievanceQuery>;
export type GetGrievanceLazyQueryHookResult = ReturnType<typeof useGetGrievanceLazyQuery>;
export type GetGrievanceSuspenseQueryHookResult = ReturnType<typeof useGetGrievanceSuspenseQuery>;
export type GetGrievanceQueryResult = Apollo.QueryResult<GetGrievanceQueryData, GetGrievanceQueryVariables>;
export const GetStatesDocument = gql`
    query GetStates {
  getStates {
    state_code
    state_name
  }
}
    `;

/**
 * __useGetStatesQuery__
 *
 * To run a query within a React component, call `useGetStatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStatesQuery(baseOptions?: Apollo.QueryHookOptions<GetStatesQueryData, GetStatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStatesQueryData, GetStatesQueryVariables>(GetStatesDocument, options);
      }
export function useGetStatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatesQueryData, GetStatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStatesQueryData, GetStatesQueryVariables>(GetStatesDocument, options);
        }
// @ts-ignore
export function useGetStatesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetStatesQueryData, GetStatesQueryVariables>): Apollo.UseSuspenseQueryResult<GetStatesQueryData, GetStatesQueryVariables>;
export function useGetStatesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStatesQueryData, GetStatesQueryVariables>): Apollo.UseSuspenseQueryResult<GetStatesQueryData | undefined, GetStatesQueryVariables>;
export function useGetStatesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStatesQueryData, GetStatesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetStatesQueryData, GetStatesQueryVariables>(GetStatesDocument, options);
        }
export type GetStatesQueryHookResult = ReturnType<typeof useGetStatesQuery>;
export type GetStatesLazyQueryHookResult = ReturnType<typeof useGetStatesLazyQuery>;
export type GetStatesSuspenseQueryHookResult = ReturnType<typeof useGetStatesSuspenseQuery>;
export type GetStatesQueryResult = Apollo.QueryResult<GetStatesQueryData, GetStatesQueryVariables>;
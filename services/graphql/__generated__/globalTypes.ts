export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  Login: WebLoginResponse;
  addDistrictAdmin: RegisterResponse;
  registerStaff: RegisterResponse;
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


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationAddDistrictAdminArgs = {
  district: Scalars['String']['input'];
  email: Scalars['String']['input'];
  mobile_number: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  state: Scalars['String']['input'];
};


export type MutationRegisterStaffArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  mobile_number: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  role: Scalars['String']['input'];
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
  getDistricts?: Maybe<Array<Maybe<District>>>;
  getStates?: Maybe<Array<Maybe<State>>>;
  getalluser?: Maybe<Array<Maybe<User>>>;
  me?: Maybe<User>;
};


export type QueryGetDistrictsArgs = {
  state_code?: InputMaybe<Scalars['String']['input']>;
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

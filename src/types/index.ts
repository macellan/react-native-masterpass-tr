import type { ReactNode } from 'react';

/* MasterPass Context Provider Interface */
export interface IMasterPassProvider {
  children: ReactNode;
  config: IConfig;
}

/* MasterPasss Config Interface */
export interface IConfig {
  token: string;
  serviceUrl: string;
  clientId: string;
  userId: string;
  sendSmsLanguage: string;
  sendSms: string;
  referenceNo: string;
  clientIp: string;
  sdkUrl: string;
}

export interface ICardData {
  accountAliasName: string;
  rtaPan: string;
  expiryDate: string;
  cvc: string;

  msisdn?: string;
  token?: string;
  referenceNo?: string;
  sendSmsLanguage?: string;
  sendSms?: string;
  actionType?: string;
  clientIp?: string;
  delinkReason?: string;
  eActionType?: string;
  cardTypeFlag?: string;
  cpinFlag?: string;
  defaultAccount?: string;
  mmrpConfig?: string;
  identityVerificationFlag?: string;
  mobileAccountConfig?: string;
  timeZone?: string;
  uiChannelType?: string;
}

export interface IOtpData {
  validationCode: string;

  referenceNo?: string;
  sendSmsLanguage?: string;
  sendSms?: string;
  pinType?: string;
}

export interface IDeleteCardData {
  accountAliasName: string;
}

export interface IPurchaseData {
  amount: number | string;
  listAccountName: string;
  orderNo: string;
  referenceNo?: string;
  paymentType?: string;
}

export interface IMasterPassTurkeyRefs {
  registrationCheck: () => Promise<any>;
  linkCardToClient: () => Promise<any>;
  listCards: () => Promise<any>;
  register: (cardData: ICardData) => Promise<any>;
  otpVerify: (otpData: IOtpData) => Promise<any>;
  mpinVerify: (mpinData: IOtpData) => Promise<any>;
  resendOtp: () => Promise<any>;
  deleteCard: (cardDeleteData: IDeleteCardData) => Promise<any>;
  purchase: (purchaseData: IPurchaseData) => Promise<any>;
}

export interface IMasterPassTurkeyProps {
  visible?: boolean;
  injectTimeout?: number;
}

import { service } from '../services';
import type { IConfig } from '../types/index';

export const HtmlForm = (config: IConfig) => {
  const { userId, token, referenceNo, sendSmsLanguage, sendSms, sdkUrl } =
    config;

  return `<html>
    <head>
      <title>Register Check Form</title>
      <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
      <meta content="utf-8" http-equiv="encoding">
    </head>
    <body>

      <form action="" method="POST" id="checkMP-form" style="display: none">
        <input type="hidden" name="userId" value="${userId}" />
        <input type="hidden" name="token" value="${token}" />
        <input type="hidden" name="referenceNo" value="${referenceNo}" />
        <input type="hidden" name="sendSmsLanguage" value="${sendSmsLanguage}" />
        <input type="hidden" name="sendSms" value="${sendSms}" /> 
      </form>

      <form action="" method="POST" id="register-form" style="display: none">
        <!-- MFS Register User Form -->
        <input type="hidden" name="accountAliasName" />
        <input type="hidden" name="rtaPan" />
        <input type="hidden" name="expiryDate" />
        <input type="hidden" name="cvc" />

        <!-- MFS Register Global Form -->
        <input type="hidden" name="msisdn" value="${userId}" />
				<input type="hidden" name="token" value="${token}" />
				<input type="hidden" name="referenceNo" value="${referenceNo}" />
				<input type="hidden" name="sendSmsLanguage" value="${sendSmsLanguage}" />

        <input type="hidden" name="sendSms" value="${sendSms}" />
        <input type="hidden" name="actionType" value="A" />
        <input type="hidden" name="clientIp" value="" />
        <input type="hidden" name="delinkReason" value="" />
        <input type="hidden" name="eActionType" value="A" />
        <input type="hidden" name="cardTypeFlag" value="05" />
        <input type="hidden" name="cpinFlag" value="Y" />
 
        <input type="hidden" name="defaultAccount" value="Y" />
        <input type="hidden" name="mmrpConfig" value="110010" />
        <input type="hidden" name="identityVerificationFlag" value="Y" />
        <input type="hidden" name="mobileAccountConfig" value="MWA" />
        <input type="hidden" name="timeZone" value="+01" />
        <input type="hidden" name="uiChannelType" value="6" />
      </form>

      <form action="" method="POST" id="link-form" style="display:none;">
        <input type="hidden" name="msisdn" value="${userId}" />
        <input type="hidden" name="token" value="${token}" />
        <input type="hidden" name="referenceNo" value="${referenceNo}" />
        <input type="hidden" name="sendSmsLanguage" value="${sendSmsLanguage}" />
        <input type="hidden" name="sendSms" value="${sendSms}" />
      </form>

      <form action="" method="POST" id="otp-form" style="display: none">
        <input type="hidden" name="validationCode" />
        
        <input type="hidden" name="referenceNo" value="${referenceNo}" />
        <input type="hidden" name="sendSms" value="${sendSms}" />
        <input type="hidden" name="sendSmsLanguage" value="${sendSmsLanguage}" />
        <input type="hidden" name="pinType" value="otp" />
      </form>

      <form action="" method="POST" id="mpin-form" style="display: none">
        <input type="hidden" name="validationCode" />
        
        <input type="hidden" name="referenceNo" value="${referenceNo}" />
        <input type="hidden" name="sendSms" value="${sendSms}" />
        <input type="hidden" name="sendSmsLanguage" value="${sendSmsLanguage}" />
        <input type="hidden" name="pinType" value="mpin" />
      </form>

      <form action="" method="POST" id="delete-form" style="display: none">
        <input type="hidden" name="accountAliasName" />

        <input type="hidden" name="msisdn" value="${userId}" />
        <input type="hidden" name="token" value="${token}" />
        <input type="hidden" name="referenceNo" value="${referenceNo}" />
        <input type="hidden" name="sendSmsLanguage" value="${sendSmsLanguage}" />
        <input type="hidden" name="sendSms" value="${sendSms}" />
      </form>

      <form action="" method="POST" id="purchase-form" class="form-horizontal" style="display:none">
        <input type="hidden" name="amount" />

        <!-- MFS purchase parameters start -->
        <input type="hidden" name="listAccountName" />
        <input type="hidden" name="msisdn" value="${userId}" />
        <input type="hidden" name="token" value="${token}" />
        <input type="hidden" name="referenceNo" value="${referenceNo}" />
        <input type="hidden" name="sendSmsLanguage" value="${sendSmsLanguage}" />
        <input type="hidden" name="macroMerchantId" value="" />
        <input type="hidden" name="orderNo" value="" />
        <input type="hidden" name="paymentType" value="" />

        <input type="hidden" name="installmentCount" value="" /> (Optional)
        <input type="hidden" name="rewardName" value="" /> (Optional)
        <input type="hidden" name="rewardValue" value="" /> (Optional)
        <input type="hidden" name="cvc" value="" /> (Optional)
          <!-- MFS purchase operation parameters end -->
          
          <!-- MFS constant parameters start -->
        <input type="hidden" name="sendSms" value="N" />
        <input type="hidden" name="aav" value="aav" />
        <input type="hidden" name="clientIp" value="" />
        <input type="hidden" name="encCPin" value="0" />
        <input type="hidden" name="encPassword" value="" />
        <input type="hidden" name="sendSmsMerchant" value="Y" />
        <input type="hidden" name="password" value="" />
          <!-- MFS constant parameters end -->
      </form>

      <script src="https://code.jquery.com/jquery-3.6.0.min.js"
              integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
              crossorigin="anonymous">
      </script>
      <script>${service(config)}</script>
      <script src="${sdkUrl}"></script>
    </body>
  </html>
`;
};

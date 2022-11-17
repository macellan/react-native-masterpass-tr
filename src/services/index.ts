import type { IConfig } from '../types/index';

export const service = ({
  clientId,
  serviceUrl,
  userId,
  token,
  sendSmsLanguage,
}: IConfig) => {
  return `

    function returnResponse(responseObject) {
      window.ReactNativeWebView.postMessage(JSON.stringify(responseObject));
    }

    function formSetter(obj, formId) {
      const formItems = Object.keys(obj);

      formItems.forEach(name => {
        $(formId + " " + "input[name='" + name + "']").val(obj[name]); 
      });
    }

    function registrationCheck() {
      MFS.setClientId("${clientId}");
      MFS.setAddress('${serviceUrl}');

      MFS.checkMasterPass($("#checkMP-form"), function(status, response) {
        returnResponse({
          action: "registration-check",
          response: response,
        });
      });
    }

    function linkCardToClient() {
      MFS.setClientId("${clientId}");
      MFS.setAddress('${serviceUrl}');

      MFS.linkCardToClient($("#link-form"), function(status, response) {
        returnResponse({
          action: "link-card-to-client",
          response: response,
        });
      });
    }

    function register(formObject) {
      MFS.setClientId("${clientId}");
      MFS.setAddress('${serviceUrl}');

      formSetter(formObject, "#register-form");

      MFS.register($("#register-form"), function(status, response) {
        returnResponse({
          action: "register",
          response: response,
        });
      });
    }

    function otpVerify(formObject) {
      formSetter(formObject, "#otp-form");

      MFS.validateTransaction($("#otp-form"), function(status, response) {
        returnResponse({
          action: "otp-verify",
          response: response,
        });
      })
    }

    function mpinVerify(formObject) {
      formSetter(formObject, "#mpin-form");

      MFS.validateTransaction($("#mpin-form"), function(status, response) {
        returnResponse({
          action: "mpin-verify",
          response: response,
        });
      })
    }

    function resendOtp() {
      const lastToken = MFS.getLastToken();

      MFS.resendOtp(lastToken, '${sendSmsLanguage}', function(status, response) {
        returnResponse({
          action: "resend-otp",
          response: response,
        });
      });
    }

    function listCards() {
      MFS.setClientId("${clientId}");
      MFS.setAddress('${serviceUrl}');

      MFS.listCards('${userId}', '${token}', function(status, response) {
        returnResponse({
          action: "list-cards",
          response: response,
        });
      });
    }

    function deleteCard(formObject) {
      MFS.setClientId("${clientId}");
      MFS.setAddress('${serviceUrl}');

      formSetter(formObject, "#delete-form");

      MFS.deleteCard($("#delete-form"), function(status, response) {
        returnResponse({
          action: "delete-card",
          response: response,
        });
      });
    }

    function purchase(formObject) {
      MFS.setClientId("${clientId}");
      MFS.setAddress('${serviceUrl}');

      const otherFormObject = {};

      Object.keys(formObject).forEach(key => {
        if (key !== 'additionalData') {
          otherFormObject[key] = formObject[key];
        }
      });
        
      if (formObject?.additionalData) {
        MFS.setAdditionalParameters(formObject.additionalData);
      }

      formSetter(otherFormObject, "#purchase-form");

      MFS.purchase($("#purchase-form"), function(status, response) {
        returnResponse({
          action: "purchase",
          response: response,
        });
      });
    }
  `;
};

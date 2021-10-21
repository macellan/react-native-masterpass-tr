import * as React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { EventRegister } from 'react-native-event-listeners';

import { useMasterPass } from '../context';
import { HtmlForm } from '../forms';
import type { IMasterPassTurkeyRefs, ICardData } from '../types/index';

export const MasterPassTurkey = React.forwardRef<IMasterPassTurkeyRefs>(
  (_, ref) => {
    const config = useMasterPass();

    const webView = React.useRef<any>(null);

    /* MasterPass Account Registration Check Action */
    const handleRegistrationCheck = React.useCallback(() => {
      webView.current?.injectJavaScript('registrationCheck()');

      return new Promise((resolve, reject) => {
        EventRegister.addEventListener(
          'registration-check',
          (response: any) => {
            if (
              response.responseCode === '0000' ||
              response.responseCode === ''
            ) {
              if (response.accountStatus.substring(0, 6) === '000000') {
                /* MasterPass hesabı bulunmayan kullanıcı */
                return resolve({
                  accountType: 0,
                  response: response,
                });
              }
              if (response.accountStatus.substring(1, 6) === '11000') {
                /* MasterPass hesabı bulunan fakat eşleşmemiş kullanıcı */
                return resolve({
                  accountType: 1,
                  response: response,
                });
              }

              if (response.accountStatus.substring(1, 6) === '11100') {
                /* MasterPass hesabı bulunan ve eşleşmiş kullanıcı */
                return resolve({
                  accountType: 2,
                  response: response,
                });
              }
            }

            return reject({
              message: response?.responseDescription,
              response: response,
              responseCode: response?.responseCode,
            });
          }
        );
      });
    }, []);

    /* MasterPass List Card Action */
    const handleListCards = React.useCallback(() => {
      webView.current?.injectJavaScript('listCards()');

      return new Promise((resolve, reject) => {
        EventRegister.addEventListener('list-cards', (response: any) => {
          if (
            response.responseCode !== '0000' &&
            response.responseCode !== ''
          ) {
            return reject({
              message: response?.responseDescription,
              response: response,
              responseCode: response?.responseCode,
            });
          }

          return resolve({
            cards: response.cards,
            response: response,
          });
        });
      });
    }, []);

    /* MasterPass Response Handler Action */
    const mfsResponseHandler = React.useCallback(
      (response: any, resolve: any, reject: any) => {
        if (response.responseCode === '0000' || response.responseCode === '') {
          /* İşlem Başarıyla Sonuçlandı. */
          return resolve({
            responseType: 0,
            response: response,
          });
        }

        if (response.responseCode === '5001') {
          /* OTP doğrulaması gerekiyor. */
          return resolve({
            responseType: 5001,
            response: response,
          });
        }

        if (response.responseCode === '5002') {
          /* MPIN doğrulaması gerekiyor. */
          return resolve({
            responseType: 5002,
            response: response,
          });
        }

        if (response.responseCode === '5008') {
          /* Cihaz doğrulaması için MasterPass OTP gerekiyor. */
          return resolve({
            responseType: 5008,
            response: response,
          });
        }

        if (response.responseCode === '5010') {
          /* 3D Secure OTP gerekiyor. */
          return resolve({
            responseType: 5010,
            response: response,
          });
        }

        if (response.responseCode === '5015') {
          /* PIN belirlenmesi gerekiyor. */
          return resolve({
            responseType: 5015,
            response: response,
          });
        }

        return reject({
          message: response?.responseDescription,
          response: response,
          responseCode: response?.responseCode,
        });
      },
      []
    );

    /* MasterPass Link Card To Client Action */
    const handleLinkCardToClient = React.useCallback(() => {
      webView.current?.injectJavaScript('linkCardToClient()');

      return new Promise((resolve, reject) => {
        EventRegister.addEventListener(
          'link-card-to-client',
          (response: any) => {
            mfsResponseHandler(response, resolve, reject);
          }
        );
      });
    }, [mfsResponseHandler]);

    /* MasterPass Card Register Action */
    const handleRegister = React.useCallback(
      (cardData: ICardData) => {
        const formData = JSON.stringify(cardData);
        webView.current?.injectJavaScript(`register(${formData})`);

        return new Promise((resolve, reject) => {
          EventRegister.addEventListener('register', (response: any) => {
            mfsResponseHandler(response, resolve, reject);
          });
        });
      },
      [mfsResponseHandler]
    );

    /* MasterPass Verify OTP Action */
    const handleOtpVerify = React.useCallback(
      (otpData: any) => {
        const formData = JSON.stringify(otpData);
        webView.current?.injectJavaScript(`otpVerify(${formData})`);

        return new Promise((resolve, reject) => {
          EventRegister.addEventListener('otp-verify', (response: any) => {
            mfsResponseHandler(response, resolve, reject);
          });
        });
      },
      [mfsResponseHandler]
    );

    /* MasterPass Verify OTP Action */
    const handleMpinVerify = React.useCallback(
      (otpData: any) => {
        const formData = JSON.stringify(otpData);
        webView.current?.injectJavaScript(`mpinVerify(${formData})`);

        return new Promise((resolve, reject) => {
          EventRegister.addEventListener('mpin-verify', (response: any) => {
            mfsResponseHandler(response, resolve, reject);
          });
        });
      },
      [mfsResponseHandler]
    );

    /* MasterPass Resend OTP Action */
    const handleResendOtp = React.useCallback(() => {
      webView.current?.injectJavaScript('resendOtp()');

      return new Promise((resolve, reject) => {
        EventRegister.addEventListener('resend-otp', (response: any) => {
          mfsResponseHandler(response, resolve, reject);
        });
      });
    }, [mfsResponseHandler]);

    /* MasterPass Card Delete Action */
    const handleDeleteCard = React.useCallback((cardDeleteData: any) => {
      const formData = JSON.stringify(cardDeleteData);
      webView.current?.injectJavaScript(`deleteCard(${formData})`);

      return new Promise((resolve, reject) => {
        EventRegister.addEventListener('delete-card', (response: any) => {
          if (
            response.responseCode === '0000' ||
            response.responseCode === ''
          ) {
            return resolve({
              response: response,
            });
          }

          return reject({
            message: response?.responseDescription,
            response: response,
            responseCode: response?.responseCode,
          });
        });
      });
    }, []);

    const handlePurchase = React.useCallback(
      (purchaseData: any) => {
        const formData = JSON.stringify(purchaseData);
        webView.current?.injectJavaScript(`purchase(${formData})`);

        return new Promise((resolve, reject) => {
          EventRegister.addEventListener('purchase', (response: any) => {
            mfsResponseHandler(response, resolve, reject);
          });
        });
      },
      [mfsResponseHandler]
    );

    React.useImperativeHandle(ref, () => {
      return {
        registrationCheck: handleRegistrationCheck,
        listCards: handleListCards,
        register: handleRegister,
        otpVerify: handleOtpVerify,
        mpinVerify: handleMpinVerify,
        resendOtp: handleResendOtp,
        deleteCard: handleDeleteCard,
        linkCardToClient: handleLinkCardToClient,
        purchase: handlePurchase,
      };
    });

    return (
      <WebView
        ref={webView}
        source={{ html: HtmlForm(config) }}
        containerStyle={styles.webView}
        javaScriptEnabled={true}
        onMessage={(event: any) => {
          if (event.nativeEvent.data) {
            const result = JSON.parse(event.nativeEvent.data);
            EventRegister.emit(result.action, result.response);
          }
        }}
      />
    );
  }
);

const styles = StyleSheet.create({
  webView: {
    display: 'none',
  },
});

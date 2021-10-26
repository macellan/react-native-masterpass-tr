import * as React from 'react';
import {
  MasterPassProvider,
  MasterPassTurkey,
  IConfig,
  IMasterPassTurkeyRefs,
} from '@macellan/react-native-masterpass-tr';
import { Alert } from 'react-native';

const config: IConfig = {
  token: '',
  serviceUrl: '',
  clientId: '',
  userId: '',
  sendSmsLanguage: '',
  sendSms: '',
  referenceNo: '',
  clientIp: '',
  sdkUrl: '',
};

const App: React.FC = () => {
  return (
    <MasterPassProvider config={config}>
      <Component />
    </MasterPassProvider>
  );
};

export default App;

const Component: React.FC = () => {
  const masterpass = React.useRef<IMasterPassTurkeyRefs>(null);

  const handleCheck = React.useCallback(() => {
    masterpass.current
      ?.registrationCheck()
      .then((result) => {
        Alert.alert(JSON.stringify(result));
      })
      .catch((error) => Alert.alert(error.message));
  }, []);

  React.useEffect(() => {
    handleCheck();
  }, [handleCheck]);

  return <MasterPassTurkey ref={masterpass} />;
};

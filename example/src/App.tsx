import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MasterPassProvider } from 'react-native-masterpass-tr';
import type { IConfig } from 'lib/typescript';

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
      <View style={styles.container}>
        <Text>React Native Masterpass TR</Text>
      </View>
    </MasterPassProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

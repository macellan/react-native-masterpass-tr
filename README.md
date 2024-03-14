#  🚧 Deprecation Notice 🚧
This package is deperecated, you can use [Masterpass SDK](https://github.com/macellan/masterpass-sdk).

# React Native Masterpass TR

Masterpass Turkey Package for React Native

## Installation

```sh
npm install @macellan/react-native-masterpass-tr --save
```

or

```sh
yarn add @macellan/react-native-masterpass-tr
```

## Install Dependencies

Please, install dependencies for using this package.

```sh
yarn add react-native-webview react-native-event-listeners
```

- [React Native WebView Installation](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md)
- [React Native Event Listener Installation](https://github.com/meinto/react-native-event-listeners#readme)

## Usage

Wrap your parent component in Provider from react-native-masterpass-tr.

```tsx
import * as React from 'react';
import { MasterPassProvider, IConfig } from 'react-native-masterpass-tr';

const ParentComponent: React.FC = () => {

  /* MasterPass Config Object */
  const config: IConfig = {
    token: '',
    serviceUrl: '',
    clientId: '',
    userId: '',
    sendSmsLanguage: '',
    sendSms: '',
    referenceNo: '',
    clientIp: '',
  };

  return (
    <MasterPassProvider config={config}>
      <ChildComponent />
      {/* Other Child Components */}
    </MasterPassProvider>;
  );
}

export default ParentComponent;

```

Add MasterPassTurkey to the component you want to use.

```tsx
import * as React from 'react';
import {
  MasterPassTurkey,
  IMasterPassTurkeyRefs,
} from 'react-native-masterpass-tr';

const ChildComponent: React.FC = () => {
  const masterpass = React.useRef<IMasterPassTurkeyRefs>(null);

  const onRegistrationCheck = React.useCallback(() => {
    masterpass.current
      ?.registrationCheck()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <MasterPassTurkey ref={ref} />;
};

export default ChildComponent;
```

## License

MIT

## Credits

Made with ❤️ at [Macellan](https://macellan.net) by [@nrzky](https://github.com/nrzky)

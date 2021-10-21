import * as React from 'react';

import type { IMasterPassProvider, IConfig } from '../types/index';

/* MasterPass Context */
const MasterPassContext = React.createContext<IConfig>({
  token: '',
  serviceUrl: '',
  clientId: '',
  userId: '',
  sendSms: 'N',
  sendSmsLanguage: '',
  referenceNo: '',
  clientIp: '',
  sdkUrl: '',
});

/* MasterPass Context Provider */
export const MasterPassProvider: React.FC<IMasterPassProvider> = ({
  children,
  config,
}) => {
  return (
    <MasterPassContext.Provider value={config}>
      {children}
    </MasterPassContext.Provider>
  );
};

/* MasterPass config bilgisine erişimi sağlayan custom hook */
export const useMasterPass = () => React.useContext(MasterPassContext);

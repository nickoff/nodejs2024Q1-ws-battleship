import {startWsServer} from './ws/ws.ts';

export const startBackendServer = (): void => {
  startWsServer();
};

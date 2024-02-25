import {type WebSocket as WSWebSocket} from 'ws';

export const wsClients = new Map<string, WSWebSocket>();

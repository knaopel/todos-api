import { setupWorker } from 'msw';
import { handlers } from './handlers';

// this configures a Service Worker with the given handlers
export const worker = setupWorker(...handlers);
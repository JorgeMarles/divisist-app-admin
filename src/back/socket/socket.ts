import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_REACT_APP_BACKEND_URL ?? 'http://localhost:3000';

export const socket = io(URL);
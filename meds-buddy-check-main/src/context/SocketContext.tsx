import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const s = io('http://localhost:3001', { transports: ['websocket'] });
    s.on('connect', () => console.log('✅ socket connected'));
    setSocket(s);
    return () => s.disconnect();
  }, []);
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

import { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Notification) => {
    setNotifications([...notifications, notification]);
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const value = { notifications, addNotification, removeNotification };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { NotificationProvider, useNotification };

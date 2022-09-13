import { toast } from 'react-toastify';

export enum NotificationName {
  PasswordNotMatch = 'PasswordNotMatch',
  CompleteFields = 'CompleteFields',
  EnterCurrentEmail = 'EnterCurrentEmail',
  CheckEmail = 'CheckEmail',
  EmailConfirmed = 'EmailConfirmed',
  FillVerificationCode = 'FillVerificationCode',

  NotSupportNetwork = 'NotSupportNetwork',
  AccountChanged = 'AccountChanged',
  InstallMetamask = 'InstallMetamask',

  TelegramConnected = 'TelegramConnected',
}

type ToastOptions = {
  type: 'info' | 'success' | 'error'
  message: string
};

const notificationsContent: Record<NotificationName, ToastOptions> = {
  [NotificationName.PasswordNotMatch]: { type: 'info', message: 'Passwords do not match' },
  [NotificationName.CompleteFields]: { type: 'info', message: 'Please complete the fields' },
  [NotificationName.EnterCurrentEmail]: { type: 'info', message: 'Please enter the correct email' },
  [NotificationName.FillVerificationCode]: { type: 'info', message: 'Please fill verification code' },
  [NotificationName.CheckEmail]: { type: 'success', message: 'Please check your email' },
  [NotificationName.EmailConfirmed]: { type: 'success', message: 'Email confirmed' },

  [NotificationName.NotSupportNetwork]: { type: 'error', message: 'The app is not supported on this network' },
  [NotificationName.AccountChanged]: { type: 'success', message: 'Your account succesfully changed' },
  [NotificationName.InstallMetamask]: { type: 'error', message: 'Please install the MetaMask extension' },

  [NotificationName.TelegramConnected]: { type: 'success', message: 'Telegram connected' },
};

export const showNotificationMessage = (notificationName: NotificationName) => {
  const { message, type } = notificationsContent[notificationName];
  toast[type](message);
};

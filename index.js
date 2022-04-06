/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';

const displayNotificationIOS = async () => {
  await notifee.displayNotification({
    title: 'Your account requires attention',
    body: 'You are overdue payment on one or more of your accounts!',
    ios: {
      foregroundPresentationOptions: {
        alert: true,
        badge: true,
        sound: true,
      },
    },
  });
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);

  displayNotificationIOS();
});

AppRegistry.registerComponent(appName, () => App);

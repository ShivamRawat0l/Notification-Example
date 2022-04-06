import React, {useEffect, useState} from 'react';
import {SafeAreaView, Button, Platform, Alert, TextInput} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {AuthorizationStatus} from '@notifee/react-native';

const displayNotification = async () => {
  const channelId = await notifee.createChannel({
    id: 'important',
    name: 'Important Notifications',
    importance: AndroidImportance.HIGH,
  });
  notifee.displayNotification({
    title:
      '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
    subtitle: '&#129395;',
    body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
    android: {
      channelId,
      color: '#4caf50',
      actions: [
        {
          title: '<b>Dance</b> &#128111;',
          pressAction: {id: 'dance'},
        },
        {
          title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
          pressAction: {id: 'cry'},
        },
      ],
    },
  });
};

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

const App = () => {
  const [value, setValue] = useState('new');
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('Permission settings:', settings);
    } else {
      console.log('User declined permissions');
    }
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const checkToken = async () => {
    await messaging().registerDeviceForRemoteMessages();

    const fcmToken = await messaging().getToken();
    console.log('FCM', fcmToken);
    setValue(fcmToken);
    Alert.alert(fcmToken);
  };
  useEffect(() => {
    checkToken();
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    requestUserPermission();

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    messaging().onMessage(async remoteMessage => {
      console.log('Message handled in the foregourp!', remoteMessage);
      displayNotification();
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  });

  return (
    <SafeAreaView>
      <Button
        title="HELLO"
        onPress={async () => {
          if (Platform.OS === 'android') {
            displayNotification();
          } else {
            displayNotificationIOS();
          }
        }}
      />
      <TextInput value={value} />
    </SafeAreaView>
  );
};

export default App;

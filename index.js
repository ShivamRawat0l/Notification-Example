/**
 * @format
 */
import React from 'react';
import {AppRegistry, Platform, Text, View} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidCategory,
  AndroidImportance,
  AndroidStyle,
} from '@notifee/react-native';

const displayNotification = async () => {
  const channelId = await notifee.createChannel({
    id: 'important',
    name: 'Important Notifications',
    importance: AndroidImportance.HIGH,
    badge: true,
  });
  notifee.displayNotification({
    title:
      '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
    subtitle: '&#129395;',
    body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
    android: {
      channelId,
      timestamp: Date.now() - 480000, // 8 minutes ago
      progress: {
        max: 10,
        current: 5,
        indeterminate: true,
      },
      color: '#4caf50',
      style: {
        type: AndroidStyle.INBOX,
        lines: [
          'First Message',
          'Second Message',
          'Third Message',
          'Forth Message',
        ],
      },
      actions: [
        {
          title: 'Reply',
          pressAction: {id: 'reply'},
          input: {
            editableChoices: true,
            allowFreeFormInput: true, // set to false
            choices: ['Yes', 'No', 'Maybe'],
            placeholder: 'Reply to Sarah...',
          },
        },
        {
          title: '<b>Dance</b> &#128111;',
          pressAction: {id: 'dance'},
          input: true, // enable free text input
        },
        {
          title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
          pressAction: {id: 'cry', mainComponent: 'custom-component'},
        },
      ],
    },
  });
};

const fullNotification = async () => {
  const channelId = await notifee.createChannel({
    id: 'important1',
    name: 'Important Notifications2',
    importance: AndroidImportance.HIGH,
    badge: true,
  });
  notifee.displayNotification({
    body: 'Full-screen notification',
    android: {
      channelId,
      // Recommended to set a category
      category: AndroidCategory.SOCIAL,
      // Recommended to set importance to high
      importance: AndroidImportance.HIGH,
      fullScreenAction: {
        id: 'default',
        mainComponent: 'custom-component',
      },
    },
  });
};
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  if (Platform.OS === 'android') {
    fullNotification();
  }
});

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    return null;
  }
  return <App />;
}
function CustomComponent() {
  return (
    <View
      style={{
        backgroundColor: 'red',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>A custom component</Text>
    </View>
  );
}
AppRegistry.registerComponent('custom-component', () => CustomComponent);

AppRegistry.registerComponent(appName, () => HeadlessCheck);

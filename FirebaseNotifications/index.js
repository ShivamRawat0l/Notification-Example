var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

(async () => {
  await admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  const title = "asda";
  const body = "asqweqw";
  await admin.messaging().sendMulticast({
    tokens: [
      "eooi-E2eTUDgpG4ZP4wGCI:APA91bF8rd_6zVocHg8LUzyb7jW7HdRMhcsHrTyv9fjyM-j3I3l6LTP_dheIdnrrhFrVTr_Y5TptJ_gLqA21VtOz8iV0u96SmF4xdf9_swFORAgy6AdJUAFAYLFODBHKDxTLdej3ezub",
      "ezphijwQTmSJz4zvPqCmoY:APA91bFgEYoeupB0zt8-dD1a8-cVlLh0-aINYkcz2kyEl-ZcJ5mVWrQMzPB_0CBc7Fwwa1Si5kV9I5vKYxERT2upCpKD0Z0FSPrr-1jdeXOC0NeJCqFiFRSHg3ADsIQJ_yLnkfRtzHab",
    ],
    notification: {
      title: "A notification title!",
      body: "A notification body",
    },
    apns: {
      payload: {
        aps: {
          // Payloads coming from Admin SDK should specify params in camelCase.
          // Payloads from REST API should specify in kebab-case
          // see their respective reference documentation
          contentAvailable: 1, // Important, to receive `onMessage` event in the foreground when message is incoming
          mutableContent: 1, // Important, without this the extension won't fire
        },
        notifee_options: {
          image: "https://placeimg.com/640/480/any", // URL to pointing to a remote image
          ios: {
            sound: "media/kick.wav", // A local sound file you have inside your app's bundle
            foregroundPresentationOptions: {
              alert: true,
              badge: true,
              sound: true,
            },
            categoryId: "post", // A category that's already been created by your app
            attachments: [
              {
                url: "https://placeimg.com/640/480/any",
                thumbnailHidden: true,
              },
            ], // array of attachments of type `IOSNotificationAttachment`
          },
        },
      },
    },
  });
})();

/* 


    data: {
      title,
      body,
    },
    apns: {
      payload: {
        aps: {
          "content-available": true,
        },
      },
    },



  notification: {
      title: 'A notification title!',
      body: 'A notification body',
    },
    apns: {
        payload: {
            aps: {
                // Payloads coming from Admin SDK should specify params in camelCase. 
                // Payloads from REST API should specify in kebab-case
                // see their respective reference documentation
                'contentAvailable': 1, // Important, to receive `onMessage` event in the foreground when message is incoming
                'mutableContent': 1, // Important, without this the extension won't fire
            },
            notifee_options: {
                image: 'https://placeimg.com/640/480/any', // URL to pointing to a remote image
                ios: {
                    sound: 'media/kick.wav', // A local sound file you have inside your app's bundle
                    foregroundPresentationOptions: {alert true, badge: true, sound: true},
                    categoryId: 'post', // A category that's already been created by your app
                    attachments: [{url: 'https://placeimg.com/640/480/any', thumbnailHidden: true}] // array of attachments of type `IOSNotificationAttachment`
                    ... // any other api properties for NotificationIOS
                },
                ... // any other api properties for Notification, excluding `id`
            },
        },
    },
*/

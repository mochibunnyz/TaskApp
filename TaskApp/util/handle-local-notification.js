import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { getFormattedDate } from "./date";


export async function schedulePushNotification(taskTitle, date, location, reminder) {
    //Add 20 seconds to the current date to test it.
    reminder.setSeconds(reminder.getSeconds() + 20);
    date =getFormattedDate(date);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: taskTitle,
        subtitle:`Due: ${date}`,
        body: `Location: ${location}`,
        data: { data: 'Any data comes here' },
      },
      trigger: { date: reminder },
    });
     
}
  
export async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync({
          projectId: 'c3305874-f443-494c-b9ef-188fec02d8c1',
      })).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
}
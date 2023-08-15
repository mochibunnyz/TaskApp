import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import React from "react";




const HandleReminders = () =>{
    

    useEffect(()=>{

        async function configurePushNotifications(){
          const{status} = await Notifications.getPermissionsAsync();
          let finalStatus = status;
    
          if (finalStatus !== 'granted'){
            Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
    
          if (finalStatus !== 'granted'){
            Alert.alert(
              'Permission required', 
              'Push notifications need the appropriate permissions.'
            );
            return;
          }
    
          const pushTokenData = await Notifications.getExpoPushTokenAsync().then((pushTokenData)=>{
            
          });
          console.log(pushToken);
    
        }
        configurePushNotifications();
        
      }, []
    );

};

export default HandleReminders;
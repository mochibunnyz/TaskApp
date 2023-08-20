import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons, FontAwesome} from '@expo/vector-icons';

import ManageTasks from './screens/ManageTasks';
import RecentTasks from './screens/RecentTasks';
import TaskDetails from './screens/TaskDetails';
import Home from './screens/Home';

import { GlobalStyles, Colors } from './constants/styles';
import IconButton from './components/UI/IconButton';
import TasksContextProvider from './store/tasks-context';

import * as Notifications from "expo-notifications";
//import LoginScreen from './screens/LoginScreen';


const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();



function TasksOverview(){
  // do the bottom tab naviagtaion
  return (
    //header
    <BottomTabs.Navigator 
      screenOptions={({navigation})=>({
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'black',
        tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500, height:90, paddingTop:20},
        tabBarActiveTintColor: GlobalStyles.colors.primary400,
        // this adds a plus button in the header
        headerRight: ({tintColor}) => (
          <IconButton 
            icon="add" 
            size={24} 
            color={tintColor} 
            onPress={()=>{
              navigation.navigate('ManageTask');
            }}
          />
        ),
      })}
    >
      {/* Bottom navigation tab */}

      {/* Home Screen */}
      <BottomTabs.Screen 
        name = "Home" 
        component = {Home}
        options={{
          title: "Home",
          tabBarLabel:"Home",
          tabBarIcon:({color,size}) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          
        }}
      />

      {/* add Task */}
      {/* <BottomTabs.Screen 
        name = "Add" 
        component = {ManageTasks}
        options={{
          tabBarShowLabel: false,
          tabBarIcon:({color,size}) => (
            <FontAwesome name="plus-square" size={size} color={color} />
          ),
          
        }}
      /> */}

      {/* Recent tasks */}
      <BottomTabs.Screen 
        name = "RecentTasks" 
        component={RecentTasks}
        options={{
          title: "Recent Tasks",
          tabBarLabel:"Recent",
          tabBarIcon:({color,size}) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
          
        }}
      />
      

      {/* <BottomTabs.Screen 
        name = "Profile" 
        component = {LoginScreen}
        options={{
          title: "Profile",
          tabBarLabel:"Profile",
          tabBarIcon:({color,size}) => (
            <FontAwesome name="user-circle-o" size={size} color={color} />
          ),
          
        }}
      /> */}
    </BottomTabs.Navigator>
  );
}
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <TasksContextProvider>
        {/* for navigating screens */}
        <NavigationContainer>
          
          
          <Stack.Navigator screenOptions={{
            headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
            headerTintColor: 'black'
          }}>
            {/* the first screen is the default screen */}
            {/* the header is disabled on taskoverview page to prevent 2 headers from being shown */}
            <Stack.Screen 
              name = "TasksOverview" 
              component={TasksOverview} 
              options = {{headerShown: false}}
            />
            <Stack.Screen name = "ManageTask" component={ManageTasks} options={{
              //presentation change how the screen will look like
              presentation:'modal',
            }}/>
            <Stack.Screen name = "TaskDetails" component={TaskDetails} />
          </Stack.Navigator>

        </NavigationContainer>
      </TasksContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

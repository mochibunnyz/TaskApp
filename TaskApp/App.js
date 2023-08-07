import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';

import ManageTasks from './screens/ManageTasks';
import RecentTasks from './screens/RecentTasks';
import Home from './screens/Home';

import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import TasksContextProvider from './store/tasks-context';


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
        tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
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
      <BottomTabs.Screen 
        name = "Home" 
        component = {Home}
        options={{
          title: "Home",
          tabBarLabel:"Home",
          tabBarIcon:({color,size}) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
          
        }}
      />
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

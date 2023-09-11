import { StyleSheet, View, Text, TouchableOpacity,Button, Alert, Switch } from 'react-native';
import { GlobalStyles } from "../constants/styles";
import { useContext, useEffect, useState} from 'react';
import { TasksContext } from '../store/tasks-context';
//import RNCalendarEvents from 'react-native-calendar-events';
import * as Calendar from 'expo-calendar';
import {updateCalendarEventId} from '../util/http';







function Setting(){
  //const { tasks,updateTask } = useContext(TasksContext);
  const tasksCtx = useContext(TasksContext);
  
  const [areTasksInCalendar, setAreTasksInCalendar] = useState(false)

  useEffect(() => {
    // Check if any task is already in the calendar when the component mounts
    const anyTaskInCalendar = tasksCtx.tasks.some((task) => !!task.calendarEventId);
    setAreTasksInCalendar(anyTaskInCalendar);
  }, [tasksCtx.tasks]);

  async function addTasksToCalendar() {
    const { status } = await Calendar.requestCalendarPermissionsAsync();

    //if permission is granted, add calendar
    if (status === 'granted') {
      for (const task of tasksCtx.tasks) {
        const startDate = new Date(task.startDate);
        const endDate = new Date(task.date);

        const calendarId = await Calendar.getDefaultCalendarAsync();
        const eventDetails = {
          title: task.title,
          startDate,
          endDate,
          location:task.location,
          notes: task.description,
          
        };

        try {
          const eventId = await Calendar.createEventAsync(calendarId.id, eventDetails);
          console.log(`Event added to calendar with ID: ${eventId}`);
          task.calendarEventId = eventId;
          tasksCtx.updateTask(task.id, task);
          await updateCalendarEventId(task.id, task.calendarEventId);

        } catch (error) {
          console.error('Error adding event to calendar:', error);
        }
      }

      Alert.alert('Tasks added to the calendar successfully.');
      setAreTasksInCalendar(true);
    } 
    else {
      Alert.alert('Calendar permission not granted.');
    }
  };

  

  async function removeTasksFromCalendar(){
    try {
      for (const task of tasksCtx.tasks) {
        if (task.calendarEventId) {
          await Calendar.deleteEventAsync(task.calendarEventId);
          task.calendarEventId = null;
          // Update the task in in tasksCtx with a null calendarEventId
          tasksCtx.updateTask(task.id, task); 
          //update the calendarEventId in firebases
          await updateCalendarEventId(task.id, task.calendarEventId);
        }
      }

      setAreTasksInCalendar(false);
      console.log('Tasks removed from the calendar.');
      Alert.alert('Tasks are removed from the calendar successfully.');
    } catch (error) {
      console.error('Error removing tasks from the calendar:', error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Text style={styles.header}>Calendar</Text>
        <View>
          <View style={styles.switchContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.subText}>Sync to my calendar</Text>
              <Text style={styles.Text}>Automatically sync all the tasks and dates to your calendar</Text>
            </View>
            
            <Switch
              trackColor={{ false: '#767577', true: GlobalStyles.colors.primary700 }}
              thumbColor={ GlobalStyles.colors.primary500 }
              ios_backgroundColor="#3e3e3e"
              onValueChange={areTasksInCalendar ? removeTasksFromCalendar : addTasksToCalendar}
              value={areTasksInCalendar}
              
            />
          </View>

          <Text style={styles.warningText}>Calendar permission is required to add tasks.</Text>
        </View>

      </View>
      
    </View>
  );
}

export default Setting;
const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor:GlobalStyles.colors.primary500,
    
  },
  header:{
    fontSize:18,
    fontWeight:'bold',
    color:GlobalStyles.colors.primary700
  },
  calendarContainer:{

  },

  
  switchContainer:{
        
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom:10,
  },
  textContainer:{
    maxWidth:'80%',
    marginRight:20,
  },
  subText:{
    fontSize:15,
    fontWeight:'bold',
    paddingVertical:5
  },
  Text:{
    fontSize:13,
    color:GlobalStyles.colors.primary700
    
  },
  warningText:{
    fontSize:12,
    fontWeight:'200',
    color:'red'
  },
  
  buttonText:{
    fontSize:15,
    color:GlobalStyles.colors.primary800,
    fontWeight:'700'
  }
})

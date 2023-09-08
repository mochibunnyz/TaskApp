import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GlobalStyles } from "../constants/styles";
import { useContext, useEffect, useState } from 'react';
import { TasksContext } from '../store/tasks-context';
import RNCalendarEvents from 'react-native-calendar-events';

function Setting(){
    const { tasks } = useContext(TasksContext);
    const calendarEvents = tasks.map((task) => ({
        title: task.title,
        startDate: task.startDate, // Replace with your task properties
        endDate: task.date,
        // Other properties as needed
    }));

    const addEventToCalendar = async (event) => {
        try {
          // Request calendar permissions
          const { status } = await RNCalendarEvents.requestPermissions();
          console.log('Calendar permission status:', status);
          if (status === 'authorized') {
            // Add the event to the calendar
            const { success, eventId } = await RNCalendarEvents.saveEvent(event);
      
            if (success) {
              console.log(`Event added to calendar with ID: ${eventId}`);
            } else {
              console.error('Failed to add event to calendar');
            }
          } else {
            console.error('Calendar permission not granted');
          }
        } catch (error) {
          console.error('Error adding event to calendar:', error);
        }
    };

    const handleCalendarIntegration = () => {
        calendarEvents.forEach((event) => {
          addEventToCalendar(event);
        });
    };

    return(
        <View>
            <Text>Testing</Text>
            <TouchableOpacity onPress={handleCalendarIntegration}>
                <Text>Add to calendar</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Setting;


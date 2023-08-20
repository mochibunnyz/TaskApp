import { useContext, useLayoutEffect, useState } from 'react';
import {StyleSheet, Text, View, ScrollView, Button, Linking} from 'react-native';
import LoadingOverlay from '../components/UI/LoadingOverlay';

import { GlobalStyles } from '../constants/styles';
import { TasksContext } from '../store/tasks-context';
import { getFormattedDate, toDateStringFunction, toTimeSlice} from '../util/date';
import { Ionicons } from '@expo/vector-icons';



function TaskDetails({route, navigation}){

    const tasksCtx =useContext(TasksContext);

    const editedTaskId = route.params?.taskId;
    //const isEditing = !!editedTaskId;

    const selectedTask = tasksCtx.tasks.find((task) => task.id === editedTaskId);
    
    function taskPressHandler(){
        navigation.navigate('ManageTask',{
            taskId:selectedTask.id
        });
        
    
    }
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Details",
            headerRight: () => (
                <Button onPress={taskPressHandler} title="Edit" />
            ),
           
        });

    }, [navigation]);
    console.log(selectedTask);
    return(
        <View style={styles.container}>
            {/*Name and date */}
            <View style= {styles. dividerContainer}>
                <Text style= {styles.title}>{selectedTask.title}</Text>
                <Text style= {styles.date}>{toDateStringFunction(selectedTask.date)}</Text>

            </View>
            {/*Location */}
            <View style= {styles. dividerContainer}>
                <Text style= {styles.label}>Location</Text>
                
                <View style={styles.locationContainer}>
                    <Ionicons name="location-outline" size={12} color="black"  />
                    <Text style= {styles.location}>{selectedTask.location}</Text>

                </View>
                
            </View>
            {/*details */}
            <View style={styles.dividerContainer}>
                <Text style={styles.label}>Details </Text>
                <Text>{selectedTask.description}</Text>
            </View>

            {/*Link */}
            <View style={styles.dividerContainer}>
                <Text style={styles.label}>Link </Text>
                <Text style={[styles.text, styles.blueText]} onPress={() => Linking.openURL(selectedTask.link)}>{selectedTask.link}</Text>
                
            </View>

            {/*Reminders */}
            <View style={styles.dividerContainer}>
                <Text style={styles.label}>Reminders </Text>
                <Text style={styles.text}>{getFormattedDate(selectedTask.reminder)} - {toTimeSlice(selectedTask.reminder)}</Text>
            </View>
            
            
            
            
            
        </View>
    );
}

export default TaskDetails;

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        backgroundColor:GlobalStyles.colors.primary500
    },
    dividerContainer:{
        borderBottomColor:'#e1e1e1',
        borderBottomWidth:1,
    },
    title:{
        color:'black',
        fontSize:35,
        fontWeight:'bold',
        left: 0,
        top:0,
        height: 52,
    }, 
    date:{
        color:'black',
        fontSize:15,
        left: 0,
        fontWeight:'bold',
        height: 27,
        marginBottom:5,
    },
    
    label:{
        fontSize: 17,
        fontWeight:'bold',
        height: 27,
        left: 0,
        marginTop:5,
        marginBottom:10,
    },
    locationContainer:{
        
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom:10,
    },
    location:{
        color:'black',
        fontSize:13,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingRight:290        
    },
    text:{
        fontSize: 15,
        fontWeight: 400,
        height: 27,
        marginBottom:5,

    },
    blueText:{
        color:'blue'
    },
    
    
})
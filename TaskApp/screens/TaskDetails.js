import { useContext, useLayoutEffect, useState, useEffect } from 'react';
import {StyleSheet, Text, View, ScrollView, Button, Linking, TouchableOpacity, TextInput} from 'react-native';

import { GlobalStyles } from '../constants/styles';
import { TasksContext, } from '../store/tasks-context';
import { getFormattedDate, toDateStringFunction, toTimeSlice} from '../util/date';
import { Ionicons } from '@expo/vector-icons';

import {deleteTask, updateSubtaskStatusInFirebase} from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import * as Progress from 'react-native-progress';




function TaskDetails({route, navigation}){

    const tasksCtx =useContext(TasksContext);
    //console.log(tasksCtx);

    const editedTaskId = route.params?.taskId;
    

    const selectedTask = tasksCtx.tasks.find((task) => task.id === editedTaskId);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();
    
    const [subtaskStatus, setSubtaskStatus] = useState(selectedTask.subtasks ? new Array(selectedTask.subtasks.length).fill(false) : []);
    
    useEffect(() => {
        //to make sure that the status of each subtask from the database is mapped correctly
        if (selectedTask && selectedTask.subtasks) {
          const initialSubtaskStatus = selectedTask.subtasks.map(subtask => subtask.completed);
          setSubtaskStatus(initialSubtaskStatus);
        }
    }, [selectedTask]);
    
    
    //get subtask progress
    const progress = calculateProgress(subtaskStatus);
    
    //calculate subtask progress
    function calculateProgress(subtaskStatus) {
        //if no subtask or if all subtasks are not completed
        if (!subtaskStatus || subtaskStatus.length === 0) {
          return 0; 
        }
      
        const completedSubtasks = subtaskStatus.filter((status) => status);
        return (completedSubtasks.length / subtaskStatus.length) * 100;
    }
      

    
    const toggleSubtaskStatus = (subtaskIndex) =>{
        setSubtaskStatus((prevStatus) => {
          const newStatus = [...prevStatus];
          newStatus[subtaskIndex] = !newStatus[subtaskIndex]; // Toggle the status of the clicked subtask
          return newStatus;
        });
      
        // Call the function to update Firebase with the new status
        updateSubtaskStatusInFirebase(selectedTask.id, subtaskIndex, !subtaskStatus[subtaskIndex]);

        // Call the context function to update the subtask status in the context
        tasksCtx.updateSubtask(selectedTask.id, subtaskIndex, !subtaskStatus[subtaskIndex]);

        
    };

    
    function deleteTaskHandler() {
        setIsSubmitting(true);
        try {
            // Delete the task from the context (assuming it updates the state)
            tasksCtx.deleteTask(selectedTask.id);
            
            // Now, asynchronously delete the task from the server
            deleteTask(selectedTask.id);
            
            // After the deletion is complete, navigate back
            //navigation.goBack();
        } catch (error) {
            setError('Could not delete task - please try again later!');
            setIsSubmitting(false);
        } 

        //goBack() go back to the screen it was called
        navigation.goBack();
        
    }
    

    if(error && !isSubmitting){
        return <ErrorOverlay message={error} />;
    }

    if (isSubmitting){
        return <LoadingOverlay/>;
    }

    function taskPressHandler(){
        navigation.navigate('ManageTask',{
            taskId:selectedTask.id
        });
        
    
    }

    // Check and add "https://" to selectedTask.link if missing
    if (selectedTask.link && !selectedTask.link.startsWith('https://')) {
        selectedTask.link = 'https://' + selectedTask.link;
    }

    // Remove "https://" only for displayed link if it was auto-added
    let displayedLink = selectedTask.link.startsWith('https://')? selectedTask.link.replace(/^https?:\/\//, ''): selectedTask.link;
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Details",
            headerRight: () => (
                <Button onPress={taskPressHandler} title="Edit" />
            ),
           
        });

    }, [navigation]);
    

    return(
        <View style={styles.container}>
            <ScrollView>
                {/*Name and date */}
                <View style= {styles. dividerContainer}>
                    <Text style= {styles.title}>{selectedTask.title}</Text>
                    <Text style= {styles.date}>{toDateStringFunction(selectedTask.startDate)} -  {toDateStringFunction(selectedTask.date)}</Text>
                    <Text style= {styles.date}>{toTimeSlice(selectedTask.startDate)} -  {toTimeSlice(selectedTask.date)}</Text>

                </View>
                {/*Location */}
                {selectedTask.location &&(
                    <View style= {styles. dividerContainer}>
                        <Text style= {styles.label}>Location</Text>
                        
                        <View style={styles.locationContainer}>
                            <Ionicons name="location-outline" size={12} color="black"  />
                            <Text style= {styles.location}>{selectedTask.location}</Text>

                        </View>
                        
                    </View>
                )}
                
                {/*details */}
                {selectedTask.description &&(
                    <View style={styles.dividerContainer}>
                        <Text style={styles.label}>Details </Text>
                        <Text>{selectedTask.description}</Text>
                    </View>
                )}

                {/* Subtasks */}
                {selectedTask.subtasks && (
                    <View style={styles.dividerContainer}>
                        <Text style={styles.label}>Subtasks </Text>
                        <View style={styles.progressBarContainer}>
                            <Progress.Bar
                                progress={progress / 100}
                                width={280}
                                height={7}
                                color={GlobalStyles.colors.primary700}
                            />
                            <Text style={styles.progressText}>{Math.round(progress)}%</Text>
                        </View>
                        {selectedTask.subtasks.map((subtask, index) => (
                        <View key={subtask.id}>
                            {/* Subtask title */}
                            <TouchableOpacity onPress={() => toggleSubtaskStatus(index)}>
                            <View style={styles.subtaskContainer}>
                                {/* Circle indicator */}
                                <View
                                style={[
                                    styles.circle,
                                    subtaskStatus[index]
                                    ? styles.completedCircle
                                    : styles.incompleteCircle,
                                ]}
                                />

                                <Text
                                style={
                                    subtaskStatus[index]
                                    ? styles.completed
                                    : styles.incomplete
                                }
                                >
                                {subtask.title}
                                </Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                        ))}
                    </View>
                )}
                
                

                {/*Link */}
                {selectedTask.link &&(
                    <View style={styles.dividerContainer}>
                        <Text style={styles.label}>Link </Text>
                        <Text style={[styles.text, styles.blueText]} onPress={() => Linking.openURL(selectedTask.link)}>{displayedLink}</Text>
                    </View>
                )}
                

                {/*Reminders */}
                <View style={styles.dividerContainer}>
                    <Text style={styles.label}>Reminders </Text>
                    <Text style={styles.text}>{getFormattedDate(selectedTask.reminder)} - {toTimeSlice(selectedTask.reminder)}</Text>
                </View>
            </ScrollView>
            {/*Button */}
            <View style={styles.buttonsContainer}>
                {/* <TouchableOpacity onPress={cancel} style={[styles.detailsButtons, styles.whiteButtons]}>
                    <Text style={styles.purpleText}>Go Back</Text>
                </TouchableOpacity>  */}

                <TouchableOpacity onPress={deleteTaskHandler} style={[styles.detailsButtons, styles.blueButtons]}>
                    <Text style= {{color:'white'}}>Delete</Text>
                </TouchableOpacity>
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
        color:GlobalStyles.colors.primary700,
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
        color:GlobalStyles.colors.primary700,
    },
    locationContainer:{
        
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom:10,
    },
    location:{
        color:'black',
        fontSize:13,
        flexDirection:'row',
        paddingLeft:10,
       
              
    },
    progressBarContainer:{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom:12,
    }, 
    progressText:{
        marginHorizontal:15
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
    buttonsContainer:{
        flexDirection:'row', 
        justifyContent:'space-around',
        marginVertical:20
       
    },
    detailsButtons:{
        minWidth:80,
        minHeight:30,
        marginTop:30,
        marginHorizontal:8,
        backgroundColor:'white',
        borderRadius:30,
        justifyContent:'center',
        paddingHorizontal:100,
        paddingVertical:15,
    },
    blueButtons:{
        backgroundColor:GlobalStyles.colors.primary700,
        
    },
    whiteButtons:{
        borderColor:GlobalStyles.colors.primary700,
        borderWidth:1,
    },
    subtaskContainer: {
        flexDirection: 'row',
        justifyContent:'flex-start',
        marginBottom:15
        
    },
    circle: {
        width: 15,
        height: 15,
        borderRadius: 10, // Makes it a circle
        marginRight: 10,
    },
    completedCircle: {
        backgroundColor: 'gray', 
        marginTop:2,
    },
    incompleteCircle: {
        borderColor:GlobalStyles.colors.primary700,
        borderWidth:3,
        marginTop:2,
    },
    completed: {
        textDecorationLine: 'line-through', 
        fontSize: 15,
        fontWeight: 400,
        height: 27,
        color:'gray'
        
   
    },
    incomplete: {
        // Style for incomplete subtasks
        fontSize: 15,
        fontWeight: 400,
        height: 27,
       
    },
    
    
    
})
import { useContext, useLayoutEffect, useState } from 'react';
import {StyleSheet, Text, View, ScrollView, Button, Linking, TouchableOpacity} from 'react-native';

import { GlobalStyles } from '../constants/styles';
import { TasksContext } from '../store/tasks-context';
import { getFormattedDate, toDateStringFunction, toTimeSlice} from '../util/date';
import { Ionicons } from '@expo/vector-icons';
import IconButton from '../components/UI/IconButton';
import {deleteTask} from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';


function TaskDetails({route, navigation}){

    const tasksCtx =useContext(TasksContext);

    const editedTaskId = route.params?.taskId;
    //const isEditing = !!editedTaskId;

    const selectedTask = tasksCtx.tasks.find((task) => task.id === editedTaskId);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();

    async function deleteTaskHandler(){
        setIsSubmitting(true);
        try{
            await deleteTask(selectedTask.id);
            tasksCtx.deleteTask(selectedTask.id);
        }

        catch(error){
            setError('Could not delete task - please try again later!');
            setIsSubmitting(false);
        }
        
        
        //goBack() go back to the screen it was called
        navigation.goBack();
        
    }
    
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
    
    if(error && !isSubmitting){
        return <ErrorOverlay message={error} />;
    }

    if (isSubmitting){
        return <LoadingOverlay/>;
    }

    return(
        <View style={styles.container}>
            {/*Name and date */}
            <View style= {styles. dividerContainer}>
                <Text style= {styles.title}>{selectedTask.title}</Text>
                <Text style= {styles.date}>{toDateStringFunction(selectedTask.date)}</Text>

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
            

            {/*Link */}
            {selectedTask.link &&(
                <View style={styles.dividerContainer}>
                    <Text style={styles.label}>Link </Text>
                    <Text style={[styles.text, styles.blueText]} onPress={() => Linking.openURL(selectedTask.link)}>{selectedTask.link}</Text>
                </View>
            )}
            

            {/*Reminders */}
            <View style={styles.dividerContainer}>
                <Text style={styles.label}>Reminders </Text>
                <Text style={styles.text}>{getFormattedDate(selectedTask.reminder)} - {toTimeSlice(selectedTask.reminder)}</Text>
            </View>

            {/*Button */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={deleteTaskHandler} style={[styles.detailsButtons, styles.whiteButtons]}>
                    <Text style={styles.purpleText}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.detailsButtons, styles.blueButtons]}>
                    <Text style= {{color:'white'}}>Confirm</Text>
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
        color:GlobalStyles.colors.primary700,
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
    buttonsContainer:{
        flexDirection:'row', 
        justifyContent:'space-around',
       
    },
    detailsButtons:{
        minWidth:80,
        minHeight:30,
        marginTop:30,
        marginHorizontal:8,
        backgroundColor:'white',
        borderRadius:30,
        justifyContent:'center',
        paddingHorizontal:20,
        paddingVertical:15,
    },
    blueButtons:{
        backgroundColor:GlobalStyles.colors.primary700,
        
    },
    whiteButtons:{
        borderColor:GlobalStyles.colors.primary700,
        borderWidth:1,
    },
    
    
    
})
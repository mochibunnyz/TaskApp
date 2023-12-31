import { useContext, useLayoutEffect, useState } from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

import IconButton from '../components/UI/IconButton';

import { GlobalStyles } from '../constants/styles';
import { TasksContext } from '../store/tasks-context';
import TaskForm from '../components/ManageTask/TaskForm';
import {deleteTask, storeTask, updateTask} from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

import { useLocalNotification } from "../util/useLocalNotification";
import * as Notifications from "expo-notifications";
import { schedulePushNotification } from "../util/handle-local-notification";
import Home from './Home';
//import { Button } from "react-native";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false
    })
});

function ManageTasks({route, navigation}){

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();

    const tasksCtx =useContext(TasksContext);

    const editedTaskId = route.params?.taskId;
    const isEditing = !!editedTaskId;

    const selectedTask = tasksCtx.tasks.find((task) => task.id === editedTaskId);

    useLocalNotification();

    useLayoutEffect(() => {
        navigation.setOptions({
            title:isEditing? 'Edit Task' : 'Add Task'
        });

    }, [navigation, isEditing]);

    
    function cancelHandler(){
        navigation.goBack();
    }

    async function confirmHandler(taskData){
        setIsSubmitting(true);
        try{
            if(isEditing){
                //update local first then update firebase
                tasksCtx.updateTask(editedTaskId, taskData);
                await updateTask(editedTaskId, taskData);
            }
            else{
                //create reminder
                const reminderId = await schedulePushNotification(taskData.title, taskData.date, taskData.location, taskData.reminder);
                
                const id = await storeTask(taskData);
                tasksCtx.addTask({...taskData, id:id});
                
                
                
            }
            navigation.goBack();
        }
        catch(error){
            setError('Could not save data -- Please try again later!')
            setIsSubmitting(false);
        }
       
        
    }

    

    if(error && !isSubmitting){
        return <ErrorOverlay message={error} />;
    }

    if (isSubmitting){
        return <LoadingOverlay/>;
    }

    return(
        <View style={styles.container}>
            <ScrollView>

            
            <TaskForm 
                submitButtonLabel={isEditing? 'Update' : 'Add'} 
                onSubmit={confirmHandler}
                onCancel={cancelHandler}
                defaultValues={selectedTask}
            />
            
            
            </ScrollView>
        </View>
    );
}

export default ManageTasks;

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        backgroundColor:GlobalStyles.colors.primary500
    },
    
    deleteContainer:{
        marginTop:16,
        paddingTop:8,
        borderTopWidth:2,
        borderTopColor:GlobalStyles.colors.primary200,
        alignItems:'center',
        marginBottom:8,
        


    }
})
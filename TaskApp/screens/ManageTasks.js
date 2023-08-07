import { useContext, useLayoutEffect } from 'react';
import {StyleSheet, Text, View} from 'react-native';

import IconButton from '../components/UI/IconButton';
import Button from '../components/UI/Button';
import { GlobalStyles } from '../constants/styles';
import { TasksContext } from '../store/tasks-context';
import TaskForm from '../components/ManageTask/TaskForm';

function ManageTasks({route, navigation}){

    const tasksCtx =useContext(TasksContext);
    const editedTaskId = route.params?.taskId;
    const isEditing = !!editedTaskId;

    const selectedTask = tasksCtx.tasks.find((task) => task.id === editedTaskId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title:isEditing? 'Edit Task' : 'Add Task'
        });

    }, [navigation, isEditing]);

    
    function deleteTaskHandler(){
        tasksCtx.deleteTask(editedTaskId);
        //goBack() go back to the screen it was called
        navigation.goBack();
        
    }
    function cancelHandler(){
        navigation.goBack();
    }

    function completeTaskHandler(){
        tasksCtx.completeTask(editedTaskId);
        //goBack() go back to the screen it was called
        navigation.goBack();
    }

    function confirmHandler(taskData){
        if(isEditing){
            tasksCtx.updateTask(editedTaskId, taskData);
        }
        else{
            tasksCtx.addTask(taskData);
        }
        navigation.goBack();
    }

    return(
        <View style={styles.container}>
            <TaskForm 
                submitButtonLabel={isEditing? 'Update' : 'Add'} 
                onSubmit={confirmHandler}
                onCancel={cancelHandler}
                defaultValues={selectedTask}
            />
            
            {/* if the page is in editing mode, show delete icon */}
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton 
                        icon="trash" 
                        color={GlobalStyles.colors.error500} 
                        size={36} 
                        onPress={deleteTaskHandler}
                    />
                </View>
            ) }
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
        alignItems:'center'


    }
})
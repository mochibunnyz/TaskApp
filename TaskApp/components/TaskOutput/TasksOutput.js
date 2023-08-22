import { FlatList, Text, View, StyleSheet } from "react-native";

import TaskSummary from "./TasksSummary";
import TasksList from "./TasksList";

import { GlobalStyles } from "../../constants/styles";


function TasksOutput({tasks, tasksPeriod}){
    return (
        <View style={styles.container}>
            <TaskSummary tasks={tasks} periodName={tasksPeriod}/>
            <TasksList tasks={tasks}/>
       
        </View>
    );

}
export default TasksOutput;

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:5,
        paddingBottom:0,
        backgroundColor:GlobalStyles.colors.primary500
    }

});
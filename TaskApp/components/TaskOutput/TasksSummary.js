import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function TaskSummary({tasks, periodName}){
    // const tasksSum = tasks.reduce((sum, task)=>{
    //     return sum + task.location;
    // }, 0);
    return(
        <View style={styles.container}>
            
            <Text style={styles.period}>{periodName}</Text>
            {/* <Text style={styles.sum}>${tasksSum.toFixed(2)}</Text> */}
        </View>
    ); 
}

export default TaskSummary;

const styles = StyleSheet.create({
    container:{
        padding:8,
        backgroundColor:GlobalStyles.colors.primary50,
        borderRadius:6,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    period:{
        fontSize:12,
        color:'white',
    },
    sum:{
        fontSize:16,
        fontWeight:'bold',
        color: GlobalStyles.colors.primary500
    }
});
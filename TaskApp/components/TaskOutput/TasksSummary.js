import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../constants/styles";




function TaskSummary({tasks, periodName}){
    // const tasksSum = tasks.reduce((sum, task)=>{
    //     return sum + task.location;
    // }, 0);
    



    return(
        <View>
            
            
            <View style={styles.summaryContainer}>
                <Text style={styles.period}>{periodName}</Text>
                {/* <Text style={styles.sum}>${tasksSum.toFixed(2)}</Text> */}

            </View>
            
        </View>
    ); 
}

export default TaskSummary;

const styles = StyleSheet.create({
   
    summaryContainer:{
        padding:8,
        backgroundColor:GlobalStyles.colors.primary700,
        borderRadius:6,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10,

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
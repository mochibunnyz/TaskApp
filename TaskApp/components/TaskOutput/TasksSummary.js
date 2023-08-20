import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";



function TaskSummary({tasks, periodName}){
    // const tasksSum = tasks.reduce((sum, task)=>{
    //     return sum + task.location;
    // }, 0);
    const d = new Date();
    const todayDate = d.toLocaleDateString();
    //as the function is not part of a screen, to use navigate, need to use a prop
    const navigation = useNavigation();

    // function WeeklyHandler(){
    //     navigation.navigate(WeeklyTask);
    // }

    return(
        <View>
            <View style={styles.greetingContainer}>
                <Text style={styles.helloText}>Hello</Text>
                <Text style={styles.dateText}>{todayDate}</Text>
            </View>
            <View style={styles.bottomBorder}>
                <Text style={styles.taskText}>My Tasks</Text>
            </View>
            <View style={styles.filterContainer}>
                {/* Today filter */}
                <TouchableOpacity>
                    <Text>Today</Text>
                </TouchableOpacity>

                {/* Today filter */}
                <TouchableOpacity >
                    <Text>Week</Text>
                </TouchableOpacity>

                {/* Today filter */}
                <TouchableOpacity>
                    <Text>Month</Text>
                </TouchableOpacity>

                {/* Today filter */}
                <TouchableOpacity>
                    <Text>All</Text>
                </TouchableOpacity>

            </View>
            
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
        marginHorizontal:5,
        marginBottom:10,

    },
    greetingContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal:5,
        marginVertical:10,
        marginBottom:30,
    },
    filterContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal:5,
        marginVertical:10,
        marginBottom:30,
    },
    helloText:{
        fontSize:30,
        fontWeight:'bold',
        color: GlobalStyles.colors.primary700

    },
    dateText:{
        fontSize:15,
        color: GlobalStyles.colors.primary700
    },
    bottomBorder:{
        borderBottomColor:'#e1e1e1',
        borderBottomWidth:1,
        marginBottom:10
    },
    taskText:{
        marginHorizontal:5,
        fontSize:17,
        fontWeight:'bold',
        marginBottom:20,
    
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
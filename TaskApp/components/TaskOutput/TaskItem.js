import { Pressable, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate, toTimeSlice } from "../../util/date";
import { useContext } from "react";
import { TasksContext } from "../../store/tasks-context";
import { Ionicons } from '@expo/vector-icons';



//create the task item card
function TaskItem({id,title, description, location, date, reminder, link, startDate}){

    //as the function is not part of a screen, to use navigate, need to use a prop
    const navigation = useNavigation();

    const tasksCtx =useContext(TasksContext);
    
    function completeTaskHandler(){
        tasksCtx.completeTask(id);
        
    }

    function taskPressHandler(){
        /* navigation.navigate('ManageTask',{
            taskId:id
        }); */
        navigation.navigate('TaskDetails',{
            taskId:id
        });
    
    }


    return (
        <Pressable onPress={taskPressHandler} style ={({pressed}) => pressed && styles.pressed}>
            <View style={styles.taskItem}>
                <View>
                    <Text style={[styles.textBase, styles.title]}>{title}</Text>
                    {/* Show date */}
                    
                    <Text style={[styles.textBase, styles.date]}> Due: {getFormattedDate(date)}, {toTimeSlice(date)}</Text>
                    

                    {location &&(
                        <View style={styles.locationContainer}>
                            <Ionicons name="location-outline" size={14} color={GlobalStyles.colors.primary700}  />
                            <Text style={[styles.textBase, styles.location]}> {location}</Text>

                        </View>
                    )}
                    
                    
                    
                    
                </View>
                {/* <TouchableOpacity onPress={completeTaskHandler}  style={styles.doneContainer}>
                    <Text style={styles.doneText}>Done
                    </Text>   
                </TouchableOpacity> */}
                
            </View>
        </Pressable>
    );
}

export default TaskItem;

const styles = StyleSheet.create({
    pressed:{
        opacity:0.75
    },
    taskItem:{
        padding:12,
        marginVertical:8,
        marginHorizontal:5,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:15,
        elevation:3,
        borderColor:GlobalStyles.colors.primary100,
        borderWidth:1,
        shadowColor:GlobalStyles.colors.gray500,
        shadowRadius:4,
        shadowOffset:{width:1, height:1},
        shadowOpacity:0.4,
        minHeight:100,
    },
    textBase:{
        color:GlobalStyles.colors.primary700
    },
    date:{
        fontWeight:300,
        fontSize:11
    },
    title:{
        fontSize:16,
        marginBottom:3,
        fontWeight:'bold'
    },
    locationContainer:{
        
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop:20
    },
    location:{
        fontSize:13,
        fontWeight:600,
        
    },

   
    doneContainer:{
        paddingHorizontal:12,
        paddingVertical:4,
        backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,
        minWidth:80
    },
    doneText:{
        color:'white',
        fontWeight:'bold'
    }

});
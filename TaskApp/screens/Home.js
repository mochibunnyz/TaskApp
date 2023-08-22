
import TasksOutput from '../components/TaskOutput/TasksOutput';
import { useContext, useEffect, useState } from 'react';
import { TasksContext } from '../store/tasks-context';
import { fetchTask } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GlobalStyles } from "../constants/styles";
import { getDateMinusDays, getDatePlusDays } from '../util/date';
function Home(){
    //state for loading overlay
    
    const[isFetching, setIsFetching] = useState(true);
    //state ofr using error overlay
    const[error, setError] = useState();
    const tasksCtx = useContext(TasksContext);

    const today = new Date();
    const todayDate = today.toLocaleDateString();
    const [allTasks, setAllTasks] = useState(false);
    const [weeklyTasks, setWeeklyTasks] = useState(false);
    const [MonthlyTasks, setMonthlyTasks] = useState(false);
    const [dailyTasks, setDailyTasks] = useState(true);


    //get tasks from database and put in tasksCtx
    useEffect(() => {
        async function getTasks(){
            setIsFetching(true);
            try{
                const tasks = await fetchTask();
                tasksCtx.setTasks(tasks);
            }
            catch(error){
                setError('Could not fetch tasks!');
            }
            
            setIsFetching(false);
            
           
        }

        getTasks();
    }, []);
    
    if(error && !isFetching){
        return<ErrorOverlay message={error} />;
    }

    if(isFetching){
        return <LoadingOverlay/>;
    }

    //set AllTask to true and rest to false 
    function AllPressed(){
        setAllTasks(true);
        setWeeklyTasks(false);
        setMonthlyTasks(false);
        setDailyTasks(false);
    }

    //set WeeklyTask to true and rest to false 
    function WeeklyPressed() {
        setWeeklyTasks(true);
        setAllTasks(false);
        setMonthlyTasks(false);
        setDailyTasks(false);
    };
    //set MonthlyTask to true and rest to false 
    function MonthlyPressed() {
        setWeeklyTasks(false);
        setAllTasks(false);
        setMonthlyTasks(true);
        setDailyTasks(false);
    };
    //set DailyTask to true and rest to false 
    function DailyPressed() {
        setWeeklyTasks(false);
        setAllTasks(false);
        setMonthlyTasks(false);
        setDailyTasks(true);
    };

    //filter for tasks that are within the week and return data
    const weeklyTaskDates = tasksCtx.tasks.filter((task) =>{
        //const today = new Date();
        
        const date7DaysLater = getDatePlusDays(today, 7);
        

        return (task.date >= today) && (task.date <= date7DaysLater);
    });

    //filter for tasks that are within the month and return data
    const MonthlyTaskDates = tasksCtx.tasks.filter((task) =>{
        //const today = new Date();
        
        const date30DaysLater = getDatePlusDays(today, 30);
        

        return (task.date >= today) && (task.date <= date30DaysLater);
    });

    //filter for tasks that are within the day and return data
    const DailyTaskDates = tasksCtx.tasks.filter((task) =>{
        //const today = new Date();
        
        //const date1DayBefore = getDateMinusDays(today,1);
        const date1DayLater = getDatePlusDays(today, 1);
        

        return (task.date >= today) && (task.date <= date1DayLater);
    });

    return(

        <View style = {styles.container}>
            <View >
                <View style={styles.greetingContainer}>
                    <Text style={styles.helloText}>Hello</Text>
                    <Text style={styles.dateText}>{todayDate}</Text>
                </View>
                <View style={styles.bottomBorder}>
                    <Text style={styles.taskText}>My Tasks</Text>
                </View>
                <View style={styles.filterContainer}>
                    {/* Today filter */}
                    <TouchableOpacity style = {[dailyTasks? styles.pressed:styles.buttons]} onPress={DailyPressed}>
                        <Text style={[dailyTasks? styles.pressedText:styles.buttonText ]}>Today</Text>
                    </TouchableOpacity>

                    {/* Weekly filter */}
                    <TouchableOpacity style = {[weeklyTasks? styles.pressed:styles.buttons]}  onPress={WeeklyPressed} >
                        <Text style={[weeklyTasks? styles.pressedText:styles.buttonText ]}>Week</Text>
                    </TouchableOpacity>

                    {/* Month filter */}
                    <TouchableOpacity style = {[MonthlyTasks? styles.pressed:styles.buttons]} onPress={MonthlyPressed}>
                        <Text style={[MonthlyTasks? styles.pressedText:styles.buttonText ]}>Month</Text>
                    </TouchableOpacity>

                    {/* All filter */}
                    <TouchableOpacity style = {[allTasks? styles.pressed:styles.buttons ]} onPress={AllPressed}>
                        <Text style={[allTasks? styles.pressedText:styles.buttonText ]}>All</Text>
                    </TouchableOpacity>

                </View>
            </View>
            
            <View style = {styles.informationContainer}>
                {/* When all button is pressed, show all the tasks */}
                {allTasks && (<TasksOutput tasks={tasksCtx.tasks} tasksPeriod="All"/>)}
                {/* When Week button is pressed, show all the tasks within the week*/}
                {weeklyTasks && (<TasksOutput tasks={weeklyTaskDates} tasksPeriod="Weekly"/>)}
                {/* When Month button is pressed, show all the tasks within the Monthly*/}
                {MonthlyTasks && (<TasksOutput tasks={MonthlyTaskDates} tasksPeriod="Monthly"/>)}
                {/* When Day button is pressed, show all the tasks within the day*/}
                {dailyTasks && (<TasksOutput tasks={DailyTaskDates} tasksPeriod="Today"/>)}
                
            </View>
            
        </View>
        
    ); 
}

export default Home;

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:GlobalStyles.colors.primary500,
        flexDirection: 'column',
    },
    informationContainer:{
        flex:1,
        marginHorizontal:5,
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
        marginBottom:10,
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
    buttons:{
        
        flex:1,
        padding:8,
        borderColor:'#e1e1e1',
        borderWidth:1,
        
        
    },
    buttonText:{
        textAlign:'center',
        color:GlobalStyles.colors.primary700,
    },
    pressed:{
        backgroundColor:GlobalStyles.colors.primary700,
        flex:1,
        padding:8,
        borderColor:'#e1e1e1',
        borderWidth:1,
    },
    pressedText:{
        color:'white',
        textAlign:'center'
    },
});
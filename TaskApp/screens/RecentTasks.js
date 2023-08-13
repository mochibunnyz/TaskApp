import {Text} from 'react-native';
import TasksOutput from '../components/TaskOutput/TasksOutput';
import { useContext, useEffect, useState } from 'react';
import { TasksContext } from '../store/tasks-context';
import { getDateMinusDays } from '../util/date';
import { fetchTask } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';


function RecentTasks(){
    //state for loading overlay
    const[isFetching, setIsFetching] = useState(true);
    //state ofr using error overlay
    const[error, setError] = useState();
    const tasksCtx = useContext(TasksContext);
    

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

    const recentTasks = tasksCtx.tasks.filter((task) =>{
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return (task.date >= date7DaysAgo) &&(task.date <= today);
    });
    return(
        <TasksOutput tasks = {recentTasks} tasksPeriod="Last 7 Days"/>
    );
}

export default RecentTasks;
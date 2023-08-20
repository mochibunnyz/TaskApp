import {Text} from 'react-native';
import TasksOutput from '../components/TaskOutput/TasksOutput';
import { useContext, useEffect, useState } from 'react';
import { TasksContext } from '../store/tasks-context';
import { getDateMinusDays, getDatePlusDays } from '../util/date';
import { fetchTask } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';


function RecentTasks(){
    //state for loading overlay
    //const[isFetching, setIsFetching] = useState(true);
    //state ofr using error overlay
    const[error, setError] = useState();
    const tasksCtx = useContext(TasksContext);
    

    const recentTasks = tasksCtx.tasks.filter((task) =>{
        const today = new Date();
        
        const date7DaysLater = getDatePlusDays(today, 7);
        
       
        

        return (task.date>= today ) && (task.date <= date7DaysLater) ;
    });
    return(
        <TasksOutput tasks = {recentTasks} tasksPeriod="Week"/>
    );
}

export default RecentTasks;
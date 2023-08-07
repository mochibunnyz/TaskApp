import {Text} from 'react-native';
import TasksOutput from '../components/TaskOutput/TasksOutput';
import { useContext } from 'react';
import { TasksContext } from '../store/tasks-context';
import { getDateMinusDays } from '../util/date';

function RecentTasks(){
    const tasksCtx = useContext(TasksContext);

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
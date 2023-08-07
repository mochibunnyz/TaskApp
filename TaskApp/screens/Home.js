
import TasksOutput from '../components/TaskOutput/TasksOutput';
import { useContext } from 'react';
import { TasksContext } from '../store/tasks-context';

function Home(){
    const tasksCtx = useContext(TasksContext);
    return <TasksOutput tasks={tasksCtx.tasks} tasksPeriod="Total"/>;
}

export default Home;
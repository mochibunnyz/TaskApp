import { createContext, useReducer } from "react";


export const TasksContext = createContext({
    tasks:[],
    addTask:({title, description, location, date, reminder,link, startDate, subtasks})=>{},
    setTasks:(tasks) =>{},
    deleteTask: (id)=>{},
    updateTask:(id, {title, description,location,date, reminder, link, startDate, subtasks})=>{},
    completeTask: (id)=>{},
});

function taskReducer(state, action){
    switch(action.type){
        case 'ADD':
            return [action.payload,...state];
        
        case 'SET':
            //return the latest task on top. 
            const inverted = action.payload.reverse();
            return inverted;

        case 'UPDATE':
            const updateableTaskIndex = state.findIndex(
                (task)=> task.id === action.payload.id
            );
            const updateableTask = state[updateableTaskIndex];
            const updatedItem ={...updateableTask, ...action.payload.data };
            const updatedTasks = [...state];
            updatedTasks[updateableTaskIndex] = updatedItem;
            return updatedTasks;

        case 'DELETE':
            return state.filter((task) => task.id !== action.payload);

        case 'COMPLETE':
            return state.filter((task) => task.id !== action.payload);
        default:
            return state;
    }
}

function TasksContextProvider({children}){
    const [tasksState, dispatch] = useReducer(taskReducer, []);
   

    function addTask(taskData){
        dispatch({type:'ADD', payload:taskData});
    }
    


    function setTasks(tasks){
        dispatch({type:'SET', payload:tasks});
    }

    function deleteTask(id){
        dispatch({type:'DELETE', payload:id});
    }

    function updateTask(id, taskData){
        dispatch({type:'UPDATE', payload:{id:id, data:taskData}});
    }

   

    function completeTask(id){
        dispatch({type:'COMPLETE', payload:id});
    }

    const value ={
        tasks: tasksState,
        addTask: addTask,
        setTasks:setTasks,
        deleteTask:deleteTask,
        updateTask: updateTask,
        completeTask:completeTask,
    };

    return (
        <TasksContext.Provider value = {value}>{children}</TasksContext.Provider>
    );
}

export default TasksContextProvider;
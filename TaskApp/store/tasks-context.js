import { createContext, useReducer } from "react";

const DUMMY_TASKS = [
    {
        id:'t1',
        title:'Buy a pair of shoes',
        description: 'Buy a pair of shoes...',
        location:'home',
        date: new Date('2023-08-29')
    },
    {
        id:'t2',
        title:'Buy a bag',
        description: 'Buy a bag...',
        location:'home',
        date: new Date('2023-08-03')
    },
    {
        id:'t3',
        title: 'finish report',
        description: 'finish the report..',
        location:'home',
        date: new Date('2023-08-04')
    },
    {
        id:'t4',
        title:'finish book',
        description: 'finish the book...',
        location:'home',
        date: new Date('2023-08-05')
    }
];


export const TasksContext = createContext({
    tasks:[],
    addTask:({title, description, location, date})=>{},
    deleteTask: (id)=>{},
    updateTask:(id, {title, description,location,date})=>{},
    completeTask: (id)=>{},
});

function taskReducer(state, action){
    switch(action.type){
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id:id},...state];
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
    const [tasksSate, dispatch] = useReducer(taskReducer, DUMMY_TASKS);

    function addTask(taskData){
        dispatch({type:'ADD', payload:taskData});
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
        tasks: tasksSate,
        addTask: addTask,
        deleteTask:deleteTask,
        updateTask: updateTask,
        completeTask:completeTask,
    };

    return (
        <TasksContext.Provider value = {value}>{children}</TasksContext.Provider>
    );
}

export default TasksContextProvider;
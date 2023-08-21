import axios from 'axios';

const BACKEND_URL ='https://busybuddy-ec661-default-rtdb.asia-southeast1.firebasedatabase.app'

export async function storeTask(taskData){
    const response = await axios.post(BACKEND_URL + '/tasks.json',taskData);
    const id = response.data.name;
    return id;
}

export async function fetchTask(){
    const response = await axios.get(BACKEND_URL + '/tasks.json');
    const tasks = [];
    for( const key in response.data){
        const taskObj = {
            id: key,
            date: new Date (response.data[key].date),
            description: response.data[key].description,
            location: response.data[key].location,
            reminder:new Date(response.data[key].reminder),
            title:response.data[key].title,
            link: response.data[key].link
            
        };
        tasks.push(taskObj);
    }
    return tasks;
}

export function updateTask(id, taskData){
    return axios.put(BACKEND_URL +`/tasks/${id}.json`, taskData);

}

export function deleteTask(id){
    return axios.delete(BACKEND_URL +`/tasks/${id}.json`);

}
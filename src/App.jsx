import React, {Fragment, useState,useRef, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import { TodoList } from './components/TodoList';

const KEY= "todoApp.todos";

export function ImprLiteral(){
    return <div>escribe aquí tu texto</div>;
}
//COMPONENTE => App
export function App(){
//useState es para conseguir que tengan estado, cada vez que se meten nuevos 
//cambios en el array se vuelve a renderizar
const [todos, setTodos] = useState([{ id:1, task: 'Tarea 1', completed: 'false'}//<--el Objeto todo
]);

//useRef lo usamos para saber a que componente nos referimos
const todoTaskRef = useRef();

//useEffect para saber cuando se crea o cuando se destruye

//useEffect 2 traeremos lo guardado en el useEffects1 de abajo y lo pondremos en pantalla
useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if(storedTodos){
        setTodos(storedTodos);
    }
    },[])


//useEffect 1 guardamos en el localStorage los Todos en formato string
//le ponemos parametros para que escuche cada vez que añadamos una tarea
useEffect(() => {
localStorage.setItem("todoApp.todos", JSON.stringify(todos));    
},[todos]);






const toggleTodo = (id) =>{
const newTodos = [...todos];//creamos una copia del estado anterior
const todo = newTodos.find((todo) => todo.id ===id);//buscamos el todo que queremos
todo.completed = !todo.completed//modificamos el estado
setTodos(newTodos);//lo volvemos a enviar

} 

//borrar Tareas completadas
const handleClearAll = () => {
const newTodos= todos.filter((todo) => !todo.completed);
setTodos(newTodos);
}

//añadir nuevo To Do
const handleTodoAdd = () => {
//cogemos el input añadido     
const task = todoTaskRef.current.value;
if(task=== '')return;

//uuidv4(simplemente genera id aleatorios)
setTodos((prevTodos)=>{
    return [...prevTodos, {id: uuidv4(), task, completed:false}]
})

todoTaskRef.current.value= null;

};


return (
//Fragment es para meter en un return más de una cosa a devolver
<Fragment>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea"/>  
    <button onClick={handleTodoAdd}>➕</button>
    <button onClick={handleClearAll}>🗑️</button>   
    <div>Te quedan {todos.filter((todo)=>!todo.completed).length} tareas por terminar</div>
</Fragment>
);

}
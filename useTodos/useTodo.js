import { useEffect, useReducer } from "react"
import { todoReducer } from "./todoReducer"

const initialState = []

    const init = () => {
        return JSON.parse( localStorage.getItem('todos') ) || []
    }

export const useTodo = () => {
    const [ todos, dispatchTodo ] = useReducer( todoReducer, initialState, init )

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ) || [])
    }, [todos])
    

    const handleNewTodo = ( todo ) => {
       const action  = {
            type: '[TODO] Add Todo',
            playload: todo,
            
       }

       dispatchTodo( action )
    }

    const handleDeleteTodo = (id) =>{
        dispatchTodo({
            type: '[TODO] Remove Todo',
            playload: id,
            
        })
    }
    
    const handleToggleTodo = (id) =>{

        dispatchTodo({
            type: '[TODO] Toggle Todo',
            playload: id,
            
        })
    }

    const todosCount = () => {
        return todos.length
    }
  
    const pendingTodosCount = () => {
        return todos.filter( todo => !todo.done ).length
    }
  
  
    return {
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todos,
        dispatchTodo,
        todosCount,
        pendingTodosCount,

    }
}

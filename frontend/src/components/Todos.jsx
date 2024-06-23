/**
 * 
 * { todos = [
 * {
        title : "Go to gym"
        description : "You need to go the gym"
 }
   
 * ]}
 * 
 */


export function Todos({todos}) {
    return 
    <div>
         { todos && todos.map((todo) => {
            return <div>
                      <h1>{todo.title}</h1>
                      <h2>{todo.description}</h2>
                      <button>{todo.completed == true ? "Completed" : "Mark as Completed"}</button>
             </div>
         })
        }
 </div>
}
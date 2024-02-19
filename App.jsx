import React, { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');


  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }
  const addTodoItem = () => {
    if (inputText.trim() !== '') {
      setItems((prevItems =>{return [{ id: prevItems.length + 1, text: inputText, completed: false },...prevItems];}));
      setInputText('');
    }
  };
 
  const toggleTodo = (id) => {
    const updatedTodos = items.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ); 
    setItems(updatedTodos);
  };
 
  const deleteCompletedTasks = () => {
    const updatedTasks = items.filter((todo) => !todo.completed);
    setItems(updatedTasks);
  };
 
  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
  };
  const filteredTodos = filter === 'all' ? items :
    filter === 'finished' ? items.filter(todo => todo.completed) :
    items.filter(todo => !todo.completed);
   
 

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={addTodoItem} >
          <span>Add</span>
        </button>
    </div>
        <div className="form">
        
        <button onClick={() => handleFilterChange('all')}><span>All</span> </button>
        <button onClick={() => handleFilterChange('active')}><span>Active</span> </button>
        <button onClick={() => handleFilterChange('finished')}><span>Finished</span></button>
        <button onClick={deleteCompletedTasks}><span>Delete</span> </button>
       
      </div>
      
      <div>
        <ul>
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

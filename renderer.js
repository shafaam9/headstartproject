
window.onload = () => {
  loadTodoList();
};

document.getElementById('add-btn').addEventListener('click', () => {
  const todoInput = document.getElementById('todo-input');
  const todoText = todoInput.value.trim();
  
  if (todoText) {
      addTask(todoText);
      todoInput.value = ''; 
  } else {
      console.warn('Cannot add empty task!');
  }
});

document.getElementById('exit-btn').addEventListener('click', () => {
  window.close(); 
});


document.getElementById('todo-list').addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
      event.target.classList.toggle('completed');
      saveTodoList();
  }
});


function addTask(taskText) {
  const todoList = document.getElementById('todo-list');
  const newTodo = document.createElement('li');
  newTodo.textContent = taskText;
  

  todoList.appendChild(newTodo);
  saveTodoList();
}


function saveTodoList() {
  const todoItems = [];
  const todoList = document.getElementById('todo-list').children;
  
  for (let item of todoList) {
      todoItems.push({
          text: item.textContent,
          completed: item.classList.contains('completed')
      });
  }
  
  try {
      localStorage.setItem('todoList', JSON.stringify(todoItems));
  } catch (e) {
      console.error('Error saving todo list to localStorage:', e);
  }
}


function loadTodoList() {
  const savedTodoList = localStorage.getItem('todoList');
  
  if (savedTodoList) {
      const todoItems = JSON.parse(savedTodoList);
      const todoList = document.getElementById('todo-list');
      
      todoItems.forEach(item => {
          const newTodo = document.createElement('li');
          newTodo.textContent = item.text;
          if (item.completed) {
              newTodo.classList.add('completed');
          }
          todoList.appendChild(newTodo);
      });
  }
}

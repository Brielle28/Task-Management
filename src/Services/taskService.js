// Get tasks from localStorage
export const getTasksFromLocalStorage = () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  };
  
  
  // Save tasks to localStorage
  export const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  
  // Add a new task
  export const addTask = (task) => {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    saveTasksToLocalStorage(tasks);
  };
  
  // Delete a task
  export const deleteTask = (taskId) => {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasksToLocalStorage(tasks);
  };
  
  // Edit a task (you may update task info)
  export const editTask = (updatedTask) => {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    saveTasksToLocalStorage(tasks);
  };
  
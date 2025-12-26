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
    const now = new Date().toISOString();
    tasks = tasks.map(task => {
      if (task.id === updatedTask.id) {
        return { ...updatedTask, lastEdited: now, lastViewed: now };
      }
      return task;
    });
    saveTasksToLocalStorage(tasks);
  };

  // Track when a task is viewed
  export const trackTaskView = (taskId) => {
    let tasks = getTasksFromLocalStorage();
    const now = new Date().toISOString();
    tasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, lastViewed: now };
      }
      return task;
    });
    saveTasksToLocalStorage(tasks);
  };

  // Get recently opened tasks (last 5)
  export const getRecentlyOpenedTasks = () => {
    const tasks = getTasksFromLocalStorage();
    return tasks
      .filter(task => task.lastViewed || task.lastEdited)
      .sort((a, b) => {
        const aTime = new Date(a.lastViewed || a.lastEdited || 0);
        const bTime = new Date(b.lastViewed || b.lastEdited || 0);
        return bTime - aTime;
      })
      .slice(0, 5);
  };
  
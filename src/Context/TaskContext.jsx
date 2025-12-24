import { createContext, useContext, useState, useEffect } from 'react';
import { getTasksFromLocalStorage, saveTasksToLocalStorage, addTask as addTaskService, editTask as editTaskService, deleteTask as deleteTaskService } from '../Services/taskService';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from localStorage on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    try {
      const storedTasks = getTasksFromLocalStorage();
      setTasks(storedTasks);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading tasks:', error);
      setTasks([]);
      setIsLoading(false);
    }
  };

  // Add a new task
  const addTask = (task) => {
    try {
      addTaskService(task);
      const updatedTasks = getTasksFromLocalStorage();
      setTasks(updatedTasks);
      return true;
    } catch (error) {
      console.error('Error adding task:', error);
      return false;
    }
  };

  // Edit an existing task
  const editTask = (updatedTask) => {
    try {
      editTaskService(updatedTask);
      const updatedTasks = getTasksFromLocalStorage();
      setTasks(updatedTasks);
      return true;
    } catch (error) {
      console.error('Error editing task:', error);
      return false;
    }
  };

  // Delete a task
  const removeTask = (taskId) => {
    try {
      deleteTaskService(taskId);
      const updatedTasks = getTasksFromLocalStorage();
      setTasks(updatedTasks);
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      return false;
    }
  };

  // Refresh tasks manually (useful for force refresh)
  const refreshTasks = () => {
    loadTasks();
  };

  const value = {
    tasks,
    isLoading,
    addTask,
    editTask,
    removeTask,
    refreshTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};


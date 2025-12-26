import AppRouter from "./AppRouter"
import { TaskProvider } from "./Context/TaskContext";
import { ToastProvider } from "./Context/ToastContext";

function App() {

  return (
    <>
    <ToastProvider>
      <TaskProvider>
        <AppRouter/>
      </TaskProvider>
    </ToastProvider>
    </>
  )
}

export default App

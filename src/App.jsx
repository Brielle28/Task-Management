import AppRouter from "./AppRouter"
import { TaskProvider } from "./Context/TaskContext"

function App() {

  return (
    <>
    <TaskProvider>
      <AppRouter/>
    </TaskProvider>
    </>
  )
}

export default App

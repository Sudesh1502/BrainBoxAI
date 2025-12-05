
import './App.css'
import ChatWindow from './components/ChatWindow.jsx'
import Sidebar from './components/Sidebar.jsx'
import MyContext from './MyContext.jsx'
function App() {
  const contextvalues = {}
  return (
    <>
    <MyContext.Provider values={contextvalues} >
      <div className="app">
        <Sidebar/>
        <ChatWindow/>
      </div>
    </MyContext.Provider>
     
    </>
  )
}

export default App

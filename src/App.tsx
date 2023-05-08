import { BrowserRouter as Router } from 'react-router-dom'
import { UserTable } from './Components/UserTable';
import './App.css';
import New from './Components/New';



function App() {
  return (
    <>
      <Router>
      
        {/* <New /> */}
        <UserTable />
      </Router>
    </>
  );
}

export default App;

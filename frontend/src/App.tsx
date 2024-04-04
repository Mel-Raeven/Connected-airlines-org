import './App.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import '@mantine/core/styles.css';
import Homepage from './pages/Homepage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/Home'><Homepage/></Route>
      </Switch>
    </Router>
  )
}

export default App

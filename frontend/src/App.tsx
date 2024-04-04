import './App.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import '@mantine/core/styles.css';
import Homepage from './pages/Homepage';
import Bookings from './pages/Bookings';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/Home'><Homepage/></Route>
      </Switch>
      <Switch>
        <Route path='/Bookings'><Bookings/></Route>
      </Switch>
    </Router>
  )
}

export default App

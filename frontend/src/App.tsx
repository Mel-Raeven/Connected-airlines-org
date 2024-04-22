import './App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import '@mantine/core/styles.css';
import Homepage from './pages/Homepage';
import Bookings from './pages/Bookings';
import Flights from './pages/Flights';
import CreateBooking from './pages/CreateBooking';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/Home'><Homepage/></Route>
      </Switch>
      <Switch>
        <Route path='/Bookings'><Bookings/></Route>
      </Switch>
      <Switch>
        <Route path='/Flights'><Flights/></Route>
      </Switch>
      <Switch>
        <Route path='/CreateBooking'><CreateBooking/></Route>
      </Switch>
      <Switch>
        <Redirect to="/Home"/>
      </Switch>
    </Router>
  )
}

export default App

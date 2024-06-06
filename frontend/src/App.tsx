import './App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import '@mantine/core/styles.css';
import Homepage from './pages/Homepage';
import Bookings from './pages/Bookings';
import Flights from './pages/Flights';
import CreateBooking from './pages/CreateBooking';
import ConfirmBooking from './pages/ConfirmBooking';
import TrackFlight from './pages/TrackFlight';

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
        <Route path='/ConfirmBooking'><ConfirmBooking/></Route>
      </Switch>
      <Switch>
        <Route path='/TrackFlight'><TrackFlight/></Route>
      </Switch>
      <Switch>
        <Redirect to="/Home"/>
      </Switch>
    </Router>
  )
}

export default App

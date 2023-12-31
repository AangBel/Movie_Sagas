import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import MovieList from "../MovieList/MovieList";
import Details from "../Details/Details";
import MovieForm from "../MovieForm/MovieForm";

function App() {
  return (
    <div className="App-header">
      <header>
        <h1>The Movies Saga!</h1>
      </header>
      <div className="Routes">
        <Router>
          <Route path="/" exact>
            <MovieList />
          </Route>
          <Route path="/Details" exact>
            <Details />
          </Route>
        {/* <Route exact path="/MovieForm">
          <MovieForm /> */}
        {/* </Route> */}
        </Router>
      </div>
    </div>
  );
}

export default App;

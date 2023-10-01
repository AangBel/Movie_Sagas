import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import MovieList from "../MovieList/MovieList";
import Details from "../Details/Details";
import GenreData from "../GenreData";

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

          {/* Details page */}
          <Route path="/details" exact>
            <Details />
          </Route>
          {/* <Route path="/GenreData" exact>
            <GenreData />
          </Route> */}
          {/* Add Movie page */}
        </Router>
      </div>
    </div>
  );
}

export default App;

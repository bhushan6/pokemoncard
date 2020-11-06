
import './App.css';
import CardContainer from './Components/CardContainer';
import Header from './Components/Header';
import SearchContainer from './Components/SearchContainer'
import {useState} from 'react'

function App() {

  const [search, setSearch] = useState(false);
  const getSearchState = (searchState) => {
    setSearch(searchState);
  }
  return (
    <div className="app">
      <Header getSearchState={getSearchState}/>
      <CardContainer/>
      <SearchContainer/>
      {/* {!search? (<CardContainer/>) : (<SearchContainer/>)} */}
    </div>
  );
}

export default App;

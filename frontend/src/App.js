import React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import './App.css';
import Menu from './components/menu';
import Insert from './components/insertData';
import ViewAll from './components/viewAll';
import GetRank from './components/getRank';
import UpdateScore from './components/updateScore';
import DeleteRecord from './components/deleteRecord';

function App() {
  return (
    <Router>
    <div className="App">
      <Menu/>
      <Routes>
      <Route path="/insert" Component={Insert}/>
      <Route path="/view-All" Component={ViewAll}/>
      <Route path="/get-rank" Component={GetRank}/>
      <Route path="/update-score" Component={UpdateScore}/>
      <Route path="/delete-record" Component={DeleteRecord}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;

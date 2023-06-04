import { Route, Routes } from 'react-router-dom';
import { Expense } from './pages/Expense';
import { HomePage } from './HomePage';
import { Summary } from './pages/Summary';
import { Register } from './pages/Register';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/Summary" element={<Summary />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;

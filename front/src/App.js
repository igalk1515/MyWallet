import { Route, Routes, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Expense } from './pages/Expense';
import { HomePage } from './HomePage';
import { Summary } from './pages/Summary';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Income } from './pages/Income';
import { Breadcrumbs } from './common/Breadcrumbs';

function App() {
  let userName = '';
  const cookie =
    document.cookie &&
    document.cookie.split('; ').find((row) => row.startsWith('jwt'));
  const token = cookie && cookie.split('=')[1];
  if (token) {
    const decoded = jwt_decode(token);
    userName = decoded.userName;
  }

  const location = useLocation();
  const pathNames = location.pathname.split('/').filter((x) => x);
  location.pathname !== '/home' && pathNames.unshift('home');
  return (
    <div className="App">
      <header className="App-header">
        <Breadcrumbs pathNames={pathNames} />
        <p>{userName ? `hello ${userName}` : 'please Login'}</p>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/Summary" element={<Summary />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/income" element={<Income />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;

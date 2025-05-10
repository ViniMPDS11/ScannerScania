import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Header from './components/Header/Header';
import Layout from './layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import { useEffect } from 'react';

function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    const pathTitleMap = {
      '/': 'Home | Scan Scania',
      '/sobre': 'Sobre | Scan Scania',
    };

    document.title = pathTitleMap[location.pathname] || 'Scan Scania';
  }, [location]);
}

function App() {

  return (
    <Router>
      <TitleManager />
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sobre' element={<About />}/>
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

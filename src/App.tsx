import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Analytics } from './pages/Analytics';
import { Dashboard } from './pages/Dashboard';
import { NotFound } from './pages/NotFound';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

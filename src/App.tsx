import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { StoreTest } from './components/common/StoreTest';
import { UtilsTest } from './components/common/UtilsTest';
import { Layout } from './components/layout/Layout';
import { Analytics } from './pages/Analytics';
import { Dashboard } from './pages/Dashboard';
import { NotFound } from './pages/NotFound';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/test" element={<StoreTest />} />
          <Route path="/utils" element={<UtilsTest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

import { Route, Routes } from 'react-router';
import Layout from '@layouts/Layout';
import Main from '@/pages/Main';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main label="home" />} />
        <Route path="/favorites" element={<Main label="favorites" />} />
      </Route>
    </Routes>
  );
}

export default App;

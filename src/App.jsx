import { Route, Routes } from 'react-router';
import Layout from '@layouts/Layout';
import Home from '@pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/favorites" element={<div>Favorites 페이지</div>} />
      </Route>
    </Routes>
  );
}

export default App;


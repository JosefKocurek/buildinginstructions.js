import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ManualViewer from './components/ManualViewer';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/viewer" element={<ManualViewer />} />
    </Routes>
  );
}

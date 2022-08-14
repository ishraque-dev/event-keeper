import Home from './Pages/Home';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />

      <Route
        path="/home"
        element={
          <DndProvider backend={HTML5Backend}>
            <Home />
          </DndProvider>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;

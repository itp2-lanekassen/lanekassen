import { useState } from 'react';
import ModalForm from './components/AbsenceForm';
import './index.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <h1 className="bg-primary">My App</h1>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && <ModalForm isOpen={isOpen} onClose={closeModal} />}
    </div>
  );
}

export default App;

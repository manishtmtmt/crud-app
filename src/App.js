import './App.css';
import { Box } from '@chakra-ui/react';
import Navbar from './Components/Navbar';
import MainRoutes from './Routes/MainRoutes';

function App() {
  return (
    <Box>
      <Navbar />
      <MainRoutes />
    </Box>
  );
}

export default App;

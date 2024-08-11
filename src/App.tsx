import './App.css';

import ResponsiveAppBar from './components/ResponsiveAppBar/ResponsiveAppBar'
import { PlannerMap } from './components/PlannerMap/PlannerMap';
import { BottomNavigationBar } from './components/BottomNav/BottomNav';
import { Paper } from '@mui/material';

function App() {
  return (
      <div className="App">
        <ResponsiveAppBar />
        <PlannerMap />
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigationBar />
        </Paper>
      </div>
  );
}

export default App;

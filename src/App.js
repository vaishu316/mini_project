import './App.css';
import Navbar from './Navbar';
import Login from './components/Login';  // Updated path




function App() {
  return (
    <div className="App">
      <Navbar />
      
      <main className="p-4">
        <h1 className="text-2xl font-bold">Welcome to RMK Hall Booking System</h1>
        <p className="mt-2">Use the navigation bar to explore availability, facilities, and book halls.</p>
      </main>
    </div>
  );
}

export default App;

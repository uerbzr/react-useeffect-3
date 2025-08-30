import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const url = "https://api.spacexdata.com/v3/launches";
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData);
      setFilteredData(jsonData); 
    };
    fetchData();
  }, []);

  
  useEffect(() => {
    const filtered = data.filter(launch =>
      launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  return (
    <div>
      <h1>SpaceX Launches (v3)</h1>
      <input
        type="text"
        placeholder="Search mission name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '300px' }}
      />
      <table>
        <thead>
          <tr>
            <td></td>
            <td>Flight</td>
            <td>Mission Name</td>
            <td>Launch Date (UTC)</td>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((launch, index) => (
            <tr key={index}>
                              <td>
        {launch.links.mission_patch ? (
          <img
            src={launch.links.mission_patch}
            alt={`${launch.mission_name} patch`}
            style={{ width: '50px', height: '50px' }}
          />
        ) : (
          'No patch'
        )}
      </td>
              <td>{launch.flight_number}</td>
              <td>{launch.mission_name}</td>
              <td>{launch.launch_date_utc}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App

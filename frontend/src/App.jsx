import { useEffect, useState } from 'react';
import getUser from '../node_modules/shared/src/api';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser(1);
      setUser(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Contract Testing Demo</h1>
      {user ? <p>User: {user.name}</p> : <p>Loading...</p>}
    </div>
  );
}

export default App;

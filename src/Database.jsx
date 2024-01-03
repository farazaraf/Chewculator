// src/App.jsx
import React, { useEffect, useState } from 'react';
import {collection, getDocs } from 'firebase/firestore'
import { db } from './firebase';


const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Example: Fetch data from Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'login'));
        const fetchedData = querySnapshot.docs.map(doc => doc.data());
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Firestore Data:</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

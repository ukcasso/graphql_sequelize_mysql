import React, { useState, useEffect } from "react";
import './App.css';

import { ApolloClient, InMemoryCache, useQuery } from '@apollo/client';
import { ApolloProvider, gql } from '@apollo/client';




  function App() {

    const [user, setUser] = useState("");
  

    const GET_USER = gql`
      query{
        getUserData{
          firstName
          lastName
          password
        }
      }
      `
      
      useEffect(() => {
        
        setUser(data?.getUserData)
    },[])

    console.log(user)
    const { loading, error, data } = useQuery(GET_USER);
    
    if (loading) return <p>'Loading...'</p>
    if (error) return `Error ${error.message}`
    
    return (
      <div data={user}>
        {console.log(user)}
        <h1 onChange={}>{data.getUserData.map((value, key)=> (<div>{value.firstName}</div>))}</h1>
        <h2>My first Apollo app 🚀</h2>
      </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import './App.css';

import { ApolloClient, InMemoryCache, useQuery } from '@apollo/client';
import { ApolloProvider, gql } from '@apollo/client';



  const GET_USER = gql`
    query{
      getUserData{
        firstName
        lastName
        password
      }
    }
  `

  function App() {
    const { loading, error, data } = useQuery(GET_USER);

    if (loading) return <p>'Loading...'</p>
    if (error) return `Error ${error.message}`

    return (
      <div>
        <h1>{data.getUserData[0].firstName}</h1>
        <h2>My first Apollo app 🚀</h2>
      </div>
  );
}

export default App;

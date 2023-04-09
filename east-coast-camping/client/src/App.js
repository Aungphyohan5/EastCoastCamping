import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React, { useState } from 'react';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import LoginForm from './components/loginForm';





const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


export default function App() {
  const [currentPage, setCurrentPage] = useState('Home');

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === 'Home') {
      return <Home />;
    }
    if (currentPage === 'Contact') {
      return <Contact />;
    }
    if (currentPage === 'Login') {
      return <LoginForm />;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <ApolloProvider client={client}>
      {/* We are passing the currentPage from state and the function to update it */}
      <Navbar currentPage={currentPage} handlePageChange={handlePageChange} />
      {/* Here we are calling the renderPage method which will return a component  */}
      {renderPage()}
    </ApolloProvider>
  );
}
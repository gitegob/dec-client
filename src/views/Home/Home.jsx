import React from 'react';
import './Home.css';
import DataEntryForm from '../../components/DataEntryForm/DataEntryForm';
import Results from '../../components/Results/Results';

const Home = () => {
  return (
    <>
      <DataEntryForm />
      <Results />
    </>
  );
};

export default Home;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import DataEntryForm from '../../components/DataEntryForm/DataEntryForm';
import Loader from '../../components/Loader/Loader';
import Results from '../../components/Results/Results';
import { AuthState } from '../../state/auth/AuthState';
import { EntriesState } from '../../state/entries/EntriesState';

const Home = () => {
  const { resultsVisible } = useContext(EntriesState);
  const { userData, logout, getUserData } = useContext(AuthState);
  const [loading, setloading] = useState(true);
  const tkn = localStorage.getItem('accessToken');
  useEffect(() => {
    const handleGetUserData = async () => {
      await getUserData(tkn);
      setloading(false);
    };
    handleGetUserData();
  }, []);
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          <header className="header">
            <div id="headeruserrole" className={userData.role || 'employee'}>
              {userData?.role || 'employee'}
            </div>
            <div id="headerusername">
              <span>
                <b>{userData?.username || 'Username'}</b>
              </span>{' '}
              <button type="button" id="logoutbtn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </header>
          <DataEntryForm />
          {resultsVisible && <Results />}
        </>
      )}
    </>
  );
};

export default Home;

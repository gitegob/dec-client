/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import DataEntryForm from '../../components/DataEntryForm/DataEntryForm';
import Loader from '../../components/Loader/Loader';
import Results from '../../components/Results/Results';
import { AuthState } from '../../state/auth/AuthState';
import { EntriesState } from '../../state/entries/EntriesState';
import AddUser from '../../components/AddUser/AddUser';

const Home = () => {
  const { resultsVisible } = useContext(EntriesState);
  const { userData, logout, getUserData } = useContext(AuthState);
  const [loading, setloading] = useState(true);
  const [panel, setpanel] = useState({ employee: false, manager: false });
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

  const showPanelManager = () => {
    setpanel({ ...panel, employee: false, manager: true });
  };
  const showPanelEmployee = () => {
    setpanel({ ...panel, manager: false, employee: true });
  };
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          <header className="header">
            <div className="upper-header">
              <div id="app-title">DECALC</div>
              <div id="header-userrole" className={userData?.role || 'employee'}>
                {userData?.role || 'employee'}
              </div>
              <div>
                <span>{userData?.username || 'Username'}</span>
                <button type="button" id="logoutbtn" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            </div>
            <div className="lower-header">
              <div></div>
              <div>
                {(userData?.role === 'admin' || userData?.role === 'manager') && (
                  <button type="button" className="add-user-btn" onClick={showPanelEmployee}>
                    Add Employee
                  </button>
                )}
                {userData?.role === 'admin' && (
                  <button type="button" className="add-user-btn" onClick={showPanelManager}>
                    Add Manager
                  </button>
                )}
              </div>
            </div>
          </header>
          {panel.employee && <AddUser employee />}
          {panel.manager && <AddUser manager />}
          {(panel.manager || panel.employee) && (
            <div id="cancelpanel">
              <div>
                <button type="button" onClick={() => setpanel({ ...panel, employee: false, manager: false })}>
                  Close
                </button>
              </div>
            </div>
          )}
          {!panel.employee && !panel.manager && <DataEntryForm />}
          {}
          {resultsVisible && !panel.employee && !panel.manager && <Results />}
        </>
      )}
    </>
  );
};

export default Home;

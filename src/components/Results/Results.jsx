import React, { useContext, useState } from 'react';
import { dlSheet } from '../../services/entries';
import { AuthState } from '../../state/auth/AuthState';
import { EntriesState } from '../../state/entries/EntriesState';
import Message from '../Message/Message';

const Results = () => {
  const [loadAll, setloadAll] = useState(false);
  const [loadDaily, setloadDaily] = useState(false);
  const [error, seterror] = useState('');
  const { hideResults, currentEntry, getEntries } = useContext(EntriesState);
  const { logout } = useContext(AuthState);

  const handleClose = () => hideResults();
  const handleDownload = async (range) => {
    range === 'daily' ? setloadDaily(true) : setloadAll(true);
    const { error, noAuth, data } = await getEntries(range === 'daily');
    setloadAll(false);
    setloadDaily(false);
    if (error) return seterror(error);
    if (noAuth) return logout();
    dlSheet(data.rows);
  };
  return (
    <div id="res">
      <h2 className="text-center">RESULTS</h2>
      <div className="row">
        <label htmlFor="">Purchase Value</label>
        <p id="purchaseVal">{currentEntry.purchaseVal}</p>
      </div>
      <div className="row">
        <label htmlFor="">Loan Amount</label>
        <p id="loanAmount">{currentEntry.loanAmount}</p>
      </div>
      <div className="row">
        <label htmlFor="">Principal</label>
        <p id="principal">{currentEntry.principal}</p>
      </div>
      <div className="row">
        <label htmlFor="">Interest Per Annum</label>
        <p id="interestPerAnnum">{currentEntry.interestPerAnnum}</p>
      </div>
      <div className="row">
        <label htmlFor="">Total Interest For Loan Period</label>
        <p id="totalInterestForLP">{currentEntry.totalInterestForLP}</p>
      </div>
      <div className="row">
        <label htmlFor="">Total Reduced Interest for Loan Period</label>
        <p id="totalReducedInterest">{currentEntry.totalReducedInterest}</p>
      </div>
      <div className="row">
        <label htmlFor="">Property Tax Per Annum</label>
        <p id="propertyTaxPerAnnum">{currentEntry.propertyTaxPerAnnum}</p>
      </div>
      <div className="row">
        <label htmlFor="">Property Tax For Loan Period</label>
        <p id="propertyTaxForLP">{currentEntry.propertyTaxForLP}</p>
      </div>
      <button type="button" id="download" disabled={loadDaily} onClick={() => handleDownload('daily')}>
        {loadDaily ? 'Wait...' : 'Download daily sheet'}
      </button>
      <button type="button" id="download" disabled={loadAll} onClick={() => handleDownload('whole')}>
        {loadAll ? 'Wait...' : 'Download whole sheet'}
      </button>
      <button type="button" id="close" onClick={handleClose}>
        Close
      </button>
      {error && <Message message={error} />}
    </div>
  );
};

export default Results;

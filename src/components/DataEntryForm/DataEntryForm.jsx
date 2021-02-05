import React, { useContext, useState } from 'react';
import { computeData } from '../../services/entries';
import { AuthState } from '../../state/auth/AuthState';
import { EntriesState } from '../../state/entries/EntriesState';
import Message from '../Message/Message';

const DataEntryForm = () => {
  const initialState = {
    customerrefno: ``,
    customername: '',
    citystate: '',
    guarantorname: '',
    guarantorrefno: ``,
    amount: '',
    DPRate: '',
    loanPeriod: '',
    AIRate: '',
    PVRRate: '',
    MPRRate: '',
    TIRRate: '',
    PTRRate: '',
  };
  const [state, setstate] = useState({ ...initialState });
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState('');
  const { updateCurrentEntry, showResults, saveEntry } = useContext(EntriesState);
  const { logout } = useContext(AuthState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror('');
    setloading(true);
    const results = computeData({
      customerrefno: `12   333   44   24   76   46   8`,
      customername: 'Brian Mr. Gitego',
      citystate: 'Kigali,  Rwanda',
      guarantorname: 'Rudoviko',
      guarantorrefno: `542288899789`,
      amount: '8653998.33',
      DPRate: '15',
      loanPeriod: '29',
      AIRate: '11',
      PVRRate: '14.4',
      MPRRate: '13.84',
      TIRRate: '11',
      PTRRate: '0',
    });
    const { error, noAuth } = await saveEntry(results.toServer);
    setloading(false);
    if (error) return seterror('Unable to save entry');
    if (noAuth) return logout();
    updateCurrentEntry(results.toResults, null);
    showResults();
  };
  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <form id="form" onSubmit={handleSubmit}>
      <h2 id="title">DATA ENTRY CALCULATOR</h2>
      {error && <Message message={error} />}
      <div className="data-col" id="data-details">
        <h4 className="text-center">Customer Info</h4>
        <input type="text" placeholder="Customer Reference Number" name="customerrefno" id="customerrefno" onChange={(e) => handleChange(e)} />
        <input type="text" placeholder="Customer Name" name="customername" id="customername" onChange={(e) => handleChange(e)} />
        <input type="text" placeholder="City & State" name="citystate" id="citystate" onChange={(e) => handleChange(e)} />
        <input type="text" placeholder="Guarantor Name" name="guarantorname" id="guarantorname" onChange={(e) => handleChange(e)} />
        <input type="text" placeholder="Guarantor Reference Number" name="guarantorrefno" id="guarantorrefno" onChange={(e) => handleChange(e)} />
      </div>
      <div className="data-col" id="data">
        <h4 className="text-center">Data Values</h4>
        <input type="text" placeholder="Amount" name="amount" id="amount" onChange={(e) => handleChange(e)} />
        <input type="text" placeholder="Down Payment Rate %" name="DPRate" id="DPRate" onChange={(e) => handleChange(e)} />
        <input type="text" placeholder="Loan Period (years)" name="loanPeriod" id="loanPeriod" onChange={(e) => handleChange(e)} />
        <input type="text" placeholder="Annual Interest Rate %" name="AIRate" id="AIRate" onChange={(e) => handleChange(e)} />
        <input type="text" placeholder="Purchase Value Reduction Rate %" name="PVRRate" id="PVRRate" onChange={(e) => handleChange(e)} />
        <input type="text" placeholder="Monthly Principal Reduction Rate %" name="MPRRate" id="MPRRate" onChange={(e) => handleChange(e)} />
        <input type="text" placeholder="Total Interest Reduction Rate %" name="TIRRate" id="TIRRate" onChange={(e) => handleChange(e)} />
        <input type="text" placeholder="Property Tax Reduction Rate %" name="PTRRate" id="PTRRate" onChange={(e) => handleChange(e)} />
      </div>
      <div id="actions">
        <button type="submit" id="submitbtn" disabled={loading}>
          {loading ? 'Saving...' : 'Compute'}
        </button>
        <button type="reset" id="clear">
          Clear
        </button>
      </div>
    </form>
  );
};

export default DataEntryForm;

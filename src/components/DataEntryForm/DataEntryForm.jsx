import React, { useState } from 'react';

const DataEntryForm = () => {
  const initialState = {
    Customer_reference_number: ``,
    Customer_name: '',
    City_and_state: '',
    Purchase_value_and_down_payment: ``,
    Loan_period_and_annual_interest: ``,
    Guarantor_name: '',
    Guarantor_reference_number: ``,
    Loan_amount_and_principal: ``,
    Total_interest_for_lp_and_property_tax_for_lp: '',
  };
  const [state, setstate] = useState({ initialState });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e, field) => {
    setstate({ ...state, [field]: e.target.value });
  };
  return (
    <form id="form" onSubmit={handleSubmit}>
      <h2 id="title">DATA ENTRY CALCULATOR</h2>
      <div className="data-col" id="data-details">
        <h4 className="text-center">Customer Info</h4>
        <input
          type="text"
          placeholder="Customer Reference Number"
          name="customerref"
          id="customerrefno"
          onChange={(e) => handleChange(e, 'Customer_reference_number')}
        />
        <input type="text" placeholder="Customer Name" name="customername" id="customername" />
        <input type="text" placeholder="City & State" name="citystate" id="citystate" />
        <input type="text" placeholder="Guarantor Name" name="guarantorname" id="guarantorname" />
        <input type="text" placeholder="Guarantor Reference Number" name="guarantorref" id="guarantorrefno" />
      </div>
      <div className="data-col" id="data">
        <h4 className="text-center">Data Values</h4>
        <input type="text" placeholder="Amount" name="amount" id="amount" />
        <input type="text" placeholder="Down Payment Rate %" name="DPRate" id="DPRate" />
        <input type="text" placeholder="Loan Period (years)" name="loanPeriod" id="loanPeriod" />
        <input type="text" placeholder="Annual Interest Rate %" name="AIRate" id="AIRate" />
        <input type="text" placeholder="Purchase Value Reduction Rate %" name="PVRRate" id="PVRRate" />
        <input type="text" placeholder="Monthly Principal Reduction Rate %" name="MPRRate" id="MPRRate" />
        <input type="text" placeholder="Total Interest Reduction Rate %" name="TIRRate" id="TIRRate" />
        <input type="text" placeholder="Property Tax Reduction Rate %" name="PTRRate" id="PTRRate" />
      </div>
      <div id="actions">
        <button type="submit" id="submitbtn">
          Compute
        </button>
        <button type="button" id="clear">
          Clear
        </button>
      </div>
    </form>
  );
};

export default DataEntryForm;

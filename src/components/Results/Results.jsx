import React from 'react'

const Results = () => {
  return (
    <div id="res">
      <h2 className="text-center">RESULTS</h2>
      <div className="row"><label for="">Purchase Value</label>
        <p id="purchaseVal">00000000000.000</p>
      </div>
      <div className="row"><label for="">Loan Amount</label>
        <p id="loanAmount">00000000</p>
      </div>
      <div className="row"><label for="">Principal</label>
        <p id="principal">00000000</p>
      </div>
      <div className="row"><label for="">Interest Per Annum</label>
        <p id="interestPerAnnum">00000000</p>
      </div>
      <div className="row"><label for="">Total Interest For Loan Period</label>
        <p id="totalInterestForLP">
          00000000</p>
      </div>
      <div className="row"><label for="">Total Reduced Interest for Loan Period</label>
        <p id="totalReducedInterest">00000000</p>
      </div>
      <div className="row"><label for="">Property Tax Per Annum</label>
        <p id="propertyTaxPerAnnum">00000000</p>
      </div>
      <div className="row"><label for="">Property Tax For Loan Period</label>
        <p id="propertyTaxForLP">
          00000000</p>
      </div>
      <button type="button" id="download">Download</button>
      <button type="button" id="close">Close</button>
    </div>
  )
}

export default Results

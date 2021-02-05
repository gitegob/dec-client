import { API_URL } from '../env';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { fetcher } from '../utils';

export const handleGetEntries = async (token) => {
  const res = await fetcher(`${API_URL}/data`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const handleCreateEntry = async (body, token) => {
  const res = await fetcher(`${API_URL}/data`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return res;
};

const presenter = (figure) => (Number(figure) || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",  ");
const deciFix = (num) => (num - num % 0.01).toFixed(2);

export const computeData = (state) => {
  let purchaseVal = state.amount - deciFix(state.amount * state.PVRRate / 100);
  let loanAmount = purchaseVal - deciFix(purchaseVal * state.DPRate / 100);
  let annualPrincipal = deciFix(loanAmount / state.loanPeriod);
  let monthlyPrincipal = deciFix(annualPrincipal / 12);
  let principal = deciFix(monthlyPrincipal * state.MPRRate / 100);
  let interestPerAnnum = deciFix(loanAmount * state.AIRate / 100);
  let totalInterestForLP = deciFix(interestPerAnnum * state.loanPeriod);
  let totalReducedInterest = deciFix(totalInterestForLP * state.TIRRate / 100);
  let propertyTaxPerAnnum = loanAmount * state.PTRRate / 100;
  let propertyTaxForLP = propertyTaxPerAnnum * state.loanPeriod;

  purchaseVal = presenter(purchaseVal);
  loanAmount = presenter(loanAmount);
  principal = presenter(principal);
  interestPerAnnum = presenter(interestPerAnnum);
  totalInterestForLP = presenter(totalInterestForLP);
  totalReducedInterest = presenter(totalReducedInterest);
  propertyTaxPerAnnum = presenter(propertyTaxPerAnnum);
  propertyTaxForLP = presenter(propertyTaxForLP);

  return ({
    toResults: {
      purchaseVal,
      loanAmount,
      principal,
      interestPerAnnum,
      totalInterestForLP,
      totalReducedInterest,
      propertyTaxPerAnnum,
      propertyTaxForLP
    },
    toServer: {
      Customer_reference_number: `${state.customerrefno}`,
      Customer_name: `${state.customername}`.toUpperCase(),
      City_and_state: `${state.citystate}`.toUpperCase(),
      Purchase_value_and_down_payment: `$ ${purchaseVal}  AND  ${state.DPRate} %`,
      Loan_period_and_annual_interest: `${state.loanPeriod} YEARS  AND  ${state.AIRate}%`,
      Guarantor_name: `${state.guarantorname}`.toUpperCase(),
      Guarantor_reference_number: `${state.guarantorrefno}`,
      Loan_amount_and_principal: `$ ${loanAmount} AND $ ${principal}`,
      Total_interest_for_lp_and_property_tax_for_lp: `$ ${totalInterestForLP} AND $ ${propertyTaxForLP}`,
    }
  });
};


export const dlSheet = (dataArr) => {
  var wb = XLSX.utils.book_new();
  wb.Props = {
    Title: 'Workbook',
    Subject: 'Data entry',
    Author: 'User',
    CreatedDate: new Date(Date.now()),
  };
  wb.SheetNames.push('sheet');
  const ws = XLSX.utils.json_to_sheet(dataArr, {
    header: [
      'Customer_reference_number',
      'Customer_name',
      'City_and_state',
      'Purchase_value_and_down_payment',
      'Loan_period_and_annual_interest',
      'Guarantor_name',
      'Guarantor_reference_number',
      'Loan_amount_and_principal',
      'Total_interest_for_lp_and_property_tax_for_lp',
    ],
  });
  wb.Sheets['sheet'] = ws;
  var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
  return saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'datasheet.xlsx');
};
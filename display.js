const data = JSON.parse(localStorage.getItem("proposalData") || "{}");

// Fill left-side fields
if (data.clientName) document.getElementById("clientName").textContent = `${data.clientName}`;
if (data.position) document.getElementById("position").textContent = `${data.position}`;
if (data.clientFirmName) document.getElementById("clientFirmName").textContent = `${data.clientFirmName}`;
if (data.address1) document.getElementById("address1").textContent = `${data.address1}`;
if (data.address2) document.getElementById("address2").textContent = `${data.address2}`;
if (data.clientSalutation && data.clientName) {
  document.getElementById("client3").textContent = `Dear ${data.clientSalutation} ${data.clientName}`;
} else if (data.clientName) {
  document.getElementById("client3").textContent = `Dear ${data.clientName}`;
}
if (data.projectName) document.getElementById("projectName2").textContent = `${data.projectName}`;
// Fill right-side date
if (data.date) {
  // Format date to mm/dd/yyyy
  const d = new Date(data.date);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  document.getElementById("date").textContent = `${mm}/${dd}/${yyyy}`;
}

// Fill project name and client2 if present

const services = data.services || [];
const table = document.querySelector("table");
let totalFee = 0;

// Set the fee type in the main content
const feeTypeText = data.feeType ? (data.feeType.charAt(0).toUpperCase() + data.feeType.slice(1)) : "lump sum fee";
const mainParagraph = document.querySelector("main p:nth-of-type(3)");
if (mainParagraph) {
  mainParagraph.textContent = `Sherpa Construction Consulting (Sherpa) is pleased to submit its ${feeTypeText.toLowerCase()} proposal to provide cost estimating services for the subject project. Our proposed services and associated fees are below:`;
}

if (services.length > 0) {
  services.forEach(item => {
    const row = document.createElement("tr");
    // Format fee with dollar sign
    let feeNum = parseFloat((item.fee || "0").replace(/[^\d.\-]/g, ""));
    let feeDisplay = isNaN(feeNum) ? item.fee : `$${feeNum.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    row.innerHTML = `<td>${item.service}</td><td>${feeDisplay}</td>`;
    table.appendChild(row);
    if (!isNaN(feeNum)) totalFee += feeNum;
  });
  // Add total row
  const totalRow = document.createElement("tr");
  totalRow.className = "total-row";
  totalRow.innerHTML = `<td style='font-weight:bold;'>Total Fee</td><td style='font-weight:bold;'>$${totalFee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>`;
  table.appendChild(totalRow);
}

// Make sure the footer is visible
document.addEventListener('DOMContentLoaded', function() {
  const footer = document.querySelector('.universal-footer');
  if (footer) {
    footer.style.display = 'block';
  }
});

const downloadBtn = document.getElementById('downloadButton');
if (downloadBtn) {
  downloadBtn.onclick = function() {
    // Ensure footer is visible before printing
    const footer = document.querySelector('.universal-footer');
    if (footer) {
      footer.style.display = 'block';
    }
    
    // Use window.print() which shows the print dialog
    window.print();
  };
}
const clientName = document.getElementById("clientName");
const position = document.getElementById("position");
const clientFirmName = document.getElementById("clientFirmName");
const projectName = document.getElementById("projectName");
const address1 = document.getElementById("address1");
const address2 = document.getElementById("address2");
const service = document.getElementById("service");
const serviceFee = document.getElementById("serviceFee");
const date = document.getElementById("date");

// Add Service button logic
const servicesContainer = document.getElementById("services-container");
const addServiceBtn = document.getElementById("addServiceBtn");

addServiceBtn.addEventListener("click", function () {
  const row = document.createElement("div");
  row.className = "service-row";
  row.innerHTML = `
    <input name="service[]" placeholder="Service" required />
    <input name="serviceFee[]" placeholder="Service Fee" required />
  `;
  servicesContainer.appendChild(row);
});

document.getElementById("proposalForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target).entries());

  // Collect all services
  const serviceInputs = document.querySelectorAll('input[name="service[]"]');
  const feeInputs = document.querySelectorAll('input[name="serviceFee[]"]');
  const services = [];
  for (let i = 0; i < serviceInputs.length; i++) {
    services.push({
      service: serviceInputs[i].value,
      fee: feeInputs[i].value
    });
  }
  formData.services = services;

  // Save clientSalutation
  formData.clientSalutation = document.querySelector('select[name="clientSalutation"]').value;

  // Save feeType
  formData.feeType = document.querySelector('select[name="feeType"]').value;

  localStorage.setItem("proposalData", JSON.stringify(formData));
  window.location.href = "display.html";
});


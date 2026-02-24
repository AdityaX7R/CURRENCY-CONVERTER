document.addEventListener("DOMContentLoaded", () => {

  const converterForm = document.getElementById("converter-form");
  const fromCurrency = document.getElementById("from-currency");
  const toCurrency = document.getElementById("to-currency");
  const amountInput = document.getElementById("amount");
  const resultDiv = document.getElementById("result");

  converterForm.addEventListener("submit", convertCurrency);

  fetchCurrencies();

  async function fetchCurrencies() {
    try {
      const response = await fetch("https://open.er-api.com/v6/latest/USD");
      const data = await response.json();

      const currencyOptions = Object.keys(data.rates);

      currencyOptions.forEach((currency) => {
        fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
        toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
      });

      fromCurrency.value = "USD";
      toCurrency.value = "INR";

    } catch (error) {
      resultDiv.textContent = "Error loading currencies.";
      console.error(error);
    }
  }

  async function convertCurrency(e) {
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      const response = await fetch(
        `https://open.er-api.com/v6/latest/${fromCurrencyValue}`
      );

      const data = await response.json();
      const rate = data.rates[toCurrencyValue];
      const convertedAmount = (amount * rate).toFixed(2);

      resultDiv.textContent =
        `${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;

    } catch (error) {
      resultDiv.textContent = "Conversion failed.";
      console.error(error);
    }
  }

});
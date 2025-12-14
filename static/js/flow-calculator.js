document.addEventListener('DOMContentLoaded', function() {
  const inputs = ['svc', 'ivc', 'mpa', 'rpa', 'lpa', 'lpv', 'rpv', 'ao'];

  inputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('input', calculateFlows);
    }
  });

  function calculateFlows() {
    const values = {};
    let allValid = true;

    inputs.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        if (!element.validity.valid) {
          allValid = false;
          values[id] = 0;
        } else {
          const value = element.value.trim();
          values[id] = value === '' ? 0 : parseFloat(value);
        }
      }
    });

    const resultsDiv = document.getElementById('results-1');
    if (resultsDiv) {
      resultsDiv.innerHTML = '<h4>Calculated Values:</h4>';
      if (!allValid) {
        resultsDiv.innerHTML += '<p style="color: var(--error-color, #ff4444);">⚠️ Some inputs contain invalid numbers</p>';
      }
      resultsDiv.innerHTML += '<p>Add your calculations here...</p>';
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const inputs = ['svc', 'ivc', 'mpa', 'rpa', 'lpa', 'lpv', 'rpv', 'ao'];

  inputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('input', function(e) {
        validateNumericInput(e.target);
        calculateFlows();
      });

      element.addEventListener('blur', function(e) {
        validateNumericInput(e.target);
      });
    }
  });

  function validateNumericInput(input) {
    const value = input.value.trim();

    // Empty is valid (will be treated as 0)
    if (value === '') {
      input.classList.remove('invalid-input');
      return true;
    }

    // Check if it's a valid number
    const num = parseFloat(value);
    const isValid = !isNaN(num) && isFinite(num);

    console.log('Validating:', value, 'Result:', isValid, 'Parsed:', num);

    if (isValid) {
      input.classList.remove('invalid-input');
      console.log('Removed invalid-input class');
    } else {
      input.classList.add('invalid-input');
      console.log('Added invalid-input class, current classes:', input.className);
    }

    return isValid;
  }

  function calculateFlows() {
    const values = {};
    let allValid = true;

    inputs.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        const value = element.value.trim();
        if (value === '') {
          values[id] = 0;
        } else {
          const num = parseFloat(value);
          if (!isNaN(num) && isFinite(num)) {
            values[id] = num;
          } else {
            values[id] = 0;
            allValid = false;
          }
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

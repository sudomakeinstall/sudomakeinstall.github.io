document.addEventListener('DOMContentLoaded', function() {
  const inputs = ['height', 'weight'];

  inputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('input', calculateBSA);
    }
  });

  function calculateBSA() {
    const heightEl = document.getElementById('height');
    const weightEl = document.getElementById('weight');
    const codeBlock = document.getElementById('bsa-results-code');

    if (!codeBlock) return;

    const heightValue = heightEl.value.trim();
    const weightValue = weightEl.value.trim();

    if (heightValue === '' && weightValue === '') {
      codeBlock.textContent = '';
      return;
    }

    if (heightValue === '' || weightValue === '') {
      codeBlock.textContent = '';
      return;
    }

    const height = parseFloat(heightValue);
    const weight = parseFloat(weightValue);

    if (!heightEl.validity.valid || !weightEl.validity.valid || isNaN(height) || isNaN(weight)) {
      codeBlock.textContent = '⚠️ Some inputs contain invalid numbers';
      return;
    }

    if (height > 0 && weight > 0) {
      const bsa = 0.007184 * Math.pow(height, 0.725) * Math.pow(weight, 0.425);
      const text = `Biometrics: ${weight.toFixed(0)} kg, ${height.toFixed(0)} cm, BSA ${bsa.toFixed(2)} m^2`;
      codeBlock.textContent = text;
    }
  }
});

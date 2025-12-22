document.addEventListener('DOMContentLoaded', function() {
  const inputs = ['height', 'weight', 'formula'];

  inputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('input', onInputChange);
      element.addEventListener('change', onInputChange);
    }
  });

  setupCopyLinkButton('copy-link-btn');

  const params = readUrlHash();
  if (Object.keys(params).length > 0) {
    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el && params[id] !== undefined) el.value = params[id];
    });
    calculateBSA();
  }

  function onInputChange() {
    calculateBSA();
    syncToUrl();
  }

  function syncToUrl() {
    const params = {};
    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.value.trim() !== '') params[id] = el.value.trim();
    });
    updateUrlHash(params);
  }

  function calculateBSA() {
    const heightEl = document.getElementById('height');
    const weightEl = document.getElementById('weight');
    const formulaEl = document.getElementById('formula');
    const codeBlock = document.getElementById('bsa-results-code');

    if (!codeBlock) return;

    const heightValue = heightEl.value.trim();
    const weightValue = weightEl.value.trim();
    const formula = formulaEl ? formulaEl.value : 'dubois';

    if (heightValue === '' && weightValue === '') {
      codeBlock.textContent = CALCULATOR_PLACEHOLDER;
      return;
    }

    if (heightValue === '' || weightValue === '') {
      codeBlock.textContent = CALCULATOR_PLACEHOLDER;
      return;
    }

    const height = parseFloat(heightValue);
    const weight = parseFloat(weightValue);

    if (!heightEl.validity.valid || !weightEl.validity.valid || isNaN(height) || isNaN(weight)) {
      codeBlock.textContent = '⚠️ Some inputs contain invalid numbers';
      return;
    }

    if (height > 0 && weight > 0) {
      let bsa;
      if (formula === 'mosteller') {
        bsa = Math.sqrt((height * weight) / 3600);
      } else {
        bsa = 0.007184 * Math.pow(height, 0.725) * Math.pow(weight, 0.425);
      }
      const text = `Biometrics: ${weight.toFixed(0)} kg, ${height.toFixed(0)} cm, BSA ${bsa.toFixed(2)} m^2`;
      codeBlock.textContent = text;
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const v1Input = document.getElementById('velocity-proximal');
  const v2Input = document.getElementById('velocity');
  const pressureInput = document.getElementById('pressure');
  const resultsCode = document.getElementById('bernoulli-results-code');

  if (!v1Input || !v2Input || !pressureInput || !resultsCode) return;

  let updatingFrom = null;
  let lastEdited = null;

  v1Input.addEventListener('input', function() {
    if (updatingFrom) return;
    if (lastEdited === 'pressure') {
      calculateV2();
    } else {
      calculatePressure();
    }
    syncToUrl();
  });

  v2Input.addEventListener('input', function() {
    if (updatingFrom) return;
    lastEdited = 'v2';
    calculatePressure();
    syncToUrl();
  });

  pressureInput.addEventListener('input', function() {
    if (updatingFrom) return;
    lastEdited = 'pressure';
    calculateV2();
    syncToUrl();
  });

  setupCopyLinkButton('copy-link-btn');

  const params = readUrlHash();
  if (Object.keys(params).length > 0) {
    if (params['velocity-proximal'] !== undefined) v1Input.value = params['velocity-proximal'];
    if (params['velocity'] !== undefined) v2Input.value = params['velocity'];
    if (params['pressure'] !== undefined) pressureInput.value = params['pressure'];
    lastEdited = params['lastEdited'] || null;
    if (lastEdited === 'pressure') {
      calculateV2();
    } else if (v2Input.value.trim() !== '') {
      calculatePressure();
    }
  }

  function syncToUrl() {
    const params = {};
    if (v1Input.value.trim() !== '') params['velocity-proximal'] = v1Input.value.trim();
    if (v2Input.value.trim() !== '') params['velocity'] = v2Input.value.trim();
    if (pressureInput.value.trim() !== '') params['pressure'] = pressureInput.value.trim();
    if (lastEdited) params['lastEdited'] = lastEdited;
    updateUrlHash(params);
  }

  function calculatePressure() {
    const v2Value = v2Input.value.trim();
    const v1Value = v1Input.value.trim();

    if (v2Value === '') {
      resultsCode.textContent = CALCULATOR_PLACEHOLDER;
      updatingFrom = 'v2';
      pressureInput.value = '';
      updatingFrom = null;
      return;
    }

    const v2 = parseFloat(v2Value);
    const v1 = v1Value === '' ? 0 : parseFloat(v1Value);

    if (!v2Input.validity.valid || isNaN(v2) || v2 < 0) {
      resultsCode.textContent = '⚠️ Invalid vd (must be ≥ 0 m/s)';
      updatingFrom = 'v2';
      pressureInput.value = '';
      updatingFrom = null;
      return;
    }

    if (v1Value !== '' && (!v1Input.validity.valid || isNaN(v1) || v1 < 0)) {
      resultsCode.textContent = '⚠️ Invalid vp (must be ≥ 0 m/s)';
      updatingFrom = 'v2';
      pressureInput.value = '';
      updatingFrom = null;
      return;
    }

    const pressure = 4 * (v2 * v2 - v1 * v1);
    updatingFrom = 'v2';
    pressureInput.value = pressure.toFixed(2);
    updatingFrom = null;

    if (v1 > 0) {
      resultsCode.textContent = `vp = ${v1.toFixed(2)} m/s\nvd = ${v2.toFixed(2)} m/s\ndP = ${pressure.toFixed(2)} mmHg`;
    } else {
      resultsCode.textContent = `vd = ${v2.toFixed(2)} m/s\ndP = ${pressure.toFixed(2)} mmHg`;
    }
  }

  function calculateV2() {
    const pressureValue = pressureInput.value.trim();
    const v1Value = v1Input.value.trim();

    if (pressureValue === '') {
      resultsCode.textContent = CALCULATOR_PLACEHOLDER;
      updatingFrom = 'pressure';
      v2Input.value = '';
      updatingFrom = null;
      return;
    }

    const pressure = parseFloat(pressureValue);
    const v1 = v1Value === '' ? 0 : parseFloat(v1Value);

    if (!pressureInput.validity.valid || isNaN(pressure) || pressure < 0) {
      resultsCode.textContent = '⚠️ Invalid dP (must be ≥ 0 mmHg)';
      updatingFrom = 'pressure';
      v2Input.value = '';
      updatingFrom = null;
      return;
    }

    if (v1Value !== '' && (!v1Input.validity.valid || isNaN(v1) || v1 < 0)) {
      resultsCode.textContent = '⚠️ Invalid vp (must be ≥ 0 m/s)';
      updatingFrom = 'pressure';
      v2Input.value = '';
      updatingFrom = null;
      return;
    }

    const v2 = Math.sqrt(pressure / 4 + v1 * v1);
    updatingFrom = 'pressure';
    v2Input.value = v2.toFixed(3);
    updatingFrom = null;

    if (v1 > 0) {
      resultsCode.textContent = `vp = ${v1.toFixed(2)} m/s\ndP = ${pressure.toFixed(2)} mmHg\nvd = ${v2.toFixed(3)} m/s`;
    } else {
      resultsCode.textContent = `dP = ${pressure.toFixed(2)} mmHg\nvd = ${v2.toFixed(3)} m/s`;
    }
  }
});

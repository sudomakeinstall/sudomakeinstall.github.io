document.addEventListener('DOMContentLoaded', function() {
  const inputs = ['t1-pre-myo', 't1-post-myo', 't1-pre-blood', 't1-post-blood', 'hematocrit'];

  inputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('input', onInputChange);
    }
  });

  setupCopyLinkButton('copy-link-btn');

  const params = readUrlHash();
  if (Object.keys(params).length > 0) {
    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el && params[id] !== undefined) el.value = params[id];
    });
    calculateECV();
  }

  function onInputChange() {
    calculateECV();
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

  function parsePositiveT1(el) {
    if (el.value.trim() === '') return null;
    const val = parseFloat(el.value.trim());
    if (!el.validity.valid || isNaN(val)) return '⚠️ Invalid T1 value';
    if (val <= 0) return '⚠️ T1 values must be greater than 0';
    return val;
  }

  function calculateECV() {
    const t1PreMyoEl  = document.getElementById('t1-pre-myo');
    const t1PostMyoEl = document.getElementById('t1-post-myo');
    const t1PreBloodEl  = document.getElementById('t1-pre-blood');
    const t1PostBloodEl = document.getElementById('t1-post-blood');
    const hematocritEl  = document.getElementById('hematocrit');
    const codeBlock = document.getElementById('ecv-results-code');

    if (!codeBlock) return;

    const hctRaw = hematocritEl.value.trim();
    const t1PreMyoRaw  = t1PreMyoEl.value.trim();
    const t1PostMyoRaw = t1PostMyoEl.value.trim();
    const t1PreBloodRaw  = t1PreBloodEl.value.trim();
    const t1PostBloodRaw = t1PostBloodEl.value.trim();

    const hasAnyInput = hctRaw !== '' || t1PreMyoRaw !== '' || t1PostMyoRaw !== '' ||
                        t1PreBloodRaw !== '' || t1PostBloodRaw !== '';

    if (!hasAnyInput) {
      codeBlock.textContent = CALCULATOR_PLACEHOLDER;
      return;
    }

    const inputLines = [];
    const outputLines = [];
    const errors = [];

    // Hematocrit
    let hematocrit = null;
    if (hctRaw !== '') {
      const val = parseFloat(hctRaw);
      if (!hematocritEl.validity.valid || isNaN(val)) {
        errors.push('⚠️ Invalid hematocrit');
      } else if (val < 0 || val > 100) {
        errors.push('⚠️ Hematocrit must be between 0 and 100%');
      } else {
        hematocrit = val;
        inputLines.push(`Hematocrit = ${hematocrit.toFixed(1)}%`);
      }
    }

    // T1 pre myo
    let t1PreMyo = null;
    if (t1PreMyoRaw !== '') {
      const result = parsePositiveT1(t1PreMyoEl);
      if (typeof result === 'string') { errors.push(result); }
      else { t1PreMyo = result; inputLines.push(`T1 pre (myo) = ${t1PreMyo.toFixed(1)} ms`); }
    }

    // Remaining T1 values (not shown in readout)
    const t1PostMyo  = parsePositiveT1(t1PostMyoEl);
    const t1PreBlood  = parsePositiveT1(t1PreBloodEl);
    const t1PostBlood = parsePositiveT1(t1PostBloodEl);

    if (typeof t1PostMyo  === 'string') errors.push(t1PostMyo);
    if (typeof t1PreBlood  === 'string') errors.push(t1PreBlood);
    if (typeof t1PostBlood === 'string') errors.push(t1PostBlood);

    // Lambda — requires all four T1 values
    let lambda = null;
    if (t1PreMyo !== null && typeof t1PostMyo === 'number' &&
        typeof t1PreBlood === 'number' && typeof t1PostBlood === 'number') {
      const deltaR1Myo   = (1 / t1PostMyo)   - (1 / t1PreMyo);
      const deltaR1Blood = (1 / t1PostBlood) - (1 / t1PreBlood);
      if (Math.abs(deltaR1Blood) < 0.0001) {
        errors.push('⚠️ Blood T1 change too small (division by zero)');
      } else {
        lambda = deltaR1Myo / deltaR1Blood;
        lambda = deltaR1Myo / deltaR1Blood;
      }
    }

    // ECV — requires lambda and hematocrit
    if (lambda !== null && hematocrit !== null) {
      const ecv = (1 - hematocrit / 100) * lambda * 100;
      if (ecv < 0) {
        errors.push('⚠️ Calculated ECV is negative (check T1 values)');
      } else {
        outputLines.push(`ECV = ${ecv.toFixed(1)}%`);
      }
    }

    if (lambda !== null) outputLines.push(`λ = ${lambda.toFixed(3)}`);

    const sections = [];
    if (inputLines.length > 0)  sections.push(inputLines.join('\n'));
    if (outputLines.length > 0) sections.push(outputLines.join('\n'));
    if (errors.length > 0)      sections.push(errors.join('\n'));

    codeBlock.textContent = sections.join('\n\n') || CALCULATOR_PLACEHOLDER;
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const inputs = ['t1-pre-myo', 't1-post-myo', 't1-pre-blood', 't1-post-blood', 'hematocrit'];

  inputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('input', calculateECV);
    }
  });

  function calculateECV() {
    const t1PreMyoEl = document.getElementById('t1-pre-myo');
    const t1PostMyoEl = document.getElementById('t1-post-myo');
    const t1PreBloodEl = document.getElementById('t1-pre-blood');
    const t1PostBloodEl = document.getElementById('t1-post-blood');
    const hematocritEl = document.getElementById('hematocrit');
    const codeBlock = document.getElementById('ecv-results-code');

    if (!codeBlock) return;

    const t1PreMyoValue = t1PreMyoEl.value.trim();
    const t1PostMyoValue = t1PostMyoEl.value.trim();
    const t1PreBloodValue = t1PreBloodEl.value.trim();
    const t1PostBloodValue = t1PostBloodEl.value.trim();
    const hematocritValue = hematocritEl.value.trim();

    const hasAnyInput = t1PreMyoValue !== '' || t1PostMyoValue !== '' ||
                        t1PreBloodValue !== '' || t1PostBloodValue !== '' ||
                        hematocritValue !== '';

    if (!hasAnyInput) {
      codeBlock.textContent = '';
      return;
    }

    if (t1PreMyoValue === '' || t1PostMyoValue === '' ||
        t1PreBloodValue === '' || t1PostBloodValue === '' ||
        hematocritValue === '') {
      codeBlock.textContent = '';
      return;
    }

    const t1PreMyo = parseFloat(t1PreMyoValue);
    const t1PostMyo = parseFloat(t1PostMyoValue);
    const t1PreBlood = parseFloat(t1PreBloodValue);
    const t1PostBlood = parseFloat(t1PostBloodValue);
    const hematocrit = parseFloat(hematocritValue);

    if (!t1PreMyoEl.validity.valid || !t1PostMyoEl.validity.valid ||
        !t1PreBloodEl.validity.valid || !t1PostBloodEl.validity.valid ||
        !hematocritEl.validity.valid ||
        isNaN(t1PreMyo) || isNaN(t1PostMyo) ||
        isNaN(t1PreBlood) || isNaN(t1PostBlood) || isNaN(hematocrit)) {
      codeBlock.textContent = '⚠️ Some inputs contain invalid numbers';
      return;
    }

    if (t1PreMyo <= 0 || t1PostMyo <= 0 || t1PreBlood <= 0 || t1PostBlood <= 0) {
      codeBlock.textContent = '⚠️ T1 values must be greater than 0';
      return;
    }

    if (hematocrit < 0 || hematocrit > 100) {
      codeBlock.textContent = '⚠️ Hematocrit must be between 0 and 100%';
      return;
    }

    const deltaR1Myo = (1 / t1PostMyo) - (1 / t1PreMyo);
    const deltaR1Blood = (1 / t1PostBlood) - (1 / t1PreBlood);

    if (Math.abs(deltaR1Blood) < 0.0001) {
      codeBlock.textContent = '⚠️ Blood T1 change too small (division by zero)';
      return;
    }

    const hctDecimal = hematocrit / 100;
    const ecv = (1 - hctDecimal) * (deltaR1Myo / deltaR1Blood) * 100;

    if (ecv < 0) {
      codeBlock.textContent = '⚠️ Calculated ECV is negative (check T1 values)';
      return;
    }

    const text = `T1 pre (myo) = ${t1PreMyo.toFixed(1)} ms
T1 post (myo) = ${t1PostMyo.toFixed(1)} ms
T1 pre (blood) = ${t1PreBlood.toFixed(1)} ms
T1 post (blood) = ${t1PostBlood.toFixed(1)} ms
Hematocrit = ${hematocrit.toFixed(1)}%

ECV = ${ecv.toFixed(1)}%`;
    codeBlock.textContent = text;
  }
});

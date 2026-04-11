document.addEventListener('DOMContentLoaded', function() {
  const inputs = ['height', 'weight', 'rsvc', 'lsvc', 'glenn', 'ivc', 'fontan', 'mpa', 'rpa', 'lpa', 'rspv', 'rmpv', 'ripv', 'lspv', 'lmpv', 'lipv', 'ao'];

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
    calculateFlows();
  }

  function onInputChange() {
    calculateFlows();
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

  function calculateFlows() {
    const values = {};
    const hasValue = {};
    let allValid = true;

    inputs.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        if (!element.validity.valid) {
          allValid = false;
          values[id] = 0;
          hasValue[id] = false;
        } else {
          const value = element.value.trim();
          hasValue[id] = value !== '';
          values[id] = value === '' ? 0 : parseFloat(value);
        }
      }
    });

    const hasAnyInput = Object.values(hasValue).some(v => v);
    if (!hasAnyInput) {
      const codeBlock = document.getElementById('flow-results-code');
      if (codeBlock) codeBlock.textContent = CALCULATOR_PLACEHOLDER;
      return;
    }

    let text = '';
    let hasResults = false;

    const hasUpperCaval = hasValue.rsvc || hasValue.lsvc || hasValue.glenn;
    const upperCaval = (hasValue.rsvc ? values.rsvc : 0) + (hasValue.lsvc ? values.lsvc : 0) + (hasValue.glenn ? values.glenn : 0);
    const hasLowerCaval = hasValue.ivc || hasValue.fontan;
    const lowerCaval = (hasValue.ivc ? values.ivc : 0) + (hasValue.fontan ? values.fontan : 0);
    const qsv = hasUpperCaval && hasLowerCaval ? upperCaval + lowerCaval : null;
    const hasRPV = hasValue.rspv || hasValue.rmpv || hasValue.ripv;
    const hasLPV = hasValue.lspv || hasValue.lmpv || hasValue.lipv;
    const rpvTotal = (hasValue.rspv ? values.rspv : 0) + (hasValue.rmpv ? values.rmpv : 0) + (hasValue.ripv ? values.ripv : 0);
    const lpvTotal = (hasValue.lspv ? values.lspv : 0) + (hasValue.lmpv ? values.lmpv : 0) + (hasValue.lipv ? values.lipv : 0);
    const qpv = hasRPV && hasLPV ? rpvTotal + lpvTotal : null;
    const qpa = hasValue.rpa && hasValue.lpa ? values.rpa + values.lpa : null;
    const mpaValue = hasValue.mpa ? values.mpa : qpa;

    let bsa = null;
    if (hasValue.height && hasValue.weight && values.height > 0 && values.weight > 0) {
      bsa = 0.007184 * Math.pow(values.height, 0.725) * Math.pow(values.weight, 0.425);
      text += `Biometrics: ${values.weight.toFixed(0)} kg, ${values.height.toFixed(0)} cm, BSA ${bsa.toFixed(2)} m^2 (DuBois)\n\n`;
      hasResults = true;
    }

    const flowInputs = ['rsvc', 'lsvc', 'glenn', 'ivc', 'fontan', 'mpa', 'rpa', 'lpa', 'rspv', 'rmpv', 'ripv', 'lspv', 'lmpv', 'lipv', 'ao'];
    const hasAnyFlow = flowInputs.some(id => hasValue[id]);

    if (hasAnyFlow) {
      text += '\nFlows:\n\n';

      if (hasValue.rsvc) {
        text += `RSVC: ${values.rsvc.toFixed(2)} L/min`;
        if (bsa) text += `, ${(values.rsvc / bsa).toFixed(2)} L/min/m^2`;
        text += '\n';
      }

      if (hasValue.lsvc) {
        text += `LSVC: ${values.lsvc.toFixed(2)} L/min`;
        if (bsa) text += `, ${(values.lsvc / bsa).toFixed(2)} L/min/m^2`;
        text += '\n';
      }

      if (hasValue.glenn) {
        text += `Glenn: ${values.glenn.toFixed(2)} L/min`;
        if (bsa) text += `, ${(values.glenn / bsa).toFixed(2)} L/min/m^2`;
        text += '\n';
      }

      if (hasValue.ivc) {
        text += `IVC: ${values.ivc.toFixed(2)} L/min`;
        if (bsa) text += `, ${(values.ivc / bsa).toFixed(2)} L/min/m^2`;
        text += '\n';
      }

      if (hasValue.fontan) {
        text += `Fontan: ${values.fontan.toFixed(2)} L/min`;
        if (bsa) text += `, ${(values.fontan / bsa).toFixed(2)} L/min/m^2`;
        text += '\n';
      }

      if (qsv !== null) {
        text += `Total caval return: ${qsv.toFixed(2)} L/min`;
        if (bsa) text += `, ${(qsv / bsa).toFixed(2)} L/min/m^2`;
        text += '\n\n';
      }

      if (hasValue.mpa) {
        text += `MPA: ${values.mpa.toFixed(2)} L/min`;
        if (bsa) text += `, ${(values.mpa / bsa).toFixed(2)} L/min/m^2`;
        text += '\n';
      } else if (qpa !== null) {
        text += `Total pulmonary arterial flow: ${qpa.toFixed(2)} L/min`;
        if (bsa) text += `, ${(qpa / bsa).toFixed(2)} L/min/m^2`;
        text += '\n';
      }

      if (hasValue.rpa) {
        text += `RPA: ${values.rpa.toFixed(2)} L/min`;
        if (bsa) text += `, ${(values.rpa / bsa).toFixed(2)} L/min/m^2`;
        text += '\n';
      }

      if (hasValue.lpa) {
        text += `LPA: ${values.lpa.toFixed(2)} L/min`;
        if (bsa) text += `, ${(values.lpa / bsa).toFixed(2)} L/min/m^2`;
        text += '\n\n';
      } else if (hasValue.mpa || qpa !== null) {
        text += '\n';
      }

      if (hasRPV) {
        text += `RPV: ${rpvTotal.toFixed(2)} L/min`;
        if (bsa) text += `, ${(rpvTotal / bsa).toFixed(2)} L/min/m^2`;
        text += '\n';
      }

      if (hasLPV) {
        text += `LPV: ${lpvTotal.toFixed(2)} L/min`;
        if (bsa) text += `, ${(lpvTotal / bsa).toFixed(2)} L/min/m^2`;
        text += '\n';
      }

      if (qpv !== null) {
        text += `Total pulmonary venous return: ${qpv.toFixed(2)} L/min`;
        if (bsa) text += `, ${(qpv / bsa).toFixed(2)} L/min/m^2`;
        text += '\n\n';
      }

      if (hasValue.ao) {
        text += `Ao: ${values.ao.toFixed(2)} L/min`;
        if (bsa) text += `, ${(values.ao / bsa).toFixed(2)} L/min/m^2`;
        text += '\n\n';
      }

      hasResults = true;
    }

    const hasArterialSplit = hasValue.rpa && hasValue.lpa;
    const hasVenousSplit = hasLPV && hasRPV && qpv > 0;

    if (hasArterialSplit || hasVenousSplit) {
      text += '\nLung flow splits:\n\n';

      if (hasArterialSplit) {
        const totalPA = values.rpa + values.lpa;
        if (totalPA > 0) {
          const rpaPercent = (values.rpa / totalPA * 100).toFixed(1);
          const lpaPercent = (values.lpa / totalPA * 100).toFixed(1);
          text += `Arterial: R ${rpaPercent}% / L ${lpaPercent}%\n`;
        }
      }

      if (hasVenousSplit) {
        const rpvPercent = (rpvTotal / qpv * 100).toFixed(1);
        const lpvPercent = (lpvTotal / qpv * 100).toFixed(1);
        text += `Venous: R ${rpvPercent}% / L ${lpvPercent}%\n`;
      }

      hasResults = true;
    }

    const hasShuntFractions = (mpaValue !== null && hasValue.ao && values.ao > 0) ||
                              (qpv !== null && hasValue.ao && values.ao > 0) ||
                              (mpaValue !== null && qsv !== null && qsv > 0) ||
                              (qpv !== null && qsv !== null && qsv > 0);

    if (hasShuntFractions) {
      text += '\nShunt fractions:\n\n';

      if (mpaValue !== null && hasValue.ao && values.ao > 0) {
        const qpaQsa = (mpaValue / values.ao).toFixed(2);
        text += `Qpa:Qsa: ${qpaQsa}\n`;
      }

      if (qpv !== null && hasValue.ao && values.ao > 0) {
        const qpvQsa = (qpv / values.ao).toFixed(2);
        text += `Qpv:Qsa: ${qpvQsa}\n`;
      }

      if (mpaValue !== null && qsv !== null && qsv > 0) {
        const qpaQsv = (mpaValue / qsv).toFixed(2);
        text += `Qpa:Qsv: ${qpaQsv}\n`;
      }

      if (qpv !== null && qsv !== null && qsv > 0) {
        const qpvQsv = (qpv / qsv).toFixed(2);
        text += `Qpv:Qsv: ${qpvQsv}\n`;
      }

      hasResults = true;
    }

    const hasCollateral = (hasValue.ao && qsv !== null) ||
                          (qpv !== null && mpaValue !== null) ||
                          (hasValue.ao && qsv !== null && qpv !== null && mpaValue !== null);

    if (hasCollateral) {
      text += '\nCollateral flow:\n\n';

      if (hasValue.ao && qsv !== null) {
        const qCollSyst = values.ao - qsv;
        const qCollSystPercent = values.ao > 0 ? (qCollSyst / values.ao * 100).toFixed(1) : '0.0';
        text += `Qcoll-syst (Qsa - Qsv): ${qCollSyst.toFixed(2)} L/min (${qCollSystPercent}% of aortic flow)\n`;
      }

      if (qpv !== null && mpaValue !== null) {
        const qCollPulm = qpv - mpaValue;
        const qCollPulmPercent = hasValue.ao && values.ao > 0 ? (qCollPulm / values.ao * 100).toFixed(1) : '0.0';
        text += `Qcoll-pulm (Qpv - Qpa): ${qCollPulm.toFixed(2)} L/min (${qCollPulmPercent}% of aortic flow)\n`;
      }

      if (hasValue.ao && qsv !== null && qpv !== null && mpaValue !== null) {
        const qCollSyst = values.ao - qsv;
        const qCollPulm = qpv - mpaValue;
        const qCollAvg = (qCollSyst + qCollPulm) / 2;
        const qCollAvgPercent = values.ao > 0 ? (qCollAvg / values.ao * 100).toFixed(1) : '0.0';
        text += `Qcoll ((Qcoll-syst + Qcoll-pulm) / 2): ${qCollAvg.toFixed(2)} L/min (${qCollAvgPercent}% of aortic flow)\n`;
      }

      hasResults = true;
    }

    const codeBlock = document.getElementById('flow-results-code');
    if (codeBlock) {
      if (hasResults) {
        codeBlock.textContent = text.trim();
      } else {
        codeBlock.textContent = CALCULATOR_PLACEHOLDER;
      }
    }
  }
});

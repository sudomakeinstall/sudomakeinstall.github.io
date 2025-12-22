document.addEventListener('DOMContentLoaded', function() {
  const inputs = ['height', 'weight', 'svc', 'ivc', 'mpa', 'rpa', 'lpa', 'lpv', 'rpv', 'ao'];

  inputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('input', calculateFlows);
    }
  });

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

    const qsv = hasValue.svc && hasValue.ivc ? values.svc + values.ivc : null;
    const qpv = hasValue.lpv && hasValue.rpv ? values.lpv + values.rpv : null;
    const qpa = hasValue.rpa && hasValue.lpa ? values.rpa + values.lpa : null;
    const mpaValue = hasValue.mpa ? values.mpa : qpa;

    let bsa = null;
    if (hasValue.height && hasValue.weight && values.height > 0 && values.weight > 0) {
      bsa = 0.007184 * Math.pow(values.height, 0.725) * Math.pow(values.weight, 0.425);
      text += `Biometrics: ${values.weight.toFixed(0)} kg, ${values.height.toFixed(0)} cm, BSA ${bsa.toFixed(2)} m^2 (DuBois)\n\n`;
      hasResults = true;
    }

    const flowInputs = ['svc', 'ivc', 'mpa', 'rpa', 'lpa', 'rpv', 'lpv', 'ao'];
    const hasAnyFlow = flowInputs.some(id => hasValue[id]);

    if (hasAnyFlow) {
      text += '\nFlows:\n\n';

      if (hasValue.svc) {
        text += `SVC/Glenn: ${values.svc.toFixed(2)} L/min`;
        if (bsa) text += `, ${(values.svc / bsa).toFixed(2)} L/min/m^2`;
        text += '\n';
      }

      if (hasValue.ivc) {
        text += `IVC/Fontan: ${values.ivc.toFixed(2)} L/min`;
        if (bsa) text += `, ${(values.ivc / bsa).toFixed(2)} L/min/m^2`;
        text += '\n';
      }

      if (qsv !== null) {
        text += `Total caval return: ${qsv.toFixed(2)} L/min`;
        if (bsa) text += `, ${(qsv / bsa).toFixed(2)} L/min/m^2`;
        text += '\n\n';
      }

      if (hasValue.rpa) {
        text += `RPA: ${values.rpa.toFixed(2)} L/min`;
        if (bsa) text += `, ${(values.rpa / bsa).toFixed(2)} L/min/m^2`;
        text += '\n';
      }

      if (hasValue.lpa) {
        text += `LPA: ${values.lpa.toFixed(2)} L/min`;
        if (bsa) text += `, ${(values.lpa / bsa).toFixed(2)} L/min/m^2`;
        text += '\n';
      }

      if (hasValue.mpa) {
        text += `MPA: ${values.mpa.toFixed(2)} L/min`;
        if (bsa) text += `, ${(values.mpa / bsa).toFixed(2)} L/min/m^2`;
        text += '\n\n';
      } else if (qpa !== null) {
        text += `Total pulmonary arterial flow: ${qpa.toFixed(2)} L/min`;
        if (bsa) text += `, ${(qpa / bsa).toFixed(2)} L/min/m^2`;
        text += '\n\n';
      }

      if (hasValue.rpv) {
        text += `RPV: ${values.rpv.toFixed(2)} L/min`;
        if (bsa) text += `, ${(values.rpv / bsa).toFixed(2)} L/min/m^2`;
        text += '\n';
      }

      if (hasValue.lpv) {
        text += `LPV: ${values.lpv.toFixed(2)} L/min`;
        if (bsa) text += `, ${(values.lpv / bsa).toFixed(2)} L/min/m^2`;
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
    const hasVenousSplit = hasValue.lpv && hasValue.rpv && qpv > 0;

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
        const lpvPercent = (values.lpv / qpv * 100).toFixed(1);
        const rpvPercent = (values.rpv / qpv * 100).toFixed(1);
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

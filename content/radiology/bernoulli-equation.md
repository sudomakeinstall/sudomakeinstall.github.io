+++
title = "Bernoulli Equation Calculator"
description = "Calculate pressure gradients from velocities using the modified Bernoulli equation"
date = 2025-12-17
weight = 3

[extra]
katex = true
stylesheets = ["css/calculator-common.css"]
scripts = ["js/bernoulli-calculator.js"]
+++

# Bernoulli Equation

## Interactive Calculator

<div id="bernoulli-calculator">
  <div class="bernoulli-inputs">
    <div class="input-group">
      <label for="velocity-proximal">$v_p$:</label>
      <input type="number" step="any" inputmode="decimal" id="velocity-proximal" min="0" placeholder="Optional">
      <span class="unit">m/s</span>
    </div>
    <div class="input-group">
      <label for="velocity">$v_d$:</label>
      <input type="number" step="any" inputmode="decimal" id="velocity" min="0" placeholder="0.0">
      <span class="unit">m/s</span>
    </div>
    <div class="input-group">
      <label for="pressure">$\Delta P$:</label>
      <input type="number" step="any" inputmode="decimal" id="pressure" min="0" placeholder="0.0">
      <span class="unit">mmHg</span>
    </div>
  </div>

  <h3>Calculated Values:</h3>
  <pre><code id="bernoulli-results-code">Results will appear here.</code></pre>
</div>

## Derivation

### Full Bernoulli Equation

The Bernoulli equation describes conservation of energy in fluid flow. For two points along a streamline:

$$
P_p + \frac{1}{2}\rho v_p^2 + \rho g h_p = P_d + \frac{1}{2}\rho v_d^2 + \rho g h_d
$$

where:
- $P$ = pressure (Pa)
- $\rho$ = fluid density (kg/m³)
- $v$ = velocity (m/s)
- $g$ = gravitational acceleration (m/s²)
- $h$ = height (m)
- subscript $p$ = proximal (upstream)
- subscript $d$ = distal (downstream/stenosis)

### Simplifications for Echocardiography

In cardiac applications:

1. **Neglect gravitational terms**: Height differences are small ($\rho g \Delta h \ll \Delta P$)

This gives the **Extended Bernoulli equation**:

$$
P_p + \frac{1}{2}\rho v_p^2 = P_d + \frac{1}{2}\rho v_d^2
$$

2. **Assume proximal velocity negligible**: For stenotic jets, $v_p \ll v_d$

This gives:

$$
P_p - P_d = \frac{1}{2}\rho v_d^2
$$

### Unit Conversion to Clinical Practice

With blood density $\rho \approx 1060$ kg/m³:

$$
\Delta P = \frac{1}{2} \times 1060 \text{ kg/m}^3 \times v_d^2 \text{ m}^2/\text{s}^2 = 530v_d^2 \text{ Pa}
$$

Converting from Pascals to mmHg (1 mmHg = 133.322 Pa):

$$
\Delta P = \frac{530v_d^2}{133.322} \approx 3.98v_d^2 \approx 4v_d^2 \text{ mmHg}
$$

### Modified Bernoulli Equation

$$
\boxed{\Delta P = 4v_d^2}
$$

where:
- $\Delta P$ = pressure gradient (mmHg)
- $v_d$ = distal (peak) velocity (m/s)

### Extended Bernoulli Equation

For cases where proximal velocity is significant:

$$
\boxed{\Delta P = 4(v_d^2 - v_p^2)}
$$

where:
- $\Delta P$ = pressure gradient (mmHg)
- $v_d$ = distal velocity (m/s)
- $v_p$ = proximal velocity (m/s)

<script src="/js/bernoulli-calculator.js"></script>

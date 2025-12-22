+++
title = "Body Surface Area Calculator"
description = "Calculate body surface area using the DuBois formula"
date = 2025-12-14
weight = 2

[extra]
katex = true
stylesheets = ["css/calculator-common.css"]
scripts = ["js/bsa-calculator.js"]
+++

# Body Surface Area Calculator

Calculate body surface area (BSA) using the DuBois or Mosteller formula.

<div id="bsa-calculator">
  <h3>Input Parameters</h3>
  <div class="bsa-inputs">
    <div class="input-group">
      <label for="height">Height:</label>
      <input type="number" step="any" inputmode="decimal" id="height" placeholder="170">
      <span class="unit">cm</span>
    </div>
    <div class="input-group">
      <label for="weight">Weight:</label>
      <input type="number" step="any" inputmode="decimal" id="weight" placeholder="70">
      <span class="unit">kg</span>
    </div>
    <div class="input-group">
      <label for="formula">Formula:</label>
      <select id="formula">
        <option value="dubois">DuBois</option>
        <option value="mosteller">Mosteller</option>
      </select>
    </div>
  </div>
  <h3>Calculated Values:</h3>
  <pre><code id="bsa-results-code">Results will appear here.</code></pre>
  <button id="copy-link-btn" class="copy-link-btn">Copy Link</button>
</div>

## DuBois Formula

$$
\text{BSA} = 0.007184 \times \text{height}^{0.725} \times \text{weight}^{0.425}
$$

## Mosteller Formula

$$
\text{BSA} = \sqrt{\frac{\text{height} \times \text{weight}}{3600}}
$$

where:
- BSA = body surface area (m²)
- height = height (cm)
- weight = weight (kg)

<script src="/js/calculator-common.js"></script>
<script src="/js/bsa-calculator.js"></script>

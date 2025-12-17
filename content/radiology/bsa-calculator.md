+++
title = "Body Surface Area Calculator"
description = "Calculate body surface area using the DuBois formula"
date = 2025-12-14
weight = 2

[extra]
stylesheets = ["css/bsa-calculator.css"]
scripts = ["js/bsa-calculator.js"]
+++

# Body Surface Area Calculator

Calculate body surface area (BSA) using the DuBois formula.

<div id="bsa-calculator">
  <h3>Input Parameters</h3>
  <div class="bsa-inputs">
    <div class="input-group">
      <label for="height">Height (cm):</label>
      <input type="number" step="any" inputmode="decimal" id="height" placeholder="170">
    </div>
    <div class="input-group">
      <label for="weight">Weight (kg):</label>
      <input type="number" step="any" inputmode="decimal" id="weight" placeholder="70">
    </div>
  </div>
  <h3>Calculated Values:</h3>
  <pre><code id="bsa-results-code">Results will appear here.</code></pre>
</div>

<script src="/js/bsa-calculator.js"></script>

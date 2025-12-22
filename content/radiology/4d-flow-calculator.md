+++
title = "4D Flow Calculator"
description = "Interactive calculator for 4D flow analysis"
date = 2025-12-12
weight = 1

[extra]
stylesheets = ["css/calculator-common.css"]
scripts = ["js/flow-calculator.js"]
+++

<div id="calculator-1">
  <h3>Biometrics</h3>
  <div class="flow-inputs">
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
  </div>
  <h3>Input Flows</h3>
  <div class="flow-inputs">
    <div class="input-group">
      <label for="svc">SVC/Glenn:</label>
      <input type="number" step="any" inputmode="decimal" id="svc" placeholder="0.0">
      <span class="unit">L/min</span>
    </div>
    <div class="input-group">
      <label for="ivc">IVC/Fontan:</label>
      <input type="number" step="any" inputmode="decimal" id="ivc" placeholder="0.0">
      <span class="unit">L/min</span>
    </div>
    <div class="input-group">
      <label for="mpa">MPA:</label>
      <input type="number" step="any" inputmode="decimal" id="mpa" placeholder="0.0">
      <span class="unit">L/min</span>
    </div>
    <div class="input-group">
      <label for="rpa">RPA:</label>
      <input type="number" step="any" inputmode="decimal" id="rpa" placeholder="0.0">
      <span class="unit">L/min</span>
    </div>
    <div class="input-group">
      <label for="lpa">LPA:</label>
      <input type="number" step="any" inputmode="decimal" id="lpa" placeholder="0.0">
      <span class="unit">L/min</span>
    </div>
    <div class="input-group">
      <label for="rpv">RPV:</label>
      <input type="number" step="any" inputmode="decimal" id="rpv" placeholder="0.0">
      <span class="unit">L/min</span>
    </div>
    <div class="input-group">
      <label for="lpv">LPV:</label>
      <input type="number" step="any" inputmode="decimal" id="lpv" placeholder="0.0">
      <span class="unit">L/min</span>
    </div>
    <div class="input-group">
      <label for="ao">Ao:</label>
      <input type="number" step="any" inputmode="decimal" id="ao" placeholder="0.0">
      <span class="unit">L/min</span>
    </div>
  </div>
  <h3>Calculated Values:</h3>
  <pre><code id="flow-results-code">Results will appear here.</code></pre>
  <button id="copy-link-btn" class="copy-link-btn">Copy Link</button>
</div>

<script src="/js/calculator-common.js"></script>
<script src="/js/flow-calculator.js"></script>

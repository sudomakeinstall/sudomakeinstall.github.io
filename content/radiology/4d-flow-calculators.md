+++
title = "4D Flow Calculators"
description = "Interactive calculators for 4D flow analysis"
date = 2025-12-12
weight = 1

[extra]
stylesheets = ["css/flow-calculator.css"]
scripts = ["js/flow-calculator.js"]
+++

# 4D Flow Calculators

Interactive tools for 4D flow MRI analysis.

## Flow Calculator

<div id="calculator-1">
  <h3>Input Flows (mL/min)</h3>
  <div class="flow-inputs">
    <div class="input-group">
      <label for="svc">SVC:</label>
      <input type="number" step="any" inputmode="decimal" id="svc" placeholder="0.0">
    </div>
    <div class="input-group">
      <label for="ivc">IVC:</label>
      <input type="number" step="any" inputmode="decimal" id="ivc" placeholder="0.0">
    </div>
    <div class="input-group">
      <label for="mpa">MPA:</label>
      <input type="number" step="any" inputmode="decimal" id="mpa" placeholder="0.0">
    </div>
    <div class="input-group">
      <label for="rpa">RPA:</label>
      <input type="number" step="any" inputmode="decimal" id="rpa" placeholder="0.0">
    </div>
    <div class="input-group">
      <label for="lpa">LPA:</label>
      <input type="number" step="any" inputmode="decimal" id="lpa" placeholder="0.0">
    </div>
    <div class="input-group">
      <label for="lpv">LPV:</label>
      <input type="number" step="any" inputmode="decimal" id="lpv" placeholder="0.0">
    </div>
    <div class="input-group">
      <label for="rpv">RPV:</label>
      <input type="number" step="any" inputmode="decimal" id="rpv" placeholder="0.0">
    </div>
    <div class="input-group">
      <label for="ao">Ao:</label>
      <input type="number" step="any" inputmode="decimal" id="ao" placeholder="0.0">
    </div>
  </div>
  <div id="results-1" class="results"></div>
</div>

<script src="/js/flow-calculator.js?v=4"></script>

---

## Calculator 2

<div id="calculator-2">
  <p>Calculator 2 placeholder - add your second calculator here</p>
</div>

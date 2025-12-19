+++
title = "ECV Calculator"
description = "Calculate extracellular volume fraction from T1 mapping"
date = 2025-12-18
weight = 4

[extra]
katex = true
stylesheets = ["css/calculator-common.css"]
scripts = ["js/ecv-calculator.js"]
+++

# Extracellular Volume (ECV) Calculator

Calculate extracellular volume fraction from cardiac MRI T1 mapping.

<div id="ecv-calculator">
  <h3>Input Parameters</h3>
  <div class="ecv-inputs">
    <div class="input-group">
      <label for="t1-pre-myo">T1 pre myo:</label>
      <input type="number" step="any" inputmode="decimal" id="t1-pre-myo" min="0" placeholder="1000">
      <span class="unit">ms</span>
    </div>
    <div class="input-group">
      <label for="t1-pre-blood">T1 pre blood:</label>
      <input type="number" step="any" inputmode="decimal" id="t1-pre-blood" min="0" placeholder="1500">
      <span class="unit">ms</span>
    </div>
    <div class="input-group">
      <label for="t1-post-myo">T1 post myo:</label>
      <input type="number" step="any" inputmode="decimal" id="t1-post-myo" min="0" placeholder="400">
      <span class="unit">ms</span>
    </div>
    <div class="input-group">
      <label for="t1-post-blood">T1 post blood:</label>
      <input type="number" step="any" inputmode="decimal" id="t1-post-blood" min="0" placeholder="300">
      <span class="unit">ms</span>
    </div>
    <div class="input-group">
      <label for="hematocrit">Hematocrit:</label>
      <input type="number" step="any" inputmode="decimal" id="hematocrit" min="0" max="100" placeholder="45">
      <span class="unit">%</span>
    </div>
  </div>
  <h3>Calculated Values:</h3>
  <pre><code id="ecv-results-code">Results will appear here.</code></pre>
</div>

## Formula

The extracellular volume fraction is calculated as:

$$
\text{ECV} = (1 - \text{Hct}) \times \frac{\Delta R1_\text{myo}}{\Delta R1_\text{blood}}
$$

where:

$$
\Delta R1 = \frac{1}{T1_\text{post}} - \frac{1}{T1_\text{pre}}
$$

**Variables:**
- ECV = extracellular volume fraction (%)
- Hct = hematocrit (as decimal: 45% = 0.45)
- T1<sub>pre</sub> = pre-contrast T1 relaxation time (ms)
- T1<sub>post</sub> = post-contrast T1 relaxation time (ms)
- R1 = 1/T1 (longitudinal relaxation rate, s⁻¹)

<script src="/js/ecv-calculator.js"></script>

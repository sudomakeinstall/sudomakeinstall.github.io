+++
title = "4D Flow Consensus Statement (2023)"
description = "Notes on the 2023 4D Flow Consensus Statement Update"
date = 2026-01-04
weight = 1

[extra]
katex = true
+++

## Acquisition

- Scan duration: 5-10 min
- Protocol logistics:
  - Noncontrast often sufficient
  - If giving gadolinium for other reasons, obtain after MRA but before LGE
- Magnet strength: 3T improves SNR over 1.5T; more important in young children due to small body size
- Voxel size: Isotropic, at least 6 voxels across a vessel diameter

| Population | Region      | Voxel Size            |
|------------|-------------|-----------------------|
| Adult      | Whole heart | 2.5 mm<sup>3</sup>    |
| Adult      | Vessels     | 2 mm<sup>3</sup>      |
| Pediatric  | Whole heart | 2 mm<sup>3</sup>      |
| Pediatric  | Vessels     | 1.5 mm<sup>3</sup>    |
| Neonatal   | —           | 0.75-1 mm<sup>3</sup> |

- Temporal resolution: 30 ms
- VENC:
  - Aim for VENC to be as close as possible to maximum expected velocity
  - Ideally <10% greater, do not exceed 25% greater
  - Can base on prior echo or 2D phase contrast scout of region of interest
  - If unavailable and no stenosis suspected:

| Region                 | VENC        |
|------------------------|-------------|
| Large arteries         | 150 cm/s    |
| Dissection false lumen | 50-150 cm/s |
| Venous/Fontan          | 50-80 cm/s  |
| Intracardiac           | 100-150 cm/s|

- Flip angle:

| Contrast             | Flip Angle                                  |
|----------------------|---------------------------------------------|
| Noncontrast          | 7°                                          |
| Post-gadolinium early| 15-25° (1.5T), 12° (3T)                     |
| Post-gadolinium late | 7°                                          |
| Ferumoxytol          | 15-25° (may need 12° in neonates due to SAR)|

- ECG gating: Retrospective preferred; prospective with arrhythmia rejection when needed (e.g. afib)

## Quantification

- Be cautious of measurements in areas of high velocity flow jets
- May require substitutions such as SVC + descending aorta instead of ascending aorta
- Jet quantification
  - Direct: Preferred in regurgitant lesions with only one central jet (e.g. AR, PRR, functional MR)
  - Indirect: Required when there are multiple jets or jet has uncorrectable aliasing

## Quality Control

- Initial validation
  - 10 datasets in subjects without intra- or extra-cardiac shunts x2
  - Compare 4D flow to 2D PC
  - Differences between 2D and 4D should be ≤5%
  - Differences between scan/rescan should be ≤10% (likely physiological)
- Conservation of mass
  - Aortic flow (+5% for coronary flow if measuring above sinuses) = Pulmonary flow
  - MPA = RPA + LPA
  - RPA + LPA = Pulmonary vein flow
  - SVC + descending aorta flow = ascending aorta flow
  - Ascending aorta
    - Absolute bias: $$AO_2 - AO_1$$
    - Relative bias: $$\frac{AO_2 - AO_1}{0.5 \times (AO_1 + AO_2)}$$
  - Pulmonary arteries
    - Absolute bias: $$MPA - (LPA + RPA)$$
    - Relative bias: $$\frac{MPA - (LPA + RPA)}{0.5 \times (MPA + LPA + RPA)}$$
  - LVSV = MVFF + AVRF = AVFF + MVRF

## Reference

Bissell MM, Raimondi F, Ait Ali L, Allen BD, Barker AJ, Bolger A, Burris N, Carhäll CJ, Collins JD, Ebbers T, Francois CJ, Frydrychowicz A, Garg P, Geiger J, Ha H, Hennemuth A, Hope MD, Hsiao A, Johnson K, Kozerke S, Ma LE, Markl M, Martins D, Messina M, Oechtering TH, van Ooij P, Rigsby C, Rodriguez-Palomares J, Roest AAW, Roldán-Alzate A, Schnell S, Sotelo J, Stuber M, Syed AB, Töger J, van der Geest R, Westenberg J, Zhong L, Zhong Y, Wieben O, Dyverfeldt P. 4D Flow cardiovascular magnetic resonance consensus statement: 2023 update. J Cardiovasc Magn Reson. 2023 Jul 20;25(1):40. doi: 10.1186/s12968-023-00942-z. PMID: [37474977](https://pubmed.ncbi.nlm.nih.gov/37474977/); PMCID: PMC10357639.

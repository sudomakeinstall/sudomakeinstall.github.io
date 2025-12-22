const CALCULATOR_PLACEHOLDER = 'Results will appear here.';

function readUrlHash() {
  const hash = window.location.hash.slice(1);
  if (!hash) return {};
  const params = {};
  hash.split('&').forEach(pair => {
    const [key, value] = pair.split('=');
    if (key && value !== undefined) {
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  });
  return params;
}

function updateUrlHash(params) {
  const hash = Object.entries(params)
    .filter(([_, v]) => v !== '' && v !== null && v !== undefined)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  history.replaceState(null, '', hash ? `#${hash}` : window.location.pathname);
}

function setupCopyLinkButton(buttonId) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;
  btn.addEventListener('click', function() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      const original = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = original, 1500);
    });
  });
}

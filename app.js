(() => {
  'use strict';
  const viewport = document.getElementById('viewport');
  const stage = document.getElementById('designStage');
  if (!viewport || !stage) return;

  // S24 Ultra production lock: CSS owns the complete visible viewport.
  // Do not apply a second transform/offset scaler here.
  document.documentElement.dataset.appReady = 'true';
})();

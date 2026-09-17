(() => {
  'use strict';

  const STAGE_WIDTH = 1440;
  const STAGE_HEIGHT = 3120;

  const viewport = document.getElementById('viewport');
  const stage = document.getElementById('designStage');

  if (!viewport || !stage) {
    return;
  }

  const fitStage = () => {
    const availableWidth = Math.max(1, document.documentElement.clientWidth);
    const scale = availableWidth / STAGE_WIDTH;

    document.documentElement.style.setProperty('--stage-scale', String(scale));
    viewport.style.height = `${STAGE_HEIGHT * scale}px`;
    stage.dataset.scale = scale.toFixed(6);
  };

  fitStage();
  window.addEventListener('resize', fitStage, { passive: true });
  window.addEventListener('orientationchange', fitStage, { passive: true });

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', fitStage, { passive: true });
  }

  document.documentElement.dataset.appReady = 'true';
})();

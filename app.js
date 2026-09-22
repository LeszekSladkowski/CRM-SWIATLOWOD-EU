(() => {
  'use strict';

  const STAGE_WIDTH = 1440;
  const STAGE_HEIGHT = 3120;
  const viewport = document.getElementById('viewport');
  const stage = document.getElementById('designStage');
  if (!viewport || !stage) return;

  const fitStage = () => {
    const availableWidth = Math.max(1, document.documentElement.clientWidth, window.innerWidth || 0);
    const availableHeight = Math.max(1, document.documentElement.clientHeight, window.innerHeight || 0);
    const scale = Math.min(availableWidth / STAGE_WIDTH, availableHeight / STAGE_HEIGHT);
    const renderedWidth = STAGE_WIDTH * scale;
    const renderedHeight = STAGE_HEIGHT * scale;
    const offsetX = Math.max(0, (availableWidth - renderedWidth) / 2);
    const offsetY = Math.max(0, (availableHeight - renderedHeight) / 2);

    document.documentElement.style.setProperty('--stage-scale', String(scale));
    document.documentElement.style.setProperty('--stage-x', `${offsetX}px`);
    document.documentElement.style.setProperty('--stage-y', `${offsetY}px`);
    document.documentElement.style.setProperty('--viewport-w', `${availableWidth}px`);
    document.documentElement.style.setProperty('--viewport-h', `${availableHeight}px`);
    stage.dataset.scale = scale.toFixed(6);
  };

  fitStage();
  requestAnimationFrame(fitStage);
  window.addEventListener('load', fitStage, { once: true });
  window.addEventListener('resize', fitStage, { passive: true });
  window.addEventListener('orientationchange', fitStage, { passive: true });
  document.documentElement.dataset.appReady = 'true';
})();

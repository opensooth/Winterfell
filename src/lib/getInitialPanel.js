export default function getInitialPanel(panels, panelId) {
  if (!Array.isArray(panels) || panels.length === 0) {
    return null;
  }
  const defaultPanel = panels[0];
  if (panelId) {
    return (
      panels.find(panel => String(panel.panelId) === String(panelId)) ||
      defaultPanel
    );
  }
  return defaultPanel;
}

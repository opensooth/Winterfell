"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getInitialPanel;

function getInitialPanel(panels, panelId) {
  if (!Array.isArray(panels) || panels.length === 0) {
    return null;
  }
  var defaultPanel = panels[0];
  if (panelId) {
    return panels.find(function (panel) {
      return String(panel.panelId) === String(panelId);
    }) || defaultPanel;
  }
  return defaultPanel;
}

module.exports = exports["default"];
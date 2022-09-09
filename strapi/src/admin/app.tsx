/**
 * Hides caption field below image in Editor.js as the caption from media library is used.
 * Hides ability to add border and background to image in Editor.js.
 */
export const applyEditorjsFixes = () => {
  const style = document.createElement("style");
  style.textContent = `
.cdx-input.image-tool__caption,
.cdx-settings-button[data-tune="withBorder"],
.cdx-settings-button[data-tune="withBackground"]
{
  display: none;
}
`;

  document.head.append(style);
};

export default {
  config: {
    locales: ["sk"],

    // Disable video tutorials
    tutorials: false,
    notifications: { release: false },
  },
  bootstrap(app) {
    console.log(app);
    applyEditorjsFixes();
  },
};

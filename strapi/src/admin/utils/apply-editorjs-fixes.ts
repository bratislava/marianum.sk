/**
 * Hides caption field below image in Editor.js as the caption from media library is used.
 * Hides ability to add border and background to image in Editor.js.
 */
const textContent = `
.cdx-input.image-tool__caption,
.cdx-settings-button[data-tune="withBorder"],
.cdx-settings-button[data-tune="withBackground"]
{
  display: none;
}
`;

export const applyEditorjsFixes = () => {
  const style = document.createElement("style");
  style.textContent = textContent;
  document.head.append(style);
};

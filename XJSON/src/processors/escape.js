const HTML_SECTION_REGEX = /#ESCAPE\(((?!#ESCAPE\().)*\)#ESCAPE/gs;
const HTML_MARKER_LENGTH = 8;

export default function escapeProcessor(textFile) {
  return textFile.replace(HTML_SECTION_REGEX, escapeText);
}

function escapeText(string) {
  const textToEscape = string
    .slice(HTML_MARKER_LENGTH, string.length - HTML_MARKER_LENGTH)
    .trim();
  return JSON.stringify(textToEscape);
}

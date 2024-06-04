import he from "he";

export default function decode(text: string) {
  let html = he.decode(text);

  html = html // Unescape unwanted HTML entities
    .replace(/<pre>/g, "")
    .replace(/<\/pre>/g, "")
    .replace(/<code>/g, "")
    .replace(/<\/code>/g, "");

  return html;
}

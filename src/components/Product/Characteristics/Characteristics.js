import { markdownToHtml } from "simple-markdown";
import RenderHtml from "react-native-render-html";

export function Characteristics({ text = "" }) {
  return (
    <RenderHtml contentWidth={200} source={{ html: markdownToHtml(text) }} />
  );
}


import ReactMarkdown, { ExtraProps } from "react-markdown";
import { PrismLight as SyntaxHighLighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import "./style.css";

type CodeComponent =
  | React.ElementType<
      React.ClassAttributes<HTMLElement> &
        React.HTMLAttributes<HTMLElement> &
        ExtraProps
    >
  | undefined;

const Code: CodeComponent = ({ children, className, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  const language = match?.[1] || "text";
  const codeString = String(children).replace(/\n$/, "");

  if (language === "text") {
    return <code {...props} children={codeString} />;
  }

  return (
    <SyntaxHighLighter
      // {...props}
      language={language}
      children={codeString}
      style={oneLight}
    />
  );
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      className="prose prose-sm prose-pre:bg-transparent min-h-[50vh] "
      remarkPlugins={[remarkGfm]}
      components={{
        code: Code,
      }}

      // allowedElements={["img"]}
    >
      {content}
    </ReactMarkdown>
  );
}

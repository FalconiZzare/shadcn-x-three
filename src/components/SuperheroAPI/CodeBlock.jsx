import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism/index.js";
import { useCurrentTheme } from "@/hooks/get-theme.js";
import { Clipboard, ClipboardCheck } from "lucide-react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button.jsx";
import { toast } from "sonner";

const CodeBlock = ({ codeString }) => {
  const currentTheme = useCurrentTheme();

  const handleCopy = () => {
    try {
      navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          navigator.clipboard.writeText(codeString);

          toast("Copied to clipboard!", {
            icon: <ClipboardCheck className={"size-5 text-green-500"} />
          });
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={"relative w-full"}>
      <SyntaxHighlighter
        showLineNumbers
        wrapLongLines
        language={"javascript"}
        style={currentTheme === "dark" ? oneDark : oneLight}
      >
        {codeString}
      </SyntaxHighlighter>
      <Button
        variant={"outline"}
        className={"absolute right-5 top-5 bg-zinc-900 px-2 py-5 hover:bg-background"}
        onClick={handleCopy}
      >
        <Clipboard />
      </Button>
    </div>
  );
};

CodeBlock.propTypes = {
  codeString: PropTypes.string.isRequired
};

export default CodeBlock;

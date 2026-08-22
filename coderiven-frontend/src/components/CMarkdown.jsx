import { useState } from "react";
import PropTypes from "prop-types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Box, Button, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

// Reusable CodeBlock Component for Syntax Highlighting
const CodeBlock = ({ children, className, ...rest }) => {
  const match = /language-(\w+)/.exec(className || "");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return match ? (
    <Box sx={{ position: "relative" }}>
      <SyntaxHighlighter
        {...rest}
        PreTag="div"
        language={match[1]}
        style={materialOceanic}
      >
        {String(children).trim()}
      </SyntaxHighlighter>
      <Tooltip title={copied ? "Copied!" : "Copy"} arrow>
        <Button
          onClick={handleCopy}
          size="small"
          variant="contained"
          color={copied ? "success" : "primary"}
          startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            textTransform: "none",
          }}
          aria-label={copied ? "Copied code to clipboard" : "Copy code to clipboard"}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </Tooltip>
    </Box>
  ) : (
    <code {...rest} className={className}>
      {children}
    </code>
  );
};

// Main Markdown Component
const CMarkdown = ({ content }) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code: CodeBlock,
      }}
    >
      {content}
    </Markdown>
  );
};

// PropTypes for CMarkdown
CMarkdown.propTypes = {
  content: PropTypes.string.isRequired,
};

export default CMarkdown;

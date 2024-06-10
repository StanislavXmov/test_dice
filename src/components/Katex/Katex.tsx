import { useEffect, useRef } from "react";
import katex from "katex";

import "katex/dist/katex.min.css";

export const KaTeX = ({ texExpression, className }: { texExpression: string, className: string }) => {
  const containerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    katex.render(texExpression, containerRef.current as HTMLInputElement);
  }, [texExpression]);

  return <div ref={containerRef} className={className} />;
}
import React, { useRef } from 'react';
import './Comparison.css';

export default function SchemasComparison({
  leftPanel,
  rightPanel,
  onProcess,
  processText,
}) {
  const pre = useRef();

  return (
    <div>
      <button
        onClick={() => {
          const value = pre.current.textContent;
          onProcess(value);
        }}
      >
        {processText}
      </button>
      <div className="comparison__cont">
        <pre
          ref={pre}
          className="comparison__left"
          contentEditable
        >
          <code>
            {leftPanel}
          </code>
        </pre>
        <pre className="comparison__right">
          {rightPanel}
        </pre>
      </div>
    </div>
  );
}

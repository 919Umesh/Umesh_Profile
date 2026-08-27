import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

/**
 * Thin React wrapper around Quill 2.
 *
 * Neither React wrapper package works here: `react-quill` pins Quill 1.3.7,
 * which has no table support at all, and `react-quill-new` ships ESM-only
 * (`"type": "module"`), which CRA 5's webpack can't resolve against React
 * 17's exports-less package. Driving Quill directly sidesteps both and is
 * only a few lines.
 *
 * Exposes `getEditor()` on its ref so callers can reach the Quill instance
 * for toolbar handlers.
 */
const RichTextEditor = forwardRef(function RichTextEditor({ value, onChange, modules }, ref) {
  const hostRef = useRef(null);
  const quillRef = useRef(null);
  // Kept in refs so the init effect can stay [] and never re-create the editor.
  const onChangeRef = useRef(onChange);
  const modulesRef = useRef(modules);
  const initialValueRef = useRef(value);
  onChangeRef.current = onChange;

  useImperativeHandle(ref, () => ({ getEditor: () => quillRef.current }), []);

  useEffect(() => {
    const host = hostRef.current;
    const editorEl = document.createElement("div");
    host.appendChild(editorEl);

    const quill = new Quill(editorEl, { theme: "snow", modules: modulesRef.current });
    quillRef.current = quill;

    if (initialValueRef.current) {
      quill.setContents(quill.clipboard.convert({ html: initialValueRef.current }), Quill.sources.SILENT);
    }

    quill.on(Quill.events.TEXT_CHANGE, () => {
      onChangeRef.current?.(quill.root.innerHTML);
    });

    return () => {
      quillRef.current = null;
      // Quill injects the toolbar as a sibling of the editor inside the host,
      // so clearing the host disposes of both.
      host.innerHTML = "";
    };
  }, []);

  // Adopt values arriving from outside (e.g. an existing post loading in),
  // but never while the author is typing.
  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;
    const next = value || "";
    if (quill.hasFocus() || next === quill.root.innerHTML) return;
    quill.setContents(quill.clipboard.convert({ html: next }), Quill.sources.SILENT);
  }, [value]);

  return <div ref={hostRef} />;
});

export default RichTextEditor;

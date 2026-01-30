"use client";

import React, { useState } from "react";
import { exportElementToPdf } from "@/lib/exportPdf";
import { useLocale } from "@/context/LocaleContext";

type Props = {
  targetRef: React.RefObject<HTMLElement>;
  filename?: string;
  label?: string;
  className?: string;
};

export const ExportPdfButton: React.FC<Props> = ({
  targetRef,
  filename = "export.pdf",
  label,
  className,
}) => {
  const { t } = useLocale();
  const [isExporting, setIsExporting] = useState(false);

  const onExport = async () => {
    if (!targetRef.current || isExporting) return;
    try {
      setIsExporting(true);
      await exportElementToPdf(targetRef.current, filename);
    } finally {
      setIsExporting(false);
    }
  };

  const text = isExporting
    ? t("common.exporting")
    : (label ?? t("common.exportPdf"));

  return (
    <button
      type="button"
      onClick={onExport}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
      }
      disabled={isExporting}
    >
      {text}
    </button>
  );
};

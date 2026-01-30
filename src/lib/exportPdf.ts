'use client';

import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export async function exportElementToPdf(
  element: HTMLElement,
  filename: string
) {
  if (!element) return;

  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#ffffff',
  });

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const img = new Image();
  img.src = dataUrl;

  await new Promise((res) => (img.onload = res));

  const imgWidth = pageWidth;
  const imgHeight = (img.height * imgWidth) / img.width;

  let y = 0;
  let heightLeft = imgHeight;

  while (heightLeft > 0) {
    pdf.addImage(dataUrl, 'PNG', 0, y, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    y -= pageHeight;

    if (heightLeft > 0) pdf.addPage();
  }

  pdf.save(filename);
}

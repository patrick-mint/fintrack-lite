"use client";

import React, { useMemo, useRef, useState } from "react";
import type { DocumentCategory, DocumentItem } from "@/types/finance";
import { useFinance } from "@/context/FinanceContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useLocale } from "@/context/LocaleContext";
import { ExportPdfButton } from "@/components/ExportPdfButton";
import { getTodayString } from "@/util/createDate";

type FormState = {
  id?: string;
  category: DocumentCategory;
  title: string;
  provider: string;
  referenceNo: string;
  location: string;
  medicalCoverage: string;
  deathBenefit: string;
  areaSqm: string;
  quantity: string;
  estimatedValue: string;
  notes: string;
};

const cleanNumber = (v: string): number | undefined => {
  const cleaned = v.replace(/,/g, "").trim();
  if (!cleaned) return undefined;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : undefined;
};

export const DocumentsVault: React.FC = () => {
  const { documents, addDocument, updateDocument, deleteDocument } =
    useFinance();
  const { formatCurrency } = useCurrency();
  const { t } = useLocale();

  const printRef = useRef<HTMLDivElement>(null!);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    category: "insurance",
    title: "",
    provider: "",
    referenceNo: "",
    location: "",
    medicalCoverage: "",
    deathBenefit: "",
    areaSqm: "",
    quantity: "",
    estimatedValue: "",
    notes: "",
  });

  const resetForm = () => {
    setEditingId(null);
    setForm({
      category: "insurance",
      title: "",
      provider: "",
      referenceNo: "",
      location: "",
      medicalCoverage: "",
      deathBenefit: "",
      areaSqm: "",
      quantity: "",
      estimatedValue: "",
      notes: "",
    });
  };

  const onEdit = (doc: DocumentItem) => {
    setEditingId(doc.id);
    setForm({
      category: doc.category,
      title: doc.title ?? "",
      provider: doc.provider ?? "",
      referenceNo: doc.referenceNo ?? "",
      location: doc.location ?? "",
      medicalCoverage:
        doc.medicalCoverage != null ? String(doc.medicalCoverage) : "",
      deathBenefit: doc.deathBenefit != null ? String(doc.deathBenefit) : "",
      areaSqm: doc.areaSqm != null ? String(doc.areaSqm) : "",
      quantity: doc.quantity != null ? String(doc.quantity) : "",
      estimatedValue:
        doc.estimatedValue != null ? String(doc.estimatedValue) : "",
      notes: doc.notes ?? "",
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = form.title.trim();
    if (!title) return;

    const payload = {
      category: form.category,
      title,
      provider: form.provider.trim() || undefined,
      referenceNo: form.referenceNo.trim() || undefined,
      location: form.location.trim() || undefined,
      medicalCoverage: cleanNumber(form.medicalCoverage),
      deathBenefit: cleanNumber(form.deathBenefit),
      areaSqm: cleanNumber(form.areaSqm),
      quantity: cleanNumber(form.quantity),
      estimatedValue: cleanNumber(form.estimatedValue),
      notes: form.notes.trim() || undefined,
    } satisfies Partial<DocumentItem>;

    if (editingId) {
      updateDocument(editingId, payload);
    } else {
      addDocument({
        id: "",
        category: payload.category ?? "other",
        title: payload.title ?? "Untitled",
        provider: payload.provider,
        referenceNo: payload.referenceNo,
        location: payload.location,
        medicalCoverage: payload.medicalCoverage,
        deathBenefit: payload.deathBenefit,
        areaSqm: payload.areaSqm,
        quantity: payload.quantity,
        estimatedValue: payload.estimatedValue,
        notes: payload.notes,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    resetForm();
  };

  const totals = useMemo(() => {
    let medical = 0;
    let death = 0;
    let value = 0;

    for (const d of documents) {
      if (typeof d.medicalCoverage === "number") medical += d.medicalCoverage;
      if (typeof d.deathBenefit === "number") death += d.deathBenefit;
      if (typeof d.estimatedValue === "number") value += d.estimatedValue;
    }

    return { medical, death, value };
  }, [documents]);

  const sorted = useMemo(() => {
    return [...documents].sort((a, b) => {
      const at =
        a.updatedAt?.getTime?.() ??
        new Date(a.updatedAt as any).getTime?.() ??
        0;
      const bt =
        b.updatedAt?.getTime?.() ??
        new Date(b.updatedAt as any).getTime?.() ??
        0;
      return bt - at;
    });
  }, [documents]);

  const categoryLabel = (c: DocumentCategory) => {
    if (c === "insurance") return t("documents.category.insurance");
    if (c === "property") return t("documents.category.property");
    if (c === "valuables") return t("documents.category.valuables");
    return t("documents.category.other");
  };

  const showInsuranceFields = form.category === "insurance";
  const showPropertyFields = form.category === "property";
  const showValuablesFields = form.category === "valuables";

  return (
    <div className="max-w-5xl mx-auto space-y-1 space-x-5 text-gray-800">
      <div className="print:hidden flex items-center justify-end">
        <ExportPdfButton
          targetRef={printRef}
          filename={`documents-${getTodayString()}.pdf`}
        />
      </div>

      {/* content to export */}
      <div ref={printRef} className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">{t("documents.title")}</h1>
            <p className="text-gray-600 mt-2">{t("documents.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-sm text-blue-800 font-semibold">
                {t("documents.summary.medical")}
              </div>
              <div className="text-xl font-bold text-blue-700">
                {formatCurrency(totals.medical)}
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-sm text-green-800 font-semibold">
                {t("documents.summary.death")}
              </div>
              <div className="text-xl font-bold text-green-700">
                {formatCurrency(totals.death)}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="text-sm text-gray-800 font-semibold">
                {t("documents.summary.value")}
              </div>
              <div className="text-xl font-bold text-gray-900">
                {formatCurrency(totals.value)}
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("documents.form.category")}
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      category: e.target.value as DocumentCategory,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="insurance">
                    {t("documents.category.insurance")}
                  </option>
                  <option value="property">
                    {t("documents.category.property")}
                  </option>
                  <option value="valuables">
                    {t("documents.category.valuables")}
                  </option>
                  <option value="other">{t("documents.category.other")}</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("documents.form.title")}
                </label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., AIA Life Policy, Chanote, Gold Ring"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("documents.form.provider")}
                </label>
                <input
                  value={form.provider}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, provider: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., KBank, AIA, Land Dept."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("documents.form.referenceNo")}
                </label>
                <input
                  value={form.referenceNo}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, referenceNo: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Policy No., Deed No."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("documents.form.location")}
                </label>
                <input
                  value={form.location}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, location: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Home safe / Bangkok"
                />
              </div>
            </div>

            {(showInsuranceFields ||
              showPropertyFields ||
              showValuablesFields) && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {showInsuranceFields ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("documents.form.medicalCoverage")}
                      </label>
                      <input
                        value={form.medicalCoverage}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            medicalCoverage: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("documents.form.deathBenefit")}
                      </label>
                      <input
                        value={form.deathBenefit}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            deathBenefit: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                        placeholder="0"
                      />
                    </div>
                  </>
                ) : null}

                {showPropertyFields ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("documents.form.areaSqm")}
                      </label>
                      <input
                        value={form.areaSqm}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, areaSqm: e.target.value }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("documents.form.estimatedValue")}
                      </label>
                      <input
                        value={form.estimatedValue}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            estimatedValue: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                        placeholder="0"
                      />
                    </div>
                  </>
                ) : null}

                {showValuablesFields ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("documents.form.quantity")}
                      </label>
                      <input
                        value={form.quantity}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, quantity: e.target.value }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("documents.form.estimatedValue")}
                      </label>
                      <input
                        value={form.estimatedValue}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            estimatedValue: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                        placeholder="0"
                      />
                    </div>
                  </>
                ) : null}

                {!showPropertyFields &&
                !showValuablesFields &&
                !showInsuranceFields ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("documents.form.estimatedValue")}
                    </label>
                    <input
                      value={form.estimatedValue}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          estimatedValue: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                      placeholder="0"
                    />
                  </div>
                ) : null}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("documents.form.notes")}
              </label>
              <input
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="optional"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                {editingId ? t("documents.form.save") : t("documents.add")}
              </button>
              {editingId ? (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                >
                  {t("documents.form.cancel")}
                </button>
              ) : null}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {t("documents.summary.title")}
            </h2>
            <div className="text-sm text-gray-500">{sorted.length}</div>
          </div>

          {sorted.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              {t("documents.empty")}
            </div>
          ) : (
            <div className="space-y-3">
              {sorted.map((d) => (
                <div key={d.id} className="bg-gray-50 border rounded-lg p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900 truncate">
                        {d.title}{" "}
                        <span className="text-gray-500 font-normal">
                          • {categoryLabel(d.category)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1 space-y-0.5">
                        {d.provider ? (
                          <div>
                            {t("documents.form.provider")}: {d.provider}
                          </div>
                        ) : null}
                        {d.referenceNo ? (
                          <div>
                            {t("documents.form.referenceNo")}: {d.referenceNo}
                          </div>
                        ) : null}
                        {d.location ? (
                          <div>
                            {t("documents.form.location")}: {d.location}
                          </div>
                        ) : null}
                        {typeof d.medicalCoverage === "number" ? (
                          <div>
                            {t("documents.form.medicalCoverage")}:{" "}
                            {formatCurrency(d.medicalCoverage)}
                          </div>
                        ) : null}
                        {typeof d.deathBenefit === "number" ? (
                          <div>
                            {t("documents.form.deathBenefit")}:{" "}
                            {formatCurrency(d.deathBenefit)}
                          </div>
                        ) : null}
                        {typeof d.areaSqm === "number" ? (
                          <div>
                            {t("documents.form.areaSqm")}: {d.areaSqm}
                          </div>
                        ) : null}
                        {typeof d.quantity === "number" ? (
                          <div>
                            {t("documents.form.quantity")}: {d.quantity}
                          </div>
                        ) : null}
                        {typeof d.estimatedValue === "number" ? (
                          <div>
                            {t("documents.form.estimatedValue")}:{" "}
                            {formatCurrency(d.estimatedValue)}
                          </div>
                        ) : null}
                        {d.notes ? (
                          <div>
                            {t("documents.form.notes")}: {d.notes}
                          </div>
                        ) : null}
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Updated:{" "}
                        {d.updatedAt instanceof Date
                          ? d.updatedAt.toISOString().slice(0, 10)
                          : String(d.updatedAt).slice(0, 10)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onEdit(d)}
                        className="px-3 py-1.5 text-sm rounded-md border border-gray-300 hover:bg-white"
                      >
                        {t("documents.edit")}
                      </button>
                      <button
                        onClick={() => {
                          const ok = window.confirm(
                            t("documents.deleteConfirm"),
                          );
                          if (ok) deleteDocument(d.id);
                        }}
                        className="px-3 py-1.5 text-sm rounded-md text-red-700 border border-red-200 hover:bg-red-50"
                      >
                        {t("documents.delete")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

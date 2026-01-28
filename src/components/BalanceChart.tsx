'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TooltipItem,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import type { Account } from '@/types/finance';
import { useCurrency } from '@/context/CurrencyContext';
import { useLocale } from '@/context/LocaleContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface BalanceChartProps {
  account: Account;
  series: { date: Date; amount: number }[];
  height?: number;
}

export const BalanceChart: React.FC<BalanceChartProps> = ({ account, series, height = 400 }) => {
  const { formatCurrency } = useCurrency();
  const { t } = useLocale();

  const sorted = [...series].sort((a, b) => a.date.getTime() - b.date.getTime());

  if (sorted.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">{t('charts.balance.empty')}</p>
      </div>
    );
  }

  const data = {
    labels: sorted.map((p) => p.date),
    datasets: [
      {
        label: account.name,
        data: sorted.map((p) => p.amount),
        borderColor: account.type === 'asset' ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
        backgroundColor: account.type === 'asset' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: t('charts.balance.title').replace('{account}', account.name) },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'line'>) {
            const y = context.parsed.y;
            const prefix = t('charts.common.tooltip.balance');
            return y == null ? `${prefix}: ${t('common.unknown')}` : `${prefix}: ${formatCurrency(y)}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time' as const,
        time: { unit: 'day' as const },
        title: { display: true, text: t('charts.common.axis.date') },
      },
      y: {
        title: { display: true, text: t('charts.common.axis.balance') },
        ticks: {
          callback: function (value: number | string) {
            return formatCurrency(Number(value));
          },
        },
      },
    },
  };

  return (
    <div style={{ height: `${height}px` }} className="w-full">
      <Line data={data} options={options} />
    </div>
  );
};

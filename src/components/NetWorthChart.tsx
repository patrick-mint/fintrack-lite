'use client';

import React, { useMemo } from 'react';
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
  Filler,
  TooltipItem,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import type { Account, Transaction } from '@/types/finance';
import { useCurrency } from '@/context/CurrencyContext';
import { computeNetWorthSeries } from '@/lib/finance';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

interface NetWorthChartProps {
  accounts: Account[];
  transactions: Transaction[];
  dateRangeStart?: string; // YYYY-MM-DD
  height?: number;
}

export const NetWorthChart: React.FC<NetWorthChartProps> = ({ accounts, transactions, dateRangeStart, height = 400 }) => {
  const { formatCurrency, selectedCurrency } = useCurrency();

  const netWorthData = useMemo(() => {
    return computeNetWorthSeries(accounts, transactions, dateRangeStart);
  }, [accounts, transactions, dateRangeStart]);

  if (netWorthData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No data available for net worth tracking</p>
      </div>
    );
  }

  const data = {
    labels: netWorthData.map(point => point.date),
    datasets: [
      {
        label: 'Assets',
        data: netWorthData.map(point => point.assets),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Liabilities',
        data: netWorthData.map(point => point.liabilities),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Net Worth',
        data: netWorthData.map(point => point.netWorth),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
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
      title: {
        display: true,
        text: 'Net Worth Over Time',
        font: { size: 16, weight: 'bold' as const },
      },
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'line'>) {
            const y = context.parsed.y;
            return y == null ? 'Amount: N/A' : `Amount: ${formatCurrency(y)}`;
          },
        },
      },
    },
    scales: {
      x: { type: 'time' as const, time: { unit: 'day' as const }, title: { display: true, text: 'Date' } },
      y: {
        title: { display: true, text: `Amount (${selectedCurrency.symbol})` },
        ticks: { callback: (value: number | string) => formatCurrency(Number(value)) },
      },
    },
    interaction: { intersect: false, mode: 'index' as const },
  };

  const latestData = netWorthData[netWorthData.length - 1];
  const firstData = netWorthData[0];
  const netWorthChange = latestData.netWorth - firstData.netWorth;
  const netWorthChangePercent = firstData.netWorth !== 0
    ? ((latestData.netWorth - firstData.netWorth) / Math.abs(firstData.netWorth)) * 100
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Current Net Worth</h3>
          <div className={`text-2xl font-bold ${
            latestData.netWorth >= 0 ? 'text-blue-600' : 'text-red-600'
          }`}>
            {formatCurrency(latestData.netWorth)}
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h3 className="font-semibold text-green-800 mb-2">Total Assets</h3>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(latestData.assets)}
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <h3 className="font-semibold text-red-800 mb-2">Total Liabilities</h3>
          <div className="text-2xl font-bold text-red-600">
            {formatCurrency(latestData.liabilities)}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-2">Change</h3>
          <div className={`text-lg font-bold ${
            netWorthChange >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            <div>{formatCurrency(netWorthChange)}</div>
            <div className="text-sm">
              ({netWorthChange >= 0 ? '+' : ''}{netWorthChangePercent.toFixed(1)}%)
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-4">
        <div style={{ height: `${height}px` }} className="w-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

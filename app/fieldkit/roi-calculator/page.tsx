'use client';

import { useMemo, useState } from 'react';

export default function ROICalculatorPage() {
  const [purchasePrice, setPurchasePrice] = useState<string>('10000');
  const [scansPerMonth, setScansPerMonth] = useState<string>('4');
  const [avgJobRevenue, setAvgJobRevenue] = useState<string>('1500');
  const [lifespanYears, setLifespanYears] = useState<string>('3');

  const { breakEvenMonths, annualProfit, costPerProject } = useMemo(() => {
    const p = Number(purchasePrice) || 0;
    const n = Number(scansPerMonth) || 0;
    const r = Number(avgJobRevenue) || 0;
    const y = Number(lifespanYears) || 0;

    const monthlyRevenue = n * r;
    const breakEven = monthlyRevenue > 0 ? Math.ceil(p / monthlyRevenue) : Infinity;
    const annual = monthlyRevenue * 12 - p / (y > 0 ? y : 1);
    const projectsPerYear = n * 12;
    const cpp = projectsPerYear > 0 ? (p / (y || 1)) / projectsPerYear : Infinity;

    return {
      breakEvenMonths: breakEven,
      annualProfit: Math.round(annual),
      costPerProject: Number.isFinite(cpp) ? Number(cpp.toFixed(2)) : Infinity,
    };
  }, [purchasePrice, scansPerMonth, avgJobRevenue, lifespanYears]);

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">Scanner ROI Calculator</h1>
      <p className="text-sm text-gray-400">
        Estimate break-even time, annual profit, and cost per project for your capture hardware.
      </p>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="flex flex-col text-sm">
          Purchase price ($)
          <input className="rounded-xl border bg-transparent px-3 py-2"
                 value={purchasePrice} onChange={(e)=>setPurchasePrice(e.target.value)} />
        </label>
        <label className="flex flex-col text-sm">
          Scans per month
          <input className="rounded-xl border bg-transparent px-3 py-2"
                 value={scansPerMonth} onChange={(e)=>setScansPerMonth(e.target.value)} />
        </label>
        <label className="flex flex-col text-sm">
          Avg. job revenue ($)
          <input className="rounded-xl border bg-transparent px-3 py-2"
                 value={avgJobRevenue} onChange={(e)=>setAvgJobRevenue(e.target.value)} />
        </label>
        <label className="flex flex-col text-sm">
          Lifespan (years)
          <input className="rounded-xl border bg-transparent px-3 py-2"
                 value={lifespanYears} onChange={(e)=>setLifespanYears(e.target.value)} />
        </label>
      </div>

      <div className="rounded-2xl border p-4">
        <div className="grid gap-2 md:grid-cols-3">
          <div>
            <div className="text-sm text-gray-500">Break-even</div>
            <div className="text-lg font-semibold">
              {Number.isFinite(breakEvenMonths) ? `${breakEvenMonths} months` : '—'}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Annual Profit (est.)</div>
            <div className="text-lg font-semibold">
              {Number.isFinite(annualProfit) ? `$${annualProfit.toLocaleString()}` : '—'}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Cost per Project</div>
            <div className="text-lg font-semibold">
              {Number.isFinite(costPerProject) ? `$${costPerProject}` : '—'}
            </div>
          </div>
        </div>
        {/* TODO: add Chart.js ROI curve in v2 */}
      </div>
    </div>
  );
}

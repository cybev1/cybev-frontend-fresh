import React from 'react';

export default function HostingPlans({ plans = [], onSelect, selectedPlan }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan, idx) => (
        <div
          key={idx}
          onClick={() => onSelect(plan)}
          className={\`cursor-pointer rounded-2xl border p-6 shadow-md hover:shadow-xl transition-all duration-300 \${selectedPlan?.id === plan.id ? 'border-blue-500' : 'border-gray-200'}\`}
        >
          <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
          <p className="text-sm text-gray-600">{plan.description}</p>
          <p className="text-xl font-bold mt-4">{plan.price}</p>
        </div>
      ))}
    </div>
  );
}

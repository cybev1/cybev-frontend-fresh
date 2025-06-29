export default function HostingPlans({ plans = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {plans.length ? plans.map((plan, idx) => (
        <div key={idx} className="p-4 border rounded-lg shadow bg-white dark:bg-gray-800">
          <h3 className="text-xl font-semibold">{plan.title}</h3>
          <p>{plan.description}</p>
          <p className="font-bold">{plan.price}</p>
        </div>
      )) : (
        <p className="text-gray-500">No hosting plans available.</p>
      )}
    </div>
  );
}

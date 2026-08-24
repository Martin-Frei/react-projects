import { useState, useEffect, useMemo } from "react";

function App() {
  const [expense, setExpense] = useState(() => {
    return JSON.parse(localStorage.getItem("expense")) || [];
  });
  const [income, setIncome] = useState(() => {
    return JSON.parse(localStorage.getItem("income")) || [];
  });
  const [form, setForm] = useState({ title: "", amount: "", type: "Expense" });

  const totalIncome = useMemo(() => {
    return income.reduce((total, item) => total + item.amount, 0);
  }, [income]);

  const totalExpense = useMemo(() => {
    return expense.reduce((total, item) => total + item.amount, 0);
  }, [expense]);

  const totalBalance = useMemo(() => {
    return totalIncome - totalExpense;
  }, [totalIncome, totalExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.amount) return;

    const newTransaction = {
      id: Date.now(),
      title: form.title,
      amount: Number(form.amount),
    };

    if (form.type === "Expense") {
      setExpense([...expense, newTransaction]);
    } else {
      setIncome([...income, newTransaction]);
    }

    setForm({ title: "", amount: "", type: "Expense" });
  };

  const deleteIncome = (id) => {
    setIncome(income.filter((item) => item.id !== id));
  };

  const deleteExpense = (id) => {
    setExpense(expense.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("income", JSON.stringify(income));
    localStorage.setItem("expense", JSON.stringify(expense));
  }, [income, expense]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 py-6 text-center shadow-lg">
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
        <p className="text-gray-400 mt-1">Track your income and expenses</p>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              value={form.title}
              type="text"
              className="bg-gray-700 text-white px-4 py-3 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Title (e.g. Salary, Rent)"
            />
            <input
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              value={form.amount}
              type="number"
              min="0"
              step="0.01"
              className="bg-gray-700 text-white px-4 py-3 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Amount in €"
            />
            <select
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              value={form.type}
              className="bg-gray-700 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Expense</option>
              <option>Income</option>
            </select>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold whitespace-nowrap">
              + Add
            </button>
          </div>
        </form>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-green-600/20 border border-green-500/30 p-5 rounded-xl text-center">
            <p className="text-green-400 text-sm font-medium">Income</p>
            <p className="text-2xl font-bold text-green-400 mt-1">
              €{totalIncome.toFixed(2)}
            </p>
          </div>
          <div className="bg-red-600/20 border border-red-500/30 p-5 rounded-xl text-center">
            <p className="text-red-400 text-sm font-medium">Expenses</p>
            <p className="text-2xl font-bold text-red-400 mt-1">
              €{totalExpense.toFixed(2)}
            </p>
          </div>
          <div
            className={`p-5 rounded-xl text-center border ${
              totalBalance >= 0
                ? "bg-blue-600/20 border-blue-500/30"
                : "bg-orange-600/20 border-orange-500/30"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                totalBalance >= 0 ? "text-blue-400" : "text-orange-400"
              }`}
            >
              Balance
            </p>
            <p
              className={`text-2xl font-bold mt-1 ${
                totalBalance >= 0 ? "text-blue-400" : "text-orange-400"
              }`}
            >
              €{totalBalance.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Transaction Lists */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Income List */}
          <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
            <h2 className="text-lg font-bold text-green-400 mb-4 border-b border-gray-700 pb-2">
              Income ({income.length})
            </h2>
            {income.length === 0 ? (
              <p className="text-gray-500 text-sm">No income added yet</p>
            ) : (
              <div className="space-y-3">
                {income.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-gray-700/50 px-4 py-3 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-green-400 text-sm font-semibold">
                        +€{item.amount.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteIncome(item.id)}
                      className="text-gray-400 hover:text-red-400 transition text-lg"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Expense List */}
          <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
            <h2 className="text-lg font-bold text-red-400 mb-4 border-b border-gray-700 pb-2">
              Expenses ({expense.length})
            </h2>
            {expense.length === 0 ? (
              <p className="text-gray-500 text-sm">No expenses added yet</p>
            ) : (
              <div className="space-y-3">
                {expense.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-gray-700/50 px-4 py-3 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-red-400 text-sm font-semibold">
                        -€{item.amount.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteExpense(item.id)}
                      className="text-gray-400 hover:text-red-400 transition text-lg"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { startIyzicoPayment } from '../payments/iyzico';
import { startPaypalPayment } from '../payments/paypal';

const currencies = ['TRY', 'USD', 'EUR'];

export default function PaymentDemo() {
  const [amount, setAmount] = useState(100);
  const [currency, setCurrency] = useState('TRY');
  const [result, setResult] = useState('');

  return (
    <div className="p-4 bg-gray-100 rounded mb-4 max-w-md">
      <h2 className="text-lg font-bold mb-2">Ödeme Demo</h2>
      <div className="flex gap-2 mb-2">
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          className="border p-1 rounded w-24"
          min={1}
        />
        <select
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          className="border p-1 rounded"
        >
          {currencies.map(cur => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded"
          onClick={() => setResult(startIyzicoPayment(amount, currency))}
        >
          İyzico ile Öde
        </button>
        <button
          className="bg-green-600 text-white px-3 py-1 rounded"
          onClick={() => setResult(startPaypalPayment(amount, currency))}
        >
          Paypal ile Öde
        </button>
      </div>
      {result && <div className="mt-2 text-sm text-gray-700">{result}</div>}
    </div>
  );
} 
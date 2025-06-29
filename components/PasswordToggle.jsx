import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function PasswordToggle({ value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        className="w-full p-2 pr-10 border rounded"
      />
      <span
        onClick={() => setShow(!show)}
        className="absolute right-2 top-2 cursor-pointer"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </span>
    </div>
  );
}

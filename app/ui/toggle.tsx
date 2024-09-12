'use client';

import { useState } from 'react';

export default function Toggle({ labelOff, labelOn, initialState }: { labelOff: string, labelOn: string, initialState: boolean }) {
  const [isChecked, setIsChecked] = useState(initialState);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="relative flex items-center">
      <span className="text-sm font-medium text-black">{labelOff}</span>
      <label className="relative inline-flex cursor-pointer select-none items-center mx-4">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          className="sr-only"
        />
        <span
          className={`slider flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${isChecked ? 'bg-[#81C784]' : 'bg-[#E57373]'}`}
        >
          <span
            className={`dot h-6 w-6 rounded-full bg-white duration-200 transform ${isChecked ? 'translate-x-[28px]' : ''}`}
          ></span>
        </span>
      </label>
      <span className="text-sm font-medium text-black">{labelOn}</span>
    </div>
  );
}

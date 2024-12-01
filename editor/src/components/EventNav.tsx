import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useState } from 'react';

import { EventList } from '@/components/EventList';

export function EventNav() {
  const [isOpen, setIsOpen] = useState(true);
  const [filterTerm, setFilterTerm] = useState('');

  return (
    <aside
      className={clsx(
        'flex flex-col bg-slate-300 dark:bg-slate-900',
        isOpen ? 'min-w-[400px]' : 'w-0'
      )}
    >
      <div className="relative flex">
        {isOpen ? (
          <>
            <MagnifyingGlassIcon className="absolute h-full w-auto p-2" />
            <input
              type="search"
              className="grow pl-10 pr-4 py-2 dark:bg-slate-600"
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
            />
            <button
              className="w-10 h-10 dark:bg-slate-600 dark:hover:bg-slate-500"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              <DoubleArrowLeftIcon className="w-full h-full p-2" />
            </button>
          </>
        ) : (
          <button
            className="absolute w-10 h-10 dark:bg-slate-600 dark:hover:bg-slate-500 left-[100%]"
            type="button"
            onClick={() => setIsOpen(true)}
          >
            <DoubleArrowRightIcon className="w-full h-full p-2" />
          </button>
        )}
      </div>
      {isOpen && <EventList filter={filterTerm} />}
    </aside>
  );
}

import clsx from 'clsx';

import { EventList } from '@/components/EventList';
import { useFilteredEvents } from '@/hooks/useFilteredEvents';
import { useSidebarState } from '@/store/sidebar';

import { EventNavActions } from './EventNavActions';

export function EventNav() {
  const { isOpen } = useSidebarState();

  const { events, filterTerm, setFilterTerm } = useFilteredEvents();

  return (
    <aside
      className={clsx(
        'flex flex-col overflow-hidden bg-slate-300 dark:bg-slate-900',
        isOpen ? 'min-w-[400px]' : 'w-0'
      )}
    >
      <EventNavActions filterTerm={filterTerm} onFilterChange={setFilterTerm} />
      <EventList events={events} />
    </aside>
  );
}

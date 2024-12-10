import { ViewVerticalIcon } from '@radix-ui/react-icons';

import { useEventDetails } from '@/hooks/useEventDetails';
import { useSidebarState } from '@/store/sidebar';

export function EditorHeader() {
  const { event } = useEventDetails();
  const sidebar = useSidebarState();
  const sidebarToggleLabel = sidebar.isOpen
    ? 'Скрыть боковую панель'
    : 'Показать боковую панель';

  return (
    <header className="h-10 flex items-center border-l dark:border-slate-700 bg-pink dark:bg-slate-800">
      <button
        aria-label={sidebarToggleLabel}
        title={sidebarToggleLabel}
        className="bg-slate-350 hover:bg-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700"
        type="button"
        onClick={sidebar.toggle}
      >
        <ViewVerticalIcon className="h-10 w-10 p-2" />
      </button>
      <h1 className="ml-8 text-xl font-bold">
        {event?.name ?? 'Ивент не выбран'}
      </h1>
    </header>
  );
}

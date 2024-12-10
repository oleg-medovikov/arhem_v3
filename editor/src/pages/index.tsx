import { EditorHeader } from '@/components/EditorHeader';
import { EditorRoot } from '@/components/EditorRoot';
import { EventNav } from '@/components/EventNav';

export default function Editor() {
  return (
    <div className="w-full h-full flex">
      <EventNav />
      <div className="grow flex flex-col">
        <EditorHeader />
        <EditorRoot />
      </div>
    </div>
  );
}

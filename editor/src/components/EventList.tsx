import { useQuery } from '@tanstack/react-query';
import ky, { HTTPError } from 'ky';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { API_BASE_URL } from '@/config';
import { useSession } from '@/store/session';

type EventsRespose = Array<{
  id: string;
  name: string;
  code_name: string;
  description: string | null;
  image: string | null;
  date_create: string;
  date_update: string;
  user: string;
}>;

type Props = {
  filter: string;
};

export function EventList({ filter }: Props) {
  const { token } = useSession();

  const { data: events } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      if (!token) {
        throw new Error('Нет токена');
      }
      return await ky
        .get<EventsRespose>(`${API_BASE_URL}/events`, {
          headers: { token },
        })
        .json();
    },
    enabled: !!token,
    retry(failureCount, error) {
      return (
        failureCount < 6 &&
        !(error instanceof HTTPError && error.response.status === 401)
      );
    },
  });

  const [filteredEvents, setFilteredEvents] = useState(events || []);

  useEffect(() => {
    if (!events) {
      return;
    }
    const tid = setTimeout(() => {
      const term = filter.trim().toLocaleLowerCase();
      setFilteredEvents(
        term.length > 0
          ? events.filter(
              ({ name, code_name }) =>
                name.toLocaleLowerCase().includes(term) ||
                code_name.toLocaleLowerCase().includes(term)
            )
          : events
      );
    }, 300);
    return () => {
      clearTimeout(tid);
    };
  }, [events, filter]);

  return (
    <ul className="overflow-auto">
      {filteredEvents?.map((evt) => (
        <li
          key={evt.id}
          className="border-b border-slate-200 dark:border-slate-700"
        >
          <Link
            href={{
              query: { event: evt.id },
              slashes: true,
            }}
            className="px-4 py-2 flex flex-col hover:bg-slate-400 dark:hover:bg-slate-800"
          >
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {evt.name}
            </span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {evt.code_name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

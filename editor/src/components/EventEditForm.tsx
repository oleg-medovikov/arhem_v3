import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ky from 'ky';
import { useEffect } from 'react';
import { useForm, ValidationRule } from 'react-hook-form';

import { API_BASE_URL } from '@/config';
import { useSession } from '@/store/session';
import { EventData, GameEvent } from '@/types';

import { FloppyIcon } from './icons/FloppyIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { TextareaField } from './TextareaField';
import { TextField } from './TextField';

type EventEditFields = Omit<EventData, 'id'>;

type Props = {
  event: GameEvent;
};

const required: ValidationRule<boolean> = {
  value: true,
  message: 'Поле обязательно',
};

export function EventEditForm({ event }: Props) {
  const { token } = useSession();
  const { handleSubmit, register, setValue } = useForm<EventEditFields>({
    defaultValues: { ...event },
  });
  const queryClient = useQueryClient();

  const {
    error,
    isError,
    isIdle,
    isPending,
    isSuccess,
    mutate: createEvent,
  } = useMutation({
    mutationFn: async (data: EventEditFields) => {
      if (!token) {
        throw new Error('Залогиньтесь');
      }
      return await ky.post(`${API_BASE_URL}/events`, {
        headers: { token },
        json: {
          ...data,
          id: event.id,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  useEffect(() => {
    if (!event) {
      return;
    }
    setValue('name', event.name);
    setValue('code', event.code);
    setValue('description', event.description);
    setValue('max_cols', event.max_cols);
    setValue('max_rows', event.max_rows);
  }, [event, setValue]);

  const onSubmit = handleSubmit((data) => {
    createEvent(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 items-stretch">
      <TextField label="Название" {...register('name', { required })} />
      <TextField label="Код" {...register('code', { required })} />
      <TextareaField label="Описание" {...register('description')} />
      <div className="flex gap-2">
        <TextField
          className="grow"
          label="Колонок"
          type="number"
          step={1}
          min={1}
          max={999}
          defaultValue={5}
          {...register('max_cols', { valueAsNumber: true })}
        />
        <TextField
          className="grow"
          label="Строк"
          type="number"
          step={1}
          min={1}
          max={999}
          defaultValue={5}
          {...register('max_rows', { valueAsNumber: true })}
        />
        <button
          className="h-8 pl-8 pr-2 self-end relative flex items-center justify-center gap-2 text-white bg-green-600 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-700"
          disabled={isPending}
          type="submit"
        >
          <span className="absolute left-2">
            {isIdle && <FloppyIcon className="w-5 h-5" />}
            {isPending && <SpinnerIcon className="w-5 h-5 animate-spin" />}
            {isSuccess && <CheckIcon className="w-5 h-5" />}
            {isError && <Cross2Icon className="w-5 h-5" />}
          </span>
          <span className="pl">Сохранить</span>
        </button>
      </div>
      {isError && (
        <p className="max-w-[368px] text-sm mt-5 text-red-500">
          {error.message}
        </p>
      )}
    </form>
  );
}

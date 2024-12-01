import { useMutation } from '@tanstack/react-query';
import ky from 'ky';
import { useRouter } from 'next/navigation';
import { useForm, ValidationRule } from 'react-hook-form';

import { TextField } from '@/components/TextField';
import { API_BASE_URL } from '@/config';

type UserCredentials = {
  username: string;
  password: string;
  passwordRepeat: string;
};

type UserRegisterResponse = {
  token: string;
  message: string;
};

const required: ValidationRule<boolean> = {
  value: true,
  message: 'Поле обязательно',
};

export default function Register() {
  const router = useRouter();

  const { isError, mutate: registerUser } = useMutation({
    mutationFn: async (json: UserCredentials) => {
      return await ky
        .post(`${API_BASE_URL}/users`, { json })
        .json<UserRegisterResponse>();
    },
    onSuccess: () => {
      router.push('/login');
    },
  });

  const {
    formState: { errors },
    getValues,
    register,
    handleSubmit,
  } = useForm<UserCredentials>();

  return (
    <div className="h-full py-64 flex justify-center">
      <form
        className="w-[300px] flex flex-col gap-4"
        onSubmit={handleSubmit((cred) => registerUser(cred))}
      >
        <TextField
          label="Логин"
          type="text"
          autoComplete="username"
          error={errors.username?.message}
          {...register('username', { required })}
        />
        <TextField
          label="Пароль"
          type="password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register('password', { required })}
        />
        <TextField
          label="Подтверждение пароля"
          type="password"
          autoComplete="new-password"
          error={errors.passwordRepeat?.message}
          {...register('passwordRepeat', {
            required,
            validate: (value: string) =>
              value === getValues('password') || 'Пароли не совпадают',
          })}
        />
        <button
          className="px-2 py-1 text-white bg-pink-800 hover:bg-pink-900"
          type="submit"
        >
          Создать пользователя
        </button>
        {isError && (
          <p className="text-red-600 dark:text-red-400">Что-то пошло не так</p>
        )}
      </form>
    </div>
  );
}

import { useHttp } from '@/hooks/useHttp';
import { useEffect } from 'react';

export const UserInfoPage = () => {
  const { get } = useHttp();
  const { data } = get('/user-info');

  useEffect(() => {
    console.log(data);
  });

  return (
    <div>
      <h1>User Info</h1>
      <div>
        {Object.keys(data.message).map((item, key) => {
          return (
            <li key={key}>
              {item}: {JSON.stringify(data.message[item])}
            </li>
          );
        })}
      </div>
    </div>
  );
};

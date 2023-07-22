import { useContext } from 'react';
import { IsLoggedInContext } from '@/app/auth/domain/application/IsLoggedInProvider';

export const useIsLoggedIn = () => useContext(IsLoggedInContext);

import { useContext } from 'react';

import { UserContext } from '../lib/userContext';

export const useUser = () => useContext(UserContext);

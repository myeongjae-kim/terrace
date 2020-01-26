import { NextPage as _NextPage } from 'next';

interface DefaultCustomProps {
  namespacesRequired?: string[]
}

type NextPage<T = {}, IP = {}> = _NextPage<T, IP | DefaultCustomProps>

export default NextPage;
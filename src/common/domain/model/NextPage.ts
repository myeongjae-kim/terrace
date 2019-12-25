import { NextPage as _NextPage } from 'next';

interface DefaultCustomProps {
  namespacesRequired?: string[]
}

type NextPage<T = {}> = _NextPage<T, DefaultCustomProps>

export default NextPage;
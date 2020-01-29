import { NextPage as _NextPage } from 'next';

interface DefaultCustomProps {
  namespacesRequired?: string[]
}

type NextPage<P = {}, IP = P> = _NextPage<P, IP | DefaultCustomProps>

export default NextPage;
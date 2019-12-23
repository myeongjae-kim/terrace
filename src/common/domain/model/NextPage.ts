import { NextPage as _NextPage } from 'next';

interface DefaultCustomProps {
  namespacesRequired?: string[]
}

type NextPage = _NextPage<DefaultCustomProps>

export default NextPage;
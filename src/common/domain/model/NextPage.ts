import { NextPage as _NextPage } from 'next';

interface DefaultCustomProps {
  namespacesRequired?: string[]
}

export default interface NextPage<P = DefaultCustomProps, IP = P> extends _NextPage<P, IP> { }
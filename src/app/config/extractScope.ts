import { Newable } from 'inversify';
import 'reflect-metadata';

export const extractScope = (target: Newable<unknown>) => {
  // https://github.com/inversify/monorepo/blob/main/packages/container/libraries/core/src/reflectMetadata/data/classMetadataReflectKey.ts
  const metadataKey = '@inversifyjs/core/classMetadataReflectKey';
  const metadata = Reflect.getMetadata(metadataKey, target);
  return metadata?.scope;
};

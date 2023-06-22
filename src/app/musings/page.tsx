import { musingPersistenceAdapter } from '@/app/musings/adapter/musingPersistenceAdapter';

const Musings = async () => {
  const musings = await musingPersistenceAdapter.findAll();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>musings</div>
      <div>{JSON.stringify(musings, null, 2)}</div>
    </main>
  );
};

export default Musings;

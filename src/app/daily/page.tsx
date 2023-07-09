import { dailyPersistenceAdapter } from '@/app/daily/adapter/dailyPersistenceAdapter';

const DailyPage = async () => {
  const dailies = await dailyPersistenceAdapter.findAll(1);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>daily</div>
      <div>{JSON.stringify(dailies, null, 2)}</div>
    </main>
  );
};

export default DailyPage;

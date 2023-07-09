import PageHeader from '@/app/common/components/PageHeader';

const PlacesPage = () => {
  return (
    <main className="flex flex-col items-center justify-between">
      <PageHeader>Places</PageHeader>
      <p className={'font-light'}>where I have been</p>
      <div className={'w-full px-4'}>
        <iframe
          className={'mb-10 mt-5 h-[32rem] w-full max-w-5xl rounded shadow-xl'}
          src="https://api.mapbox.com/styles/v1/myeongjae/cjl07pcz14j9t2sqmsp0swqhg.html?fresh=true&title=true&access_token=pk.eyJ1IjoibXllb25namFlIiwiYSI6ImNqbDAzdWFhZjEwd2kza3Bncmo0emFtM2wifQ.j2Y4BLsTivJxT7BU_bWFKg"
        />
      </div>
    </main>
  );
};

export default PlacesPage;

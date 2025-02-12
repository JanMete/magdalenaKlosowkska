import MainPage from '../mainPage/MainPage';

export default function Layout() {
  return (
    <>
      <div className='pt-2 pl-7 sticky'>
        <h1 className='text-4xl hover:underline hover:cursor-pointer inline-block'>
          Magdalena Kłosowska
        </h1>
      </div>
      <MainPage />
    </>
  );
}

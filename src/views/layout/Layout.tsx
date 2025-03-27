import MainPage from '../mainPage/MainPage';

export default function Layout() {
  return (
    <div className='flex flex-col gap-20 pl-10 pr-10'>
      <div className='pt-3 sticky'>
        <h1 className='text-m font-bold hover:text-primaryColor hover:cursor-pointer inline-block'>
          Magdalena Kłosowska
        </h1>
      </div>
      <MainPage />
    </div>
  );
}

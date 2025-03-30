import About from '../../components/about/About';
import Navigation from '../../components/navigation/Navigation';

const MainPage: React.FC = () => {
  return (
    <div className='flex flex-col gap-y-16 md:flex-row md:gap-y-0 md:gap-x-4 justify-between'>
      <Navigation />
      <About />
    </div>
  );
};

export default MainPage;

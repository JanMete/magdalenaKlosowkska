import About from '../../components/about/About';
import Navigation from '../../components/navigation/Navigation';

const MainPage: React.FC = () => {
  return (
    <div className='flex justify-between'>
      <Navigation />
      <About />
    </div>
  );
};

export default MainPage;

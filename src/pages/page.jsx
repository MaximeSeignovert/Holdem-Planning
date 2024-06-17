import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'

const Home = () => {
  return (
    <div>
    <div className="mt-[30vh] max-w-md mx-auto flex flex-col items-center">
      <h1 className='text-2xl font-bold mb-5'>Poker Timer</h1>
      <Link className='link-to-page' to="/reunion">
        <Button>Commencer la réunion</Button>
      </Link>
    </div>
    </div>
    
  );
};

export default Home;

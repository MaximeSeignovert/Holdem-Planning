import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'

const Home = () => {
  return (
    <div>
    <div className="mt-[200px] max-w-md mx-auto">
      <h1>Poker Timer</h1>
      <Link className='link-to-page' to="/reunion">
        <Button>Commencer la réunion</Button>
      </Link>
    </div>
    </div>
    
  );
};

export default Home;

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'

const Home = () => {
  return (
    <>
      <div className="max-w-md mx-auto flex flex-col items-center">
        <h1 className='text-2xl font-bold mb-5'>Holdem Planning</h1>
        <Link className='link-to-page' to="/reunion">
          <Button>Commencer la réunion</Button>
        </Link>
        <div className='flex mt-5 items-center justify-center w-[50px]'>
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Diamond%20Suit.png" alt="Diamond Suit"/>
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Club%20Suit.png" alt="Club Suit" />
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Heart%20Suit.png" alt="Heart Suit" />
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Spade%20Suit.png" alt="Spade Suit"/>
        </div>
      </div>
    </>
   
    
    
    
  );
};

export default Home;

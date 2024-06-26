import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import useDarkMode from '@/hooks/DarkMode';

const Settings = () => {
const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [prefix, setPrefix] = useState(() => localStorage.getItem('prefix'));
  const [redirect, setRedirect] = useState(localStorage.getItem('redirect')==='true');

  const handlePrefixChange = (event) => {
    setPrefix(event.target.value);
    localStorage.setItem('prefix', event.target.value);
  };

  const handleRedirectSwitch = () => {
    localStorage.setItem('redirect', !redirect);
    setRedirect(!redirect)
  };

  return (
    <div className=" parameter absolute top-[--header-height] right-[10px] border p-5 m-2 bg-white dark:bg-[#020817] backdrop-blur rounded-lg shadow">
      <div className='list-parameter'>
        <ul>
          <li>
            <div className="flex items-center space-x-2 mb-3">
              <Label htmlFor="dark-mode" className='dark:text-white text-black'>DarkMode</Label>
              <Switch id="dark-mode" onClick={toggleDarkMode} checked={isDarkMode} />
            </div>
          </li>
          <li>
            <div className="grid w-full max-w-sm items-center mb-3 gap-1.5">
                <Label htmlFor="prefix" className='dark:text-white text-black'>Préfix de redirection</Label>
                <Input id="prefix" type="text" className='dark:text-white text-black' onChange={handlePrefixChange} value={prefix}/>
            </div>
          </li>
          <li>
            <div className="flex items-center space-x-2">
              <Label htmlFor="redirection-mode" className='dark:text-white text-black'>Redirection Jira</Label>
              <Switch checked={redirect} onClick={handleRedirectSwitch} id="redirection-mode" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useUserSettings } from '@/contexts/userSettingsContext'; // Mettez à jour le chemin d'importation selon votre structure de fichiers

const Settings = () => {
  const { isDarkMode, toggleDarkMode, prefix, updatePrefix, redirect, toggleRedirect } = useUserSettings();

  const handlePrefixChange = (event) => {
    updatePrefix(event.target.value);
  };

  return (
    <div className='w-full flex flex-col justify-center items-center mt-10 space-y-10'>
      <ul className='sm:min-w-[500px] space-y-8'>
        <li>
          <div className="w-full flex items-center justify-between">
            <Label htmlFor="dark-mode" className='dark:text-white text-black'>DarkMode</Label>
            <Switch id="dark-mode" onClick={toggleDarkMode} checked={isDarkMode} />
          </div>
        </li>
        <li>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="prefix" className='dark:text-white text-black'>Préfix de redirection</Label>
            <Input id="prefix" type="text" className='rounded max-w-[220px]' onChange={handlePrefixChange} value={prefix} />
          </div>
        </li>
        <li>
          <div className="w-full flex items-center justify-between">
            <Label htmlFor="redirection-mode" className='dark:text-white text-black'>Redirection Jira</Label>
            <Switch checked={redirect} onClick={toggleRedirect} id="redirection-mode" />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Settings;

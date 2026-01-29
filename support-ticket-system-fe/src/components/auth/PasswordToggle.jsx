import { EyeIcon, EyeOffIcon } from '../../assets/icons';

const PasswordToggle = ({ show, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
  >
    {show ? <EyeIcon /> : <EyeOffIcon />}
  </button>
);

export default PasswordToggle;

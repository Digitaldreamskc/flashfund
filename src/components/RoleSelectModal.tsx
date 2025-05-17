import { FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type RoleSelectModalProps = {
  onSelect: (role: 'donor' | 'requester') => void;
};

const RoleSelectModal: React.FC<RoleSelectModalProps> = ({ onSelect }) => {
  return (
    <div>
      {/* Your modal layout here */}
      <button onClick={() => onSelect('donor')}>I'm a Donor</button>
      <button onClick={() => onSelect('requester')}>I need Help</button>
    </div>
  );
};

export default RoleSelectModal; 
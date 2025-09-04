import React from 'react';
import BaseServiceDetail from './BaseServiceDetail';
import { getServiceById } from '@/data/services';

const SoundSystem: React.FC = () => {
  const service = getServiceById('sound-systems');
  
  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <BaseServiceDetail service={service}>
      {/* Add any voice over specific content here */}
    </BaseServiceDetail>
  );
};

export default SoundSystem;

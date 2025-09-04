import React from 'react';
import BaseServiceDetail from './BaseServiceDetail';
import { getServiceById } from '@/data/services';

const AudioProduction: React.FC = () => {
  const service = getServiceById('audio-production');
  
  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <BaseServiceDetail service={service}>
      {/* Add any audio production specific content here */}
    </BaseServiceDetail>
  );
};

export default AudioProduction;

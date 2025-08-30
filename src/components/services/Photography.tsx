import React from 'react';
import BaseServiceDetail from './BaseServiceDetail';
import { getServiceById } from '@/data/services';

const Photography: React.FC = () => {
  const service = getServiceById('photography');
  
  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <BaseServiceDetail service={service}>
      {/* Add any photography specific content here */}
    </BaseServiceDetail>
  );
};

export default Photography;

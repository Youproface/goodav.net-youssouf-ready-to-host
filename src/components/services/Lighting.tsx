import React from 'react';
import BaseServiceDetail from './BaseServiceDetail';
import { getServiceById } from '@/data/services';

const Lighting: React.FC = () => {
  const service = getServiceById('lighting');
  
  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <BaseServiceDetail service={service}>
      {/* Add any lighting specific content here */}
    </BaseServiceDetail>
  );
};

export default Lighting;

import React from 'react';
import BaseServiceDetail from './BaseServiceDetail';
import { getServiceById } from '@/data/services';

const Streaming: React.FC = () => {
  const service = getServiceById('live-streaming');
  
  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <BaseServiceDetail service={service}>
      {/* Add any streaming specific content here */}
    </BaseServiceDetail>
  );
};

export default Streaming;

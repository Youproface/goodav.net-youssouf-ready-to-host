import React from 'react';
import BaseServiceDetail from './BaseServiceDetail';
import { getServiceById } from '@/data/services';

const VideoProduction: React.FC = () => {
  const service = getServiceById('video-production');
  
  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <BaseServiceDetail service={service}>
      {/* Add any video production specific content here */}
    </BaseServiceDetail>
  );
};

export default VideoProduction;

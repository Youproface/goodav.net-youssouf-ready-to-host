import React from 'react';

interface SchemaMarkupProps {
  schema: object;
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ schema }) => (
  <script type="application/ld+json">
    {JSON.stringify(schema)}
  </script>
);

export default SchemaMarkup;

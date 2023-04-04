import React, { FC } from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface LoadingsProps {
  variant?: string;
}

const Loadings: FC<LoadingsProps> = ({ variant = 'primary' }) => {
  return (
    <div className="text-center">
      <Spinner animation="border" variant={variant} />
    </div>
  );
};

export default Loadings;

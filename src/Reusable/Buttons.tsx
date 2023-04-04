import React from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';

interface ButtonsProps extends ButtonProps {
  label: string;
}

const Buttons = ({ variant, label, onClick, href, type, disabled, className }: ButtonsProps) => {
  return (
    <Button variant={variant} onClick={onClick} href={href} type={type} disabled={disabled} className={className}>
      {label}
    </Button>
  );
};

export default Buttons;

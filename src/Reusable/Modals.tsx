import React, { FC } from 'react';
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import Button, { ButtonProps } from 'react-bootstrap/Button';

interface ModalsProps extends ModalProps {
  title: string;
  message: string;
  primaryButtonLabel?: string;
  primaryButtonVariant?: ButtonProps['variant'];
  onPrimaryButtonClick?: () => void;
  secondaryButtonLabel?: string;
  secondaryButtonVariant?: ButtonProps['variant'];
  onSecondaryButtonClick?: () => void;
  closeButtonLabel?: string;
  onCloseButtonClick?: () => void;
}

const Modals: FC<ModalsProps> = ({
  show,
  title,
  message,
  primaryButtonLabel,
  primaryButtonVariant,
  onPrimaryButtonClick,
  secondaryButtonLabel,
  secondaryButtonVariant,
  onSecondaryButtonClick,
  closeButtonLabel,
  onCloseButtonClick,
  ...rest
}) => {
  return (
    <Modal show={show} onHide={onCloseButtonClick} {...rest}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        {secondaryButtonLabel && (
          <Button variant={secondaryButtonVariant} onClick={onSecondaryButtonClick}>
            {secondaryButtonLabel}
          </Button>
        )}
        {primaryButtonLabel && (
          <Button variant={primaryButtonVariant} onClick={onPrimaryButtonClick}>
            {primaryButtonLabel}
          </Button>
        )}
        {closeButtonLabel && (
          <Button variant="secondary" onClick={onCloseButtonClick}>
            {closeButtonLabel}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default Modals;

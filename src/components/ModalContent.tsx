type ModalContentProps = {
  title: string;
  description: string;
  icon: string;
  titleButton: string;
  isOpen: (open: boolean) => void;
  handleConfirmButton: () => void;
}

export function ModalContent({ title, description, icon, titleButton, isOpen, handleConfirmButton }: ModalContentProps) {
  return (
    <div className='modal-content '>
      <img src={icon} alt='Encerrar sala' />
      <span>{title}</span>
      <p>{description}</p>
      <div>
        <button id='button-cancelar' onClick={() => isOpen(false)}>cancelar</button>
        <button id='button-excluir' onClick={handleConfirmButton}>{titleButton}</button>
      </div>
    </div>
  );
}
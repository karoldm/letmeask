import ReactModal from 'react-modal';

type ModalContentProps = {
  title: string;
  description: string;
  icon: string;
  titleButton: string;
  setModalOpen: (open: boolean) => void;
  handleConfirmButton: () => void;
  isOpen: boolean;
}

ReactModal.setAppElement('#root');

export function Modal({
  title,
  description,
  icon,
  titleButton,
  setModalOpen,
  handleConfirmButton,
  isOpen }: ModalContentProps) {

  return (
    <ReactModal
      isOpen={isOpen}
      className={"ReactModal__Content"}
      overlayClassName={"ReactModal__Overlay"}
    >

      <div className='modal-content '>
        <img src={icon} alt={title} />
        <span>{title}</span>
        <p>{description}</p>
        <div>
          <button id='button-cancelar' onClick={() => setModalOpen(false)}>cancelar</button>
          <button id='button-confirm' onClick={handleConfirmButton}>{titleButton}</button>
        </div>
      </div>
    </ReactModal>
  );
}
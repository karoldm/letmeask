import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

import ReactModal from 'react-modal';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import closeRoomImg from '../assets/images/close-room.svg';
import deleteQuestionImg from '../assets/images/delete-question.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';

import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';
import '../styles/modal.scss';

import { database } from '../services/firebase';
import { ModalContent } from '../components/ModalContent';


type RoomParams = {
  id: string;
}

export function AdminRoom() {
  //const { user } = useAuth();

  const [modalQuestionIsOpen, setModalQuestionIsOpen] = useState(false);
  const [modalCloseRoomIsOpen, setModalCloseRoomIsOpen] = useState(false);
  const [questionId, setQuestionId] = useState('');

  const params = useParams<RoomParams>();
  const roomId = params.id!;
  const navigate = useNavigate();

  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    navigate('/');
  }

  async function handleDeleteQuestion() {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    setModalQuestionIsOpen(false);
  }

  ReactModal.setAppElement('#root');

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={logoImg} alt='letmeask' />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={() => setModalCloseRoomIsOpen(true)}>Encerrar sala</Button>
          </div>
        </div>
      </header>
      <main>
        <div className='room-title'>
          <h1>sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className='question-list'>
          {questions.map((question) => {
            return (
              <Question
                content={question.content}
                author={question.author}
                key={question.id}
              >
                <button
                  type='button'
                  onClick={() => {
                    setQuestionId(question.id);
                    setModalQuestionIsOpen(true);
                  }}
                >
                  <img src={deleteImg} alt='Remover pergunta' />
                </button>
              </Question>
            )
          })}
        </div>
      </main >
      <ReactModal
        isOpen={modalQuestionIsOpen}
        className={"ReactModal__Content"}
        overlayClassName={"ReactModal__Overlay"}
      >
        <ModalContent
          title={'Excluir pergunta'}
          description={'Tem certeza que deseja excluir essa pergunta?'}
          icon={deleteQuestionImg}
          titleButton={'sim, excluir'}
          isOpen={() => setModalQuestionIsOpen(false)}
          handleConfirmButton={handleDeleteQuestion}
        />
      </ReactModal>
      <ReactModal
        isOpen={modalCloseRoomIsOpen}
        className={"ReactModal__Content"}
        overlayClassName={"ReactModal__Overlay"}
      >
        <ModalContent
          title={'Encerrar sala'}
          description={'Tem certeza que você deseja encerrar esta sala?'}
          icon={closeRoomImg}
          titleButton={'sim, encerrar'}
          isOpen={() => setModalCloseRoomIsOpen(false)}
          handleConfirmButton={handleEndRoom}
        />
      </ReactModal>
    </div >
  );
}
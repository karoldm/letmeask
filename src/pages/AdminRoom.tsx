import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import answerImg from "../assets/images/answer.svg";
import checkImg from "../assets/images/check.svg";
import closeRoomImg from "../assets/images/close-room.svg";
import deleteQuestionImg from "../assets/images/delete-question.svg";
import deleteImg from "../assets/images/delete.svg";
import ilustrationImg from "../assets/images/Ilustração.svg";
import logoImg from "../assets/images/logo.svg";

import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";

import { useRoom } from "../hooks/useRoom";

import "../styles/modal.scss";
import "../styles/room.scss";

import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const [modalQuestionIsOpen, setModalQuestionIsOpen] = useState(false);
  const [modalCloseRoomIsOpen, setModalCloseRoomIsOpen] = useState(false);
  const [questionId, setQuestionId] = useState("");

  const params = useParams<RoomParams>();
  const roomId = params.id!;
  const navigate = useNavigate();

  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    navigate("/");
  }

  async function handleDeleteQuestion() {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    setModalQuestionIsOpen(false);
  }

  async function handleCheckQuestionAsAnswered(id: string) {
    await database.ref(`rooms/${roomId}/questions/${id}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(id: string) {
    const questionData = await database
      .ref(`rooms/${roomId}/questions/${id}`)
      .get();
    await database.ref(`rooms/${roomId}/questions/${id}`).update({
      isHighlighted: !questionData.val().isHighlighted,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={() => setModalCloseRoomIsOpen(true)}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className="question-list">
          {questions.length > 0 ? (
            questions.map((question) => {
              return (
                <Question
                  content={question.content}
                  author={question.author}
                  key={question.id}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          handleCheckQuestionAsAnswered(question.id);
                        }}
                      >
                        <img
                          src={checkImg}
                          alt="Marcar pergunta como respondida"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleHighlightQuestion(question.id);
                        }}
                      >
                        <img src={answerImg} alt="Dar destaque a pergunta" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setQuestionId(question.id);
                      setModalQuestionIsOpen(true);
                    }}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
              );
            })
          ) : (
            <div className="no-questions">
              <img src={ilustrationImg} alt="ilustração de caixas de texto" />
              <strong>Nenhuma pergunta por aqui...</strong>
              <p>
                Envie o código desta sala para seus amigos e comece a responder
                perguntas!
              </p>
            </div>
          )}
        </div>
      </main>
      <Modal
        title={"Excluir pergunta"}
        description={"Tem certeza que deseja excluir essa pergunta?"}
        icon={deleteQuestionImg}
        titleButton={"sim, excluir"}
        setModalOpen={() => setModalQuestionIsOpen(false)}
        handleConfirmButton={handleDeleteQuestion}
        isOpen={modalQuestionIsOpen}
      />
      <Modal
        title={"Encerrar sala"}
        description={"Tem certeza que você deseja encerrar esta sala?"}
        icon={closeRoomImg}
        titleButton={"sim, encerrar"}
        setModalOpen={() => setModalCloseRoomIsOpen(false)}
        handleConfirmButton={handleEndRoom}
        isOpen={modalCloseRoomIsOpen}
      />
    </div>
  );
}

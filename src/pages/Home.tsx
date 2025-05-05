import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

export function Home() {
  const [roomCode, setRoomCode] = useState('');

  const navigate = useNavigate();
  const { signInWithGoogle, user } = useAuth();

  async function handleCreateRoom() {
    try {
      if (!user) {
        await signInWithGoogle();
      }
      if (user) {
        navigate('/rooms/new');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exist!');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed!');
      return;
    }

    navigate(`/rooms/${roomCode}`);
  }

  return (
    <div id='page-auth'>
      <aside>
        <img src={illustrationImg} alt='Ilustração simbolizando perguntas e respostas' />
        <strong>Criar salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt='letmeask' />
          <button className='create-room' onClick={handleCreateRoom} >
            <img src={googleIconImg} alt='logo do Google' />
            Crie sua sala com o Google
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type='text'
              placeholder='Digite o código da sala'
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            >
            </input>
            <Button type='submit' >Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
# Letmeask

Letmeask é uma aplicação para criar salas de chat e responder perguntas durante transmissões ao vivo. Feito com **ReactJS**, **TypeScript**, **SCSS** e **Firebase**, ele permite que criadores interajam com o público de forma simples e eficiente.

## ✨ Funcionalidades

- **Login com Google** via Firebase Authentication
- **Criação de salas** e compartilhamento de códigos para os participantes
- **Envio de perguntas** pelos participantes
- **Administração da sala**: excluir, destacar e marcar perguntas como respondidas
- **Curtidas nas perguntas** para destacar as mais relevantes
- **Banco de dados em tempo real** com Firebase Realtime Database

## 💪 Tecnologias Utilizadas

- **ReactJS**
- **TypeScript**
- **SCSS**
- **Firebase (Authentication + Realtime Database)**

## 🛠️ Como Rodar o Projeto

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/letmeask.git
   cd letmeask
   ```

2. **Instale as dependências:**
   ```sh
   yarn install
   ```

3. **Configure o Firebase:**
   - Crie um projeto no [Firebase](https://firebase.google.com/)
   - Ative **Authentication** (método Google)
   - Ative **Realtime Database**
   - Crie um arquivo `.env` e adicione as credenciais:
     ```env
     REACT_APP_FIREBASE_API_KEY=XXXXXX
     REACT_APP_FIREBASE_AUTH_DOMAIN=XXXXXX
     REACT_APP_FIREBASE_DATABASE_URL=XXXXXX
     REACT_APP_FIREBASE_PROJECT_ID=XXXXXX
     REACT_APP_FIREBASE_STORAGE_BUCKET=XXXXXX
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=XXXXXX
     REACT_APP_FIREBASE_APP_ID=XXXXXX
     ```

4. **Inicie o projeto:**
   ```sh
   yarn start
   ```

## 🎉 Contribuição

Sinta-se à vontade para abrir issues e pull requests! 🚀

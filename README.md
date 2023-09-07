<h1 align="left" margin-top="0">Labook</h1> 
O Labook é uma API que trata de uma rede social, ela tem as funcionalidades de login e cadastro de novos usuários, onde os usuários podem incluir, alterar ou deletar suas publicações, além de poder dar like ou dislike nas publicações de outros usuários.

<span id='indice'></span>
## Índice:

- <a href="#layout">Layout</a>
- <a href="#requests">Requisições</a>
- <a href="#example">Exemplo de Requisições</a>
- <a href="#comorodar">Como rodar este projeto</a>
- <a href="#tecnologias">Tecnologias Utilizadas</a>
- <a href="#link">Documentação</a>
- <a href="#author">Pessoas autoras</a>
<hr/>

<span id="layout"></span>
<a href="#indice">:arrow_backward:Indíce</a>
	
## Layout: 
#### a) Estrutura das pastas
<img src="https://github.com/bartomsilva/Labook-backend/assets/106079184/eac02979-d853-46b0-b1c0-733986533028" height="40%"/>

#### b) Endpoints implementados
- [X]  Singup
- [X]  Login 
- [X]  Create post
- [X]  Get posts 
- [X]  Edit post
- [X]  Delete post
- [X]  Like / Dislike post

importante: endpoints dos posts protegidos, precisa enviar um token válido para poder acessar.

<hr/>
<span id="requests"></span>
<a href="#indice">:arrow_backward:Indíce</a>

## Requisições (Paths): 
#### Requisições de Usuários
- /users
#### Requisições de Posts
- /posts

<hr/>
<span id="example"></span>
<a href="#indice">:arrow_backward:Indíce</a>

## Exemplos de requisição:

#### POST /users/singup
Permite o cadastro de um usuário e retorna um token. 

<img src="https://github.com/bartomsilva/Labook-backend/assets/106079184/73b29a5f-7b7c-47a5-974e-ea2805cf6b20" />
<br>
<img src="https://github.com/bartomsilva/Labook-backend/assets/106079184/c03ecebd-ba13-402f-93e6-a5a6ea18644d" />


#### POST /users/login 
Permite o usuário efetuar login e devolve um token. 

<img src="https://github.com/bartomsilva/Labook-backend/assets/106079184/17536f5d-3eab-40ff-bb4a-9f289e192baa"/>
<br>
<img src="https://github.com/bartomsilva/Labook-backend/assets/106079184/57957d0e-8119-46bf-8b4f-40396a392a95"/>

#### POST /posts 
Cria um novo post.

<img src="https://github.com/bartomsilva/Labook-backend/assets/106079184/bbb54a80-190b-4c28-a979-b210ce83181b"/>


#### GET /posts 
Retorna a lista de todos os posts.

<img src="https://github.com/bartomsilva/Labook-backend/assets/106079184/e5b2d48f-a2b5-49d8-8fc0-f435e2aa2dcd"/>


#### PUT /posts 
Permite editar o conteúdo do post, epena o autor do post pode efetuar a edição.

<img src="https://github.com/bartomsilva/Labook-backend/assets/106079184/cb094e1a-821a-43af-8bf5-fbb7687d8e18"/>


#### DELETE /posts  
Permite deletar um post, mas apenas o próprio autor do post ou um usuário admin pode deletar um post.

<img src="https://github.com/bartomsilva/Labook-backend/assets/106079184/7a50860d-0c92-4561-97ff-d24767ea9241"/>

#### POST /posts/:id/like  
Permite dar um like ou dislike em um post.

<img src="https://github.com/bartomsilva/Labook-backend/assets/106079184/c706c032-460a-4faa-a643-09ea6edd3bc1"/>


<hr/>
<span id='comorodar'></span>
<a href="#indice">:arrow_backward:Indíce</a>



## 📄 Como rodar este projeto:

<p>Caso queira baixar e instalar este projeto em seu computador, é necessário que tenha o git e o node instalados.</p>

### Links:  <a href="https://nodejs.org/en">Node</a> - <a href="https://git-scm.com/">Git</a>

<p>Se já tem ambos instalados ou após instalar, siga os passos abaixo:</p>

```bash

# Copie o link a baixo

https://github.com/bartomsilva/Labook-backend

# Abra um terminal e digite o seguinte comando

git clone (cole a url aqui)

# acesse a página criada 

cd Labook-backend

# Instale as dependências
npm install
ou
yarn install

# Configurando o ambiente
renomeie o arquivo .env.example para .env	

# Executando o Projeto
npm run start
ou 
yarn start

```
<hr/>
<span id="tecnologias"></span>
<a href="#indice">:arrow_backward:Indíce</a>

## 💻 Tecnologias:
<div align="center">

<img src="https://github.com/bartomsilva/labecommerce-backend/assets/106079184/2ecbb441-e22d-4be2-b67b-5fff6f606583" height="55px"/>
<img src="https://github.com/bartomsilva/labecommerce-backend/assets/106079184/365c791b-268b-45f5-9268-9b1bad354a57" height="55px"/>
<img src="https://github.com/bartomsilva/labecommerce-backend/assets/106079184/0e5d0c6e-bae0-43c9-b641-2d375361c29a" height="55px"/><br>
<img src="https://github.com/bartomsilva/labecommerce-backend/assets/106079184/a6ce0cb3-39d8-4d48-af03-9b1ff68a2809" height="55px"/>
<img src="https://github.com/bartomsilva/labecommerce-backend/assets/106079184/932a21bf-bd42-4b0c-87f8-8941d86f56f7" height="55px"/>
<img src="https://github.com/bartomsilva/labecommerce-backend/assets/106079184/bb5f2801-cf54-40da-ab18-1878173a177b" height="55px"/><br>
<img src="https://github.com/bartomsilva/Labook-backend/assets/106079184/36e9a0dd-c546-4b30-adfb-65ed7f36630e" height="55px"/>
<img src="https://github.com/bartomsilva/Labook-backend/assets/106079184/7891f0ec-fafd-4fd4-98aa-61ba9a29b1f5" height="55px"/>
<img src="https://github.com/bartomsilva/Labook-backend/assets/106079184/540d223e-81e0-4a88-b883-a08bdf8d441e" height="55px"/>


</div>
<hr/>

<span id="link"></span>

## Documentação: 

https://documenter.getpostman.com/view/26149268/2s9Xy2NBNw

<span id="author"></span>

## 📫 Pessoas autoras:

<img style="width: 200px; border-radius: 50% 0 " src="https://avatars.githubusercontent.com/u/106079184?s=400&u=753f5466a77193fe7077e495475b242787de0435&v=4" alt="imagem do autor">
<p>Bartolomeu Mariano ( Bart Silva )</p>

linkedin: https://www.linkedin.com/in/bart-silva-br/

<span id='next'></span>




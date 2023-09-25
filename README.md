<h1 align="left" margin-top="0">Labeddit Backend</h1> 
O Labeddit Backend é uma API que faz parte do projeto final Integrador, projeto de cunho acadêmico, que trata de uma rede social: tem as funcionalidades de login, cadastro de novos usuários, incluir, editar, excluir e curtir posts, além de permitir comentar os posts. 

<span id='indice'></span>
## Índice:

- <a href="#Descrição">Layout</a>
- <a href="#requests">Requisições</a>
- <a href="#example">Exemplo de Requisições</a>
- <a href="#comorodar">Como rodar este projeto localmente</a>
- <a href="#tecnologias">Tecnologias Utilizadas</a>
- <a href="#link">Documentação no Postman </a>
- <a href="#author">Pessoas autoras</a>
<hr/>

<span id="layout"></span>
<a href="#indice">:arrow_backward:Indíce</a>
	
## Descrição:
<center>
Esta API foi construída sob camadas, aplicando os conceitos de Programação Orientada a Objetos e foi divididada em três camadas: (Controller, Business e Database),
utilizando o Nodejs com typescricpt além das biblíotecas: JWT (geração de tokens de acesso), UUII (criar os id´s), BCRYPT (criptografia de senhas), DOTENV (trabalhar
com variáveis de ambiente), ZOD (validação de dados) e o KNEX (tratamento do banco de dados), o banco de dados utilizado foi o Sqlite.
</center>

#### Camadas: 
- Controller: trata das requisições vinda dos clientes, aqui é feita a primeira validação utilizando o ZOD.
- Business: toda regra de negócio vai aqui, essa camada também e responsável por modelar os dados a rerem salvos ou retornados.
- Database: trata da leitura e armazenameto dos dados.

#### a) Endpoints 
- [X]  Signup
- [X]  Login 
- [X]  Create post
- [X]  Get posts 
- [X]  Edit post
- [X]  Delete post
- [X]  Create comment
- [X]  Get comments
- [x]  Edit comment
- [x]  Delete comment
- [X]  Like/Dislike - post / comments

importante: os endpoints de posts e comments são protegidos, e preciso enviar um token válido para poder acessar.

<hr/>
<span id="requests"></span>
<a href="#indice">:arrow_backward:Indíce</a>

## Requisições (Paths): 
#### Requisições de Usuários
- /users
#### Requisições de Posts
- /posts
#### Requisições de Comentários
- /comments
#### Requisições de Likes
- /likes

<hr/>
<span id="example"></span>
<a href="#indice">:arrow_backward:Indíce</a>

## Exemplos de requisição:

#### POST /users/signup
<br>
Permite o cadastro de um usuário.

- Exemplo de retorno
<p></p>
<img src="https://github.com/bartomsilva/Integrador-backend/assets/106079184/08de2113-ff4b-46c7-ae04-38ab7aba407a" height="160px"/>


#### POST /users/login 
<br>
Permite o usuário efetuar login e devolve um token. 

- Exemplo de retorno
<p></p>
<img src="https://github.com/bartomsilva/Integrador-backend/assets/106079184/8462dba1-a9e1-4e2e-849a-5a31e2da8297" height="160px/>
<p></p>	
	
#### POST /posts 
<br>
Cria um novo post.

- Exemplo de retorno
<p></p>
<img src="https://github.com/bartomsilva/Integrador-backend/assets/106079184/acee37b4-3d13-402d-94ff-f763d4ae3995" height="140px/>


#### GET /posts 
Retorna a lista de todos os posts.

- Exemplo de retorno
<p></p>
<img src="https://github.com/bartomsilva/Integrador-backend/assets/106079184/603948e6-75b4-444d-bb9c-0e832b4395c6" height="160px/>


#### PUT /posts 
Permite editar o conteúdo do post, epena o autor do post pode efetuar a edição.

- Exemplo de retorno
<p></p>
<img src="https://github.com/bartomsilva/Integrador-backend/assets/106079184/b17daf01-89a4-45ef-9888-76a7a6ef787f)"/>

#### DELETE /posts  
Permite deletar um post, mas apenas o próprio autor do post ou um usuário admin pode deletar um post.

- Exemplo de retorno
<p></p>
<img src="https://github.com/bartomsilva/Integrador-backend/assets/106079184/bca0a5f4-cf57-41e0-9583-5b4c33056c17)"/>

#### POST likes  
Permite dar um like ou dislike em um post.

**** incluir a parte dos comentários***** 




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




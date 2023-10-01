<h1 align="left" margin-top="0">Labeddit Backend</h1> 
O Labeddit Backend é uma API que faz parte do projeto final Integrador (full stack), projeto de cunho acadêmico, que trata de uma rede social: tem as funcionalidades de login, cadastro de novos usuários, incluir, editar, excluir e curtir posts, além de permitir comentar os posts. 

<span id='indice'></span>
## Índice:

- <a href="#descricao">Descrição</a>
- <a href="#requests">Requisições</a>
- <a href="#example">Exemplo de Requisições</a>
- <a href="#comorodar">Como rodar este projeto localmente</a>
- <a href="#tecnologias e serviços">Tecnologias Utilizadas</a>
- <a href="#link">Documentação</a>
- <a href="#linkfront">Link do front-end</a>
- <a href="#author">Pessoas autoras</a>
<hr/>

<span id="descricao"></span>
<a href="#indice">:arrow_backward:Indíce</a>
	
## Descrição:
<center>
Esta API, encontra-se hospedada na AWS usando AC2, que é um serviço do tipo IAAS, também utilizado o serviço de IP estático, o que garante o acesso constante do módulo front-end. Contruí a Labeddit, utilizando a arquitetura em camadas, aplicando os conceitos de Programação Orientada a Objetos e foi dividida em três camadas: (Controller, Business e Database) que são gerencidas através de roteamento, a linguagem utilizada foi nodejs com typescricpt, além das biblíotecas: JWT (geração de tokens de acesso), UUII (criar os id´s), BCRYPT (criptografia de senhas), DOTENV (trabalhar com variáveis de ambiente), ZOD (validação de dados) e o KNEX (tratamento do banco de dados), o banco de dados utilizado foi o Sqlite.

- link do front-end: 
<a href="https://github.com/bartomsilva/Integrador-frontend">**Link do Frontend**</a>
</center>

#### Camadas: 
- **Controller:** Trata das requisições vindas dos clientes, aqui é feita a primeira validação utilizando o ZOD.
- **Business:** Toda regra de negócio vai aqui, essa camada também e responsável por modelar os dados a rerem salvos ou retornados.
- **Database:** Trata da leitura e armazenameto dos dados.

<hr/>
<span id="requests"></span>
<a href="#indice">:arrow_backward:Indíce</a>

## Requisições (Paths): 
#### Requisições de Usuários
- /users
  
  endpoints: login / signup
#### Requisições de Posts
- /posts
  
  endpoints: create post / get posts / edit post / delete post
#### Requisições de Comentários
- /comments
  
  endpoints: create comment / get comments by post / edit comment / delete comment
#### Requisições de Likes
- /likes
  
  endopoint: like (faz o like e dislike juntos)

<hr/>
<span id="example"></span>
<a href="#indice">:arrow_backward:Indíce</a>

## Exemplos de requisição:

#### POST /users/signup
Permite o cadastro de um usuário, é requerido, nome, email e senha.

- Exemplo de retorno
  
<img src="https://github.com/bartomsilva/Integrador-backend/assets/106079184/08de2113-ff4b-46c7-ae04-38ab7aba407a"/>

#### POST /users/login 
Permite o usuário efetuar login e devolve um token, é requerido email e senha. 

- Exemplo de retorno

<img src="https://github.com/bartomsilva/Integrador-backend/assets/106079184/8462dba1-a9e1-4e2e-849a-5a31e2da8297" />

#### POST /posts 
Cria um novo post, é requerido o token e o texto do post.

- Exemplo de retorno
<img src="https://github.com/bartomsilva/Integrador-backend/assets/106079184/acee37b4-3d13-402d-94ff-f763d4ae3995" height="140px"/>

#### GET /posts 
Devolve uma lista contendo todos posts, é requirido apenas o token.

- Exemplo de retorno
  
<img src="https://github.com/bartomsilva/Integrador-backend/assets/106079184/4f9143a6-e790-4780-b978-233aebb0d252"/>

#### PUT /posts 
Permite editar o conteúdo do post, epena o autor do post pode efetuar a edição, é requerido o token, id do posto e o novo texto.

- Exemplo de retorno
  
<img src="https://github.com/bartomsilva/Integrador-backend/assets/106079184/b17daf01-89a4-45ef-9888-76a7a6ef787f)" height="140px"/>

#### DELETE /posts  
Permite deletar um post, somento o autor do post ou um admin podem deletar um post, é requerido o token e id do post.

- Exemplo de retorno
  
<img src="https://github.com/bartomsilva/Integrador-backend/assets/106079184/bca0a5f4-cf57-41e0-9583-5b4c33056c17)" height="120px"/>

#### POST /comments  
Cria um novo comentário, é requeirido o token, id do post e o texto contendo o comentário.

- Exemplo de retorno
  
<img src="https://github.com/bartomsilva/Integrador-backend/assets/106079184/2cb20ae3-da0b-4d64-b805-4b9c9f87b0eb" height="140px"/>


#### PUT /comments  
Efetua a auteração do texto de um comentário, é requeirido o token, id do comentário e o novo texto do comentário.

- Exemplo de retorno
  
<img src="https://github.com/bartomsilva/Integrador-backend/assets/106079184/ea0a6f5c-0243-4e24-9b40-4b4afbff4ee3" heigth="140px"/>

#### DELETE /comments  
Excluir um comentário, é requerido o token e id do comentário, essa operação só pode ser efetuada por quem postou o comentário,
um administrador ou pelo criador do post.

- Exemplo de retorno
  
<img src="https://github.com/bartomsilva/Integrador-backend/assets/106079184/0f81deba-6958-4844-a5da-cf405f927c1d" heigth="140px"/>


#### GET /comments  
Devolve uma lista constendo todos comentários de um determinado post, é requerido apenas o token. 

- Exemplo de retorno
  
<img src="https://github.com/bartomsilva/Integrador-backend/assets/106079184/0cb5759b-73e1-44ff-9a26-fd61a906f469" heigth="160px"/>


#### POST likes  
Permite curtir as postagens e comentários, através de um like ou dislike, e requerido o token, id do post ou comentário, 

- Exemplo de retorno

<img src="https://github.com/bartomsilva/Integrador-backend/assets/106079184/c522161c-2ddb-410f-bcc2-3f96e2eb9fa6" height="140px"/>


<hr/>
<span id='comorodar'></span>
<a href="#indice">:arrow_backward:Indíce</a>



## 📄 Como rodar este projeto:

<p>Caso queira baixar e instalar este projeto em seu computador, é necessário que tenha o git e o node instalados.</p>

### Links:  
<a href="https://nodejs.org/en">Node</a> - <a href="https://git-scm.com/">Git</a>

<p>Se já tem ambos instalados ou após instalar, siga os passos abaixo:</p>

```
# Copie o link a baixo
https://github.com/bartomsilva/Integrador-backend.git

# Abra um terminal e digite o seguinte comando
git clone (cole a url que copiou aqui)

# acesse a pasta criada 
cd Integrador-backend

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
<img src="https://github.com/bartomsilva/Integrador-backend/assets/106079184/0d99eea9-a8a2-4abb-839b-af2ea1c9483f" height="55px"/>

</div>
<hr/>

<span id="link"></span>

## Documentação: 

<a href="https://documenter.getpostman.com/view/26149268/2s9YJW7SGn">link da documentação<a/>


<span id="linkfront"></span>

## Front-end: 

<a href="https://github.com/bartomsilva/Integrador-frontend">Link do repositório do Front-end<a/>
<a href="http://18.204.122.118:3000/posts">Acesso a Página (deploy na AWS)</a>
<a href="labeddit-bart-silva.surge.sh">Acesso a Página (deploy sorge)</a>

<span id="author"></span>

## 📫 Pessoas autoras:

<img style="width: 200px; border-radius: 50% 0 " src="https://avatars.githubusercontent.com/u/106079184?s=400&u=753f5466a77193fe7077e495475b242787de0435&v=4" alt="imagem do autor">
<p>Bartolomeu Mariano ( Bart Silva )</p>

linkedin: https://www.linkedin.com/in/bart-silva-br/

<span id='next'></span>




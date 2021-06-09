import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const posts = [
    {
        id: 0,
        title: 'Hello World',
        coverUrl:
            'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
        contentPreview: 'Esta é a estrutura de um post esperado pelo front-end',
        content:
            'Este é o conteúdo do post, o que realmente vai aparecer na página do post...',
        commentCount: 2,
    },
];

const comments = [
    [
        {
            id: 1,
            postId: 0,
            author: 'João',
            content: 'Muito bom esse post! Tá de parabéns',
        },
        {
            id: 2,
            postId: 0,
            author: 'Maria',
            content: 'Como faz pra dar palmas?',
        },
    ],
];

app.get('/posts', (req, res) => {
    console.log('chegou uma requisicao');
    res.send(posts);
});

app.get('/posts/:idPosts', (req, res) => {
    console.log('chegou uma requisicao');
    const id = parseInt(req.params.idPosts);
    res.send(posts[id]);
});

app.get('/posts/:idPosts/comments', (req, res) => {
    console.log('chegou uma requisicao');
    const id = parseInt(req.params.idPosts);
    res.send(comments[id]);
});

let idPosts = 0;
app.post('/posts', (req, res) => {
    console.log('chegou uma requisicao');
    idPosts++;
    let newObject = req.body;
    newObject.id = idPosts;
    posts.push(newObject);
    res.send('chegou o post');
});

app.post('/posts/:idPosts/comments', (req, res) => {
    console.log('chegou uma requisicao');
    const id = parseInt(req.params.idPosts);
    let newComment = req.body;
    newComment.postId = idPosts;
    if (id === comments.length - 1) {
        newComment.id = comments[id].length;
        comments[id].push(newComment);
    } else {
        newComment.id = 0;
        comments.push([newComment]);
    }
    res.send('chegou o comentario');
});

app.listen(4000);

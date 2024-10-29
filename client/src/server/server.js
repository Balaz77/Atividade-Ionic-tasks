const express = require('express');    
const mysql = require('mysql2');       
const cors = require('cors');          

const app = express();                 
const port = 3000;                    


app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: 'localhost',       
  user: 'root',            
  password: '123456',    
  database: 'todo_database' 
});

// Conecta ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

// Rota para obter todas as tarefas
app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar tarefas:', err);
      res.status(500).json({ error: 'Erro ao buscar tarefas' });
      return;
    }
    res.json(results);
  });
});

// Rota para adicionar uma nova tarefa
app.post('/tasks', (req, res) => {
  const { name } = req.body;
  const sql = 'INSERT INTO tasks (name) VALUES (?)';
  db.query(sql, [name], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar tarefa:', err);
      res.status(500).json({ error: 'Erro ao adicionar tarefa' });
      return;
    }
    res.json({ id: result.insertId, name });
  });
});

// Rota para atualizar uma tarefa
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const sql = 'UPDATE tasks SET name = ? WHERE id = ?';
  db.query(sql, [name, id], (err) => {
    if (err) {
      console.error('Erro ao atualizar tarefa:', err);
      res.status(500).json({ error: 'Erro ao atualizar tarefa' });
      return;
    }
    res.json({ id, name });
  });
});

// Rota para deletar uma tarefa
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) {
      console.error('Erro ao deletar tarefa:', err);
      res.status(500).json({ error: 'Erro ao deletar tarefa' });
      return;
    }
    res.json({ message: 'Tarefa deletada com sucesso' });
  });
});

// Inicia o servidor na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

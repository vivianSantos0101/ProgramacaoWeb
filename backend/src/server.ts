import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import continenteRoutes from './routes/continenteRoutes';
import paisRoutes from './routes/paisRoutes';
import cidadeRoutes from './routes/cidadeRoutes';
import apiRoutes from './routes/apiRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/continentes', continenteRoutes);
app.use('/api/paises', paisRoutes);
app.use('/api/cidades', cidadeRoutes);
app.use('/api/external', apiRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

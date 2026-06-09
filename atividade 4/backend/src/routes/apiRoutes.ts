import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { getCountryInfo, getWeatherData } from '../services/externalApiService';

const router = Router();

router.use(authMiddleware);

// API 1: REST Countries — dados geográficos, bandeiras, brasões
router.get('/pais/:nome', async (req: AuthRequest, res: any) => {
  try {
    const nome = req.params.nome;
    console.log(`[API] Buscando país: ${nome}`);
    const data = await getCountryInfo(nome);
    if (!data) return res.status(404).json({ error: `País "${nome}" não encontrado. Tente usar o nome em inglês (ex: Brazil, Japan, France).` });
    res.json(data);
  } catch (error: any) {
    console.error('[API] Erro REST Countries:', error.message);
    res.status(500).json({ error: 'Erro ao consultar API externa' });
  }
});

// API 2: Open-Meteo — dados de clima (sem necessidade de chave)
router.get('/clima', async (req: AuthRequest, res: any) => {
  try {
    const { cidade } = req.query;
    if (!cidade) return res.status(400).json({ error: 'Nome da cidade é obrigatório' });

    console.log(`[API] Buscando clima: ${cidade}`);
    const data = await getWeatherData(cidade as string);
    if (!data) return res.status(404).json({ error: `Cidade "${cidade}" não encontrada. Tente outro nome.` });
    res.json(data);
  } catch (error: any) {
    console.error('[API] Erro Open-Meteo:', error.message);
    res.status(500).json({ error: 'Erro ao consultar API de clima' });
  }
});

export default router;

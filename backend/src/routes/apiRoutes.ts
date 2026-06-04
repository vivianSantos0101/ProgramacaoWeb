import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { getCountryInfo, getWeatherData } from '../services/externalApiService';

const router = Router();

router.use(authMiddleware);

router.get('/pais/:nome', async (req: AuthRequest, res: any) => {
  try {
    const data = await getCountryInfo(req.params.nome);
    if (!data) return res.status(404).json({ error: 'País não encontrado na API externa' });
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Erro ao consultar API externa' });
  }
});

router.get('/clima', async (req: AuthRequest, res: any) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: 'lat e lon são obrigatórios' });
    const data = await getWeatherData(parseFloat(lat as string), parseFloat(lon as string));
    if (!data) return res.status(503).json({ error: 'Clima indisponível (verifique a chave da API)' });
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Erro ao consultar API de clima' });
  }
});

export default router;

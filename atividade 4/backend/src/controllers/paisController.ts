import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

export async function listar(req: AuthRequest, res: Response) {
  try {
    const { pagina = '1', limite = '10', continenteId } = req.query;
    const page = parseInt(pagina as string);
    const limit = parseInt(limite as string);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (continenteId) where.continenteId = parseInt(continenteId as string);

    const [data, total] = await Promise.all([
      prisma.pais.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'asc' },
        include: {
          continente: { select: { id: true, nome: true } },
          _count: { select: { cidades: true } },
        },
      }),
      prisma.pais.count({ where }),
    ]);

    res.json({ data, total, pagina: page, totalPaginas: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar países' });
  }
}

export async function obter(req: AuthRequest, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const pais = await prisma.pais.findUnique({
      where: { id },
      include: {
        continente: { select: { id: true, nome: true } },
        cidades: true,
      },
    });
    if (!pais) return res.status(404).json({ error: 'País não encontrado' });
    res.json(pais);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter país' });
  }
}

export async function criar(req: AuthRequest, res: Response) {
  try {
    const { nome, populacao, idiomaOficial, moeda, continenteId } = req.body;
    if (!nome || !continenteId) return res.status(400).json({ error: 'Nome e continente são obrigatórios' });

    const pais = await prisma.pais.create({
      data: {
        nome,
        populacao: populacao ? BigInt(populacao) : null,
        idiomaOficial,
        moeda,
        continenteId: parseInt(continenteId),
      },
      include: { continente: { select: { id: true, nome: true } } },
    });
    res.status(201).json(pais);
  } catch (error: any) {
    if (error.code === 'P2002') return res.status(400).json({ error: 'País já existe neste continente' });
    if (error.code === 'P2003') return res.status(400).json({ error: 'Continente não encontrado' });
    res.status(500).json({ error: 'Erro ao criar país' });
  }
}

export async function atualizar(req: AuthRequest, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const { nome, populacao, idiomaOficial, moeda, continenteId } = req.body;

    const data: any = {};
    if (nome) data.nome = nome;
    if (populacao !== undefined) data.populacao = BigInt(populacao);
    if (idiomaOficial !== undefined) data.idiomaOficial = idiomaOficial;
    if (moeda !== undefined) data.moeda = moeda;
    if (continenteId) data.continenteId = parseInt(continenteId);

    const pais = await prisma.pais.update({
      where: { id },
      data,
      include: { continente: { select: { id: true, nome: true } } },
    });
    res.json(pais);
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ error: 'País não encontrado' });
    if (error.code === 'P2002') return res.status(400).json({ error: 'País já existe neste continente' });
    res.status(500).json({ error: 'Erro ao atualizar país' });
  }
}

export async function excluir(req: AuthRequest, res: Response) {
  try {
    const id = parseInt(req.params.id);
    await prisma.pais.delete({ where: { id } });
    res.json({ mensagem: 'País excluído com sucesso' });
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ error: 'País não encontrado' });
    res.status(500).json({ error: 'Erro ao excluir país' });
  }
}

export async function listarPorContinente(req: AuthRequest, res: Response) {
  try {
    const continenteId = parseInt(req.params.continenteId);
    const data = await prisma.pais.findMany({
      where: { continenteId },
      orderBy: { nome: 'asc' },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar países por continente' });
  }
}

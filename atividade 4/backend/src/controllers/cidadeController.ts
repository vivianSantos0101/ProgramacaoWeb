import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

export async function listar(req: AuthRequest, res: Response) {
  try {
    const { pagina = '1', limite = '10', paisId, continenteId } = req.query;
    const page = parseInt(pagina as string);
    const limit = parseInt(limite as string);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (paisId) where.paisId = parseInt(paisId as string);
    if (continenteId) where.pais = { continenteId: parseInt(continenteId as string) };

    const [data, total] = await Promise.all([
      prisma.cidade.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'asc' },
        include: {
          pais: {
            select: { id: true, nome: true, continente: { select: { id: true, nome: true } } },
          },
        },
      }),
      prisma.cidade.count({ where }),
    ]);

    res.json({ data, total, pagina: page, totalPaginas: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar cidades' });
  }
}

export async function obter(req: AuthRequest, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const cidade = await prisma.cidade.findUnique({
      where: { id },
      include: {
        pais: {
          select: { id: true, nome: true, continente: { select: { id: true, nome: true } } },
        },
      },
    });
    if (!cidade) return res.status(404).json({ error: 'Cidade não encontrada' });
    res.json(cidade);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter cidade' });
  }
}

export async function criar(req: AuthRequest, res: Response) {
  try {
    const { nome, populacao, latitude, longitude, paisId } = req.body;
    if (!nome || !paisId) return res.status(400).json({ error: 'Nome e país são obrigatórios' });

    const cidade = await prisma.cidade.create({
      data: {
        nome,
        populacao: populacao ? BigInt(Math.floor(Number(populacao))) : null,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        paisId: parseInt(paisId),
      },
      include: {
        pais: {
          select: { id: true, nome: true, continente: { select: { id: true, nome: true } } },
        },
      },
    });
    res.status(201).json(cidade);
  } catch (error: any) {
    if (error.code === 'P2002') return res.status(400).json({ error: 'Cidade já existe neste país' });
    if (error.code === 'P2003') return res.status(400).json({ error: 'País não encontrado' });
    console.error('[Cidade] Erro ao criar:', error.message);
    res.status(500).json({ error: 'Erro ao criar cidade' });
  }
}

export async function atualizar(req: AuthRequest, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const { nome, populacao, latitude, longitude, paisId } = req.body;

    const data: any = {};
    if (nome) data.nome = nome;
    if (populacao !== undefined) data.populacao = populacao ? BigInt(Math.floor(Number(populacao))) : null;
    if (latitude !== undefined) data.latitude = parseFloat(latitude);
    if (longitude !== undefined) data.longitude = parseFloat(longitude);
    if (paisId) data.paisId = parseInt(paisId);

    const cidade = await prisma.cidade.update({
      where: { id },
      data,
      include: {
        pais: {
          select: { id: true, nome: true, continente: { select: { id: true, nome: true } } },
        },
      },
    });
    res.json(cidade);
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ error: 'Cidade não encontrada' });
    if (error.code === 'P2002') return res.status(400).json({ error: 'Cidade já existe neste país' });
    res.status(500).json({ error: 'Erro ao atualizar cidade' });
  }
}

export async function excluir(req: AuthRequest, res: Response) {
  try {
    const id = parseInt(req.params.id);
    await prisma.cidade.delete({ where: { id } });
    res.json({ mensagem: 'Cidade excluída com sucesso' });
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ error: 'Cidade não encontrada' });
    res.status(500).json({ error: 'Erro ao excluir cidade' });
  }
}

export async function listarPorPais(req: AuthRequest, res: Response) {
  try {
    const paisId = parseInt(req.params.paisId);
    const data = await prisma.cidade.findMany({
      where: { paisId },
      orderBy: { nome: 'asc' },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar cidades por país' });
  }
}

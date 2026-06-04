import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

export async function listar(req: AuthRequest, res: Response) {
  try {
    const { pagina = '1', limite = '10' } = req.query;
    const page = parseInt(pagina as string);
    const limit = parseInt(limite as string);
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.continente.findMany({
        skip,
        take: limit,
        orderBy: { id: 'asc' },
        include: { _count: { select: { paises: true } } },
      }),
      prisma.continente.count(),
    ]);

    res.json({ data, total, pagina: page, totalPaginas: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar continentes' });
  }
}

export async function obter(req: AuthRequest, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const continente = await prisma.continente.findUnique({
      where: { id },
      include: {
        paises: {
          include: { _count: { select: { cidades: true } } },
        },
      },
    });
    if (!continente) return res.status(404).json({ error: 'Continente não encontrado' });
    res.json(continente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter continente' });
  }
}

export async function criar(req: AuthRequest, res: Response) {
  try {
    const { nome, descricao } = req.body;
    if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' });

    const continente = await prisma.continente.create({
      data: { nome, descricao },
    });
    res.status(201).json(continente);
  } catch (error: any) {
    if (error.code === 'P2002') return res.status(400).json({ error: 'Continente já existe' });
    res.status(500).json({ error: 'Erro ao criar continente' });
  }
}

export async function atualizar(req: AuthRequest, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const { nome, descricao } = req.body;

    const continente = await prisma.continente.update({
      where: { id },
      data: { nome, descricao },
    });
    res.json(continente);
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ error: 'Continente não encontrado' });
    if (error.code === 'P2002') return res.status(400).json({ error: 'Nome já existe' });
    res.status(500).json({ error: 'Erro ao atualizar continente' });
  }
}

export async function excluir(req: AuthRequest, res: Response) {
  try {
    const id = parseInt(req.params.id);
    await prisma.continente.delete({ where: { id } });
    res.json({ mensagem: 'Continente excluído com sucesso' });
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ error: 'Continente não encontrado' });
    res.status(500).json({ error: 'Erro ao excluir continente' });
  }
}

export async function listarTodos(req: AuthRequest, res: Response) {
  try {
    const data = await prisma.continente.findMany({ orderBy: { nome: 'asc' } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar continentes' });
  }
}

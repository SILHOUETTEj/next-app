import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (!existingUser) {
      return res.status(400).json({ message: 'Пользователя с таким логином не существует' });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неправильный пароль' });
    }

    res.status(201).json({ message: 'Успешный вход' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Метод ${req.method} не поддерживается`);
  }
}

import { Request, Response } from 'express';

import { GetFrequency } from '../lib/frequency';

export async function getData(req: Request, res: Response): Promise<void> {
  const { words: dirtyWords, year_from: yearFrom, year_to: yearTo } = req.body;
  const words = dirtyWords.map((word: string) => word.trim().toLowerCase());

  const frequencyData = await GetFrequency(words, yearFrom, yearTo);

  if (frequencyData.length > 0) {
    res.json({ data: frequencyData });
    return;
  }

  res.status(404).json({
    error: 'No frequency data was found for given parameters',
  });
}

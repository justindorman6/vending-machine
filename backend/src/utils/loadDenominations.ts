import fs from 'fs';
import path from 'path';

const loadDenominations = (): Record<string, number[]> => {
  const dataPath = path.resolve(__dirname, '../data/denominations.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(rawData);
};

export default loadDenominations;

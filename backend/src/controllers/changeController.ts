import { Request, Response } from 'express';
import ChangeService from '../services/changeService';
import VendingMachine from '../models/vendingMachine';
import loadDenominations from '../utils/loadDenominations';

const denominations = loadDenominations();
const changeService = new ChangeService();

export const getDenominations = (req: Request, res: Response): void => {
  res.json(denominations);
};

export const calculateChange = async (req: Request, res: Response): Promise<void> => {
  const { currency, purchaseAmount, tenderAmount } = req.body;

  if (!currency || !denominations[currency]) {
    res.status(400).json({ error: "Invalid or missing currency." });
    return;
  }

  const purchaseValue = parseFloat(purchaseAmount);
  const tenderValue = parseFloat(tenderAmount);

  if (isNaN(purchaseValue) || purchaseValue <= 0) {
    res.status(400).json({ error: "Purchase amount must be greater than 0." });
    return;
  }

  if (isNaN(tenderValue) || tenderValue <= 0) {
    res.status(400).json({ error: "Tender amount must be greater than 0." });
    return;
  }

  if (tenderValue < purchaseValue) {
    res.status(400).json({ error: "Tender amount must be greater than or equal to purchase amount." });
    return;
  }

  const coinDenominations = denominations[currency] || [];
  const vendingMachine = new VendingMachine(coinDenominations);
  const change = changeService.calculateChange(vendingMachine, purchaseValue, tenderValue);
  res.json({ change });
};

import ChangeService from '../services/changeService';
import VendingMachine from '../models/vendingMachine';

describe('ChangeService', () => {
  let changeService: ChangeService;
  let vendingMachine: VendingMachine;

  beforeEach(() => {
    changeService = new ChangeService();
    vendingMachine = new VendingMachine([25, 10, 5, 1]);
  });

  test('should return correct change for 65 cents', () => {
    const result = changeService.calculateChange(vendingMachine, 1.35, 2.00);
    expect(result).toEqual([25, 25, 10, 5]);
  });

  test('should return correct change for 99 cents', () => {
    const result = changeService.calculateChange(vendingMachine, 1.01, 2.00);
    expect(result).toEqual([25, 25, 25, 10, 10, 1, 1, 1, 1]);
  });

  test('should return no change if purchase amount is equal to tender amount', () => {
    const result = changeService.calculateChange(vendingMachine, 2.00, 2.00);
    expect(result).toEqual([]);
  });

  test('should return correct change for 40 cents with different denominations', () => {
    vendingMachine = new VendingMachine([20, 10, 5, 1]);
    const result = changeService.calculateChange(vendingMachine, 1.60, 2.00);
    expect(result).toEqual([20, 20]);
  });
});

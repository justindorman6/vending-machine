import VendingMachine from "../models/vendingMachine";

class ChangeService {
  public calculateChange(
    vendingMachine: VendingMachine,
    purchaseAmount: number,
    tenderAmount: number
  ): number[] {
    let changeAmount = Math.round((tenderAmount - purchaseAmount) * 100);
    const coinDenominations = vendingMachine.getDenominations();
    const result: number[] = [];

    for (let coin of coinDenominations) {
      if (changeAmount <= 0) break;
      const count = Math.floor(changeAmount / coin);
      if (count > 0) {
        changeAmount -= count * coin;
        result.push(...Array(count).fill(coin));
      }
    }

    return result;
  }
}

export default ChangeService;

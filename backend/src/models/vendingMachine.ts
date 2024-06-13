class VendingMachine {
    private coinDenominations: number[];
  
    constructor(coinDenominations: number[]) {
      this.coinDenominations = coinDenominations.sort((a, b) => b - a);
    }
  
    public getDenominations(): number[] {
      return this.coinDenominations;
    }
  }
  
  export default VendingMachine;
  
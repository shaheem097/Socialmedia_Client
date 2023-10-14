function uniqueRandomNumber(length) {
    const uniqueNumbers = new Set();
    let result = '';
  
    while (uniqueNumbers.size < length) {
      const randomDigit = Math.floor(Math.random() * 10);
      uniqueNumbers.add(randomDigit);
    }
  
    uniqueNumbers.forEach((digit) => {
      result += digit;
    });
  
    return result;
  }
export default uniqueRandomNumber;  
      
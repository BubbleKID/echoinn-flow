export function findQuestionUserName(userAddress: string){
  return [
    {
      "address": "0x8fe689ab77699349cda38630f1faf8f7ffbd1169",
      "name": "Charles V",
    },
    {
      "address": "0x40d55351adf4a1d5a4cfe48fe04b787b10d9b34f",
      "name": "Homelander",
    },
    {
      "address": "0x04a63903abcf0cf7ffe17ece82536f8cc8ed1ecf",
      "name": "Mark",
    }
  ].filter(user => user.address === userAddress)[0].name || 'Unknown';
}

// class Dog {
//     public name: string 
//     public age: number
//     constructor(name: string, age: number) {
//         this.name = name
//         this.age =  age
//     }
// }

class Dog {
    constructor(public readonly name: string, public readonly age: number) {}
}
const bolinha = new Dog('bolinha', 3)
// bolinha.name = 'BOLINHA'  // não deve permitir alteração de uma propriedade de nenhuma maneira, apenas leitura
console.log(bolinha.name)  



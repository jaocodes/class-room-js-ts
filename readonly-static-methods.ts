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


//doglist será um singleton
class DogList {
    private dogs: Dog[] = []

    private constructor(){} // deixar o constructor como private garante que não seja possível invocar uma nova instancia dessa classe

    static instance: DogList = new DogList() //definimos uma propriedade estática que é a pŕopria instância


    static add(dog: Dog){  //como o método é estatic não podemos usar o this, pois o this pertence a instancia
        DogList.instance.dogs.push(dog) //log aqui precisamos acessar a propriedade dogs pela instância ou seja, diretamente pela propriedade que definimos que tem o valor da instância.
    }

    getDogs(){
        return this.dogs // aqui conseguimos acessar via this pois não é um método estático
    }
}


// note que o primeiro método é static e acessível direto pela classe
DogList.add(bolinha)
// note que o segundo método é public e acessível pela instância
console.log(DogList.instance.getDogs())
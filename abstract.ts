// classes abstratas só existem no typescript
// não é permitido ser instanciada 
// são contratos que fornecem modelo de implementação para outras classes

abstract class StreetFighter {
    constructor(){}

    move(){}
    fight(){
        return `${this.name} attacks with ${this.getSpecialAttack()}`
    }

    abstract getSpecialAttack(): string

    abstract get name():string
}

// podem possuir métodos abstratos que precisam obrigatóriamente 
// ser implementados por subclasses, respeitando o contrato definido

// podem possuir métodos contretos, que tem implementação pronta
//  e são herdados por subclasses


// podem possuir propriedades abstratas
// podem possuir getters e setters abstratos

// tudo que for abstrato deve ser implementado na subclasse


class Ryu extends StreetFighter {
    get name(): string {
     return 'Ryu'
    }
    getSpecialAttack(): string {
    return "Hadouken"
  }
}

class ChunLi extends StreetFighter {
    get name(): string {
     return 'Chun-Li'
    }
    getSpecialAttack(): string {
    return "Lightning Kick"
  }
}

const ryu = new Ryu()
const chunLi =  new ChunLi()

console.log(ryu.getSpecialAttack())

console.log(ryu.fight())
console.log(chunLi.fight())

//O objetivo do abstract é compartilhar lógica e contratos
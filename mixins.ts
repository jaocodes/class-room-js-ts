
// no javascript podemos criat funções retornam classes ou 
// retornam até mesmo instancias de classes

function MyLoggerClass() {
    return new (class Logger{
        private completeLog = ''

        log(string: string){
            this.completeLog+= `${string}\n` //adiciona a string de logs com quebra de linha
        }

        dumpLog(){
            return this.completeLog //retorna toda a string que contém todos os logs
        }
    })()
}

const myLogger = MyLoggerClass() // recebo uma instância da minha classe de Logger

myLogger.log('ação 1')
myLogger.log('ação 2')

console.log(myLogger.dumpLog()) 



// aqui uma função que retorna uma classe repassando um generic 
// que define o tipo do dado que será armazenado
function SimpleMemoryDatabase<T>() {
    return class SimpleMemoryDatabase {
      private db: Record<string, T> = {};
  
      set(id: string, value: T): void {
        this.db[id] = value;
      }
  
      get(id: string): T {
        return this.db[id];
      }
  
      getObject(): Record<string, T> {
        return this.db;
      }
    };
  }

  const StringDatabase = SimpleMemoryDatabase<string>() // passando o tipo string
  const NumberDatabase = SimpleMemoryDatabase<number>() // passando o tipo number


 const strDb =  new StringDatabase()
 strDb.set('name', 'jhon')
 console.log(strDb.get('name'))


 const numberDb =  new NumberDatabase()
 numberDb.set('number', 27)
 console.log(numberDb.get('number'))

 // note que temos acesso ao método getObject que retorna todo 
 // o objeto de dentro da classe

 console.log(strDb.getObject())
 console.log(numberDb.getObject())


 //agora podemos usar o mixin do typescript para melhorar 
 // a construção de funções que retornam classes


type Contructor<T> = new (...args: any[]) => T // esse é o mixin

// desejamos uma função que retorne uma classe que extends 
// a classe SimpleMemoryDatabase, pois queremos usar o método getObject dela


// Mas não queremos fazer isso diretamente pois queremos que essa função
// seja aproveitada para extends qualquer classe que tenha o método getObject
// respeitando os argumentos e retorno do método.



function DumplableClass<B extends Contructor<{
    getObject(): object
 }>>(Base: B) {
    return class Dumplable extends Base {
        dump(){
            console.log(this.getObject())
        }
    }
 }

// A função acima recebe como argumento uma Classe
// O generic B irá definir o tipo da classe que será passada ao generic da função
// Que por sua vez deve respeitar regras de contrato
// No nosso caso a classe Base deve possuir um método getObject que retorne um object

const DumplableStringDB = DumplableClass(StringDatabase)

const strDbDumplable =  new DumplableStringDB()
strDbDumplable.set('name', 'Jhon from dumplable class')
strDbDumplable.dump()


// no exemplo acima o mixin não conhece de fato a classe
// e a construção do mixin pode fixar confusa.


// outra maneira de fazer é aceitar argumentos genéricos no contrutor
type GConstructor<T = {}> = new (...args: any[]) => T;
// e usamos esse para construir o tipo desejado
type NeedToHave = GConstructor<{getObject(): object}> 


// outra sintaxe que talvez deixe mais fácil de compreender
//  mas é preciso ajustar bem a semântica 

function Dumplable<B extends NeedToHave>(Base: B) {
    return class Dumplable extends Base {
        dump(){
            console.log(this.getObject())
        }
    }
 }

 const DumplableStringDB2 = DumplableClass(StringDatabase)

const strDbDumplable2 =  new DumplableStringDB2()
strDbDumplable2.set('name', 'Jhon from dumplable 2 class')
strDbDumplable2.dump()
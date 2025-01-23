interface Database {
  get(id: string): string;
  set(id: string, value: string): void;
}

class ImMemoryDatabase implements Database {
  db: Record<string, string> = {};

  get(id: string): string {
    return this.db[id];
  }
  set(id: string, value: string): void {
    this.db[id] = value;
  }
}

const myDb1 = new ImMemoryDatabase(); // cria a instância

myDb1.set("foo", "bar"); // aciona o método de adicionar informação ao database

console.log(myDb1.get("foo")); // aciona o método de buscar informação ao database

myDb1.db["foo"] = "zoo";
console.log(myDb1.get("foo"));

class ImMemoryDatabasePrivate implements Database {
  private db: Record<string, string> = {};

  get(id: string): string {
    return this.db[id];
  }
  set(id: string, value: string): void {
    this.db[id] = value;
  }
}

const myDb2 = new ImMemoryDatabasePrivate();

myDb2.set("foo", "barr");

console.log(myDb2.get("foo"));

interface Persistable {
  saveToString(): string;
  restoreFromString(storedState: string): void;
}

// class PersistentInMemoryDbPrivate extends ImMemoryDatabasePrivate implements Persistable{
//   saveToString(): string{
//       return JSON.stringify(this.db)  // Aqui irá disparar um erro já que essa
//                                       //classe é descendente e não terá acesso
//                                       // a propriedade db que está definida como private
//   }
//   restoreFromString(storedState: string): void {
//       this.db = JSON.parse(storedState)
//   }
// }

class ImMemoryDatabaseProtected implements Database {
  protected db: Record<string, string> = {};

  get(id: string): string {
    return this.db[id];
  }
  set(id: string, value: string): void {
    this.db[id] = value;
  }
}

class PersistentInMemoryDbProtected extends ImMemoryDatabaseProtected
  implements Persistable {
  saveToString(): string {
    return JSON.stringify(this.db);
  }
  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}

const myDb3 = new PersistentInMemoryDbProtected();

myDb3.set("foo", "bar");

console.log(
  `Informação da chave foo após a primeira adição: ${myDb3.get("foo")}`,
);

myDb3.set("foo", "eps");

console.log(
  `Informação da chave foo após a segunda adição: ${myDb3.get("foo")}`,
);

const saved = myDb3.saveToString();

myDb3.set("foo", "zeta");

myDb3.restoreFromString(saved);

console.log(
  `Informação da chave foo após a recuperar o estado: ${myDb3.get("foo")}`,
);

interface Database<T> {
  get(id: string): T;
  set(id: string, value: T): void;
}

interface Persistable {
    saveToString(): string;
    restoreFromString(storedState: string): void;
  }

class ImMemoryDatabase<T> implements Database<T> {
  protected db: Record<string, T> = {};

  get(id: string): T {
    return this.db[id];
  }
  set(id: string, value: T): void {
    this.db[id] = value;
  }
}

class PersistentMemoryDb<T> extends ImMemoryDatabase<T>
  implements Persistable {
  saveToString(): string {
    return JSON.stringify(this.db);
  }
  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}

const myDb = new PersistentMemoryDb<number>();

myDb.set('foo',22)

console.log(myDb.get('foo'))


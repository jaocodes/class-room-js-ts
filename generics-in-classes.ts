interface Database<T, K> {
  get(id: K): T;
  set(id: K, value: T): void;
}

interface Persistable {
    saveToString(): string;
    restoreFromString(storedState: string): void;
  }

type DBKeyType =  string | number | symbol

class ImMemoryDatabase<T, K extends DBKeyType> implements Database<T, K> {
  protected db: Record<K, T> = {} as Record<K, T>;

  get(id: K): T {
    return this.db[id];
  }
  set(id: K, value: T): void {
    this.db[id] = value;
  }
}

class PersistentMemoryDb<T, K extends DBKeyType> extends ImMemoryDatabase<T, K>
  implements Persistable {
  saveToString(): string {
    return JSON.stringify(this.db);
  }
  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}

const myDb = new PersistentMemoryDb<number, string>();

myDb.set('55',22)

console.log(myDb.get('55'))


interface Database {
  get(id: string): string;
  set(id: string, value: string): void;
}

interface Persistable {
    saveToString(): string;
    restoreFromString(storedState: string): void;
  }

class ImMemoryDatabase implements Database {
  protected db: Record<string, string> = {};

  get(id: string): string {
    return this.db[id];
  }
  set(id: string, value: string): void {
    this.db[id] = value;
  }
}

class PersistentMemoryDb extends ImMemoryDatabase
  implements Persistable {
  saveToString(): string {
    return JSON.stringify(this.db);
  }
  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}

const myDb = new PersistentMemoryDb();

console.log(myDb)


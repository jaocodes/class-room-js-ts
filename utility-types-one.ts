interface MyUser {
  name: string;
  id: string;
  email?: string;
  phone?: string;
}


// Partial cria um tipo a partir de outro deixando todos os campos opcionais
type MyUserOptionals = Partial<MyUser>; 


const merge = (user: MyUser, override: MyUserOptionals): MyUser => {
  return {
    ...user,
    ...override,
  };
};

console.log(merge({
  id: "1",
  name: "jhon doe",
  email: "jhon@dotemail.com",
}, { id: "2" }));


// Required cria um tipo a partir de outro deixando todos os campos obrigatórios
type RequiredMyUser =  Required<MyUser>

// Pick cria um tipo a partir de outro selecionando apenas os campos desejados
type JustEmailAndName =  Pick<MyUser, 'email'| 'name'>

// Omit cria um tipo a partir de outro excluindo apenas os campos desejados
type UserWithoutId = Omit<MyUser,'id'>


// Record é capaz de criar um tipo de objeto com tipos específicos
//  para chaves e valores
const mapById = (users: MyUser[]): Record<string, MyUser> => {
    return users.reduce((acc, user) => {
        return {
            ...acc,
            [user.id]: user
        }
    }, {})
}

// Ainda é possível extrair tipos expecíficos acessando via chave
type JustId = MyUser['id']
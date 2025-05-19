class User{
    name!: string;
    walk(){
        console.log('parent')
    }
}

const u1 = new User()
console.log(u1.name)

class Employee extends User{
    walk(){
        console.log('child');
    }
}

u1.walk()
const child:User = new Employee();
child.walk()
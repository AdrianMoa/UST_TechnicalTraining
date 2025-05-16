class Book{
    constructor(title, price){
        this.title = title;
        this.cost = price; //price is parameter, but cost is a propertie
    }

    borrow(){
        console.log(`${this.title} is borrowed`);
    }
    rent(){
        this.borrow();
    }
}

class FictionBook extends Book{
    borrow(){ //override
        console.log('override');
        super.borrow();
    }
}

const b1 = new Book("Learn HTML", 100);
console.log(b1.cost);
b1.rent();

const fb = new FictionBook('Caves of Steel', 101);
fb.borrow();
console.log(fb.title);
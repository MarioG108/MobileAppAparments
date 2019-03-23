export default class Hero {
    heroId: string;
    heroName: string;
    heroPowers: [];

    constructor(heroId: string, data: any) {
        if(!data)
             return;
        this.heroId = heroId;
        this.heroName = data.heroName;
        this.heroPowers = data.heroPowers;
    }

    clone() {
        return new Hero(this.heroId,{  heroName: this.heroName, heroPowers: this.heroPowers });
    }   
               

    getObjectInfo(){
        return{
            heroId : this.heroId,
            heroName : this.heroName,
            heroPowers : this.heroPowers  
        }
    }
}

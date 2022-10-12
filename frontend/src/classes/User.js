// Dans le tableau des présents nous souhaitons :
// Logo entreprise (avatar pour l'intant), nom, prénom, ville, commercial
class User {
    constructor(datas) {
        this.id = (datas.id) ? datas.id : undefined;
        this.firstname = (datas.firstname) ? datas.firstname : '';
        this.lastname = (datas.lastname) ? datas.lastname : '';
        this.city = (datas.city) ? datas.city : '';
        this.representative = (datas.representative) ? datas.representative : '';
        this.img = (datas.img) ? datas.img : '';
    }
}

export default User;
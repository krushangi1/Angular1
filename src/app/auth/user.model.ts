export class User{

    constructor(
        public email:string,
        public id:string,
        private _token:string,
        private _tokenExpirationDate:Date
    ){}

    //looks like func but you can use it like property
    //like user.token
    //can't overwrite it user.token=dhfh
    get token(){
        if(!this._tokenExpirationDate || new Date> this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }
}
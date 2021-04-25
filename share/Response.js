class Response {
 constructor(status, msg =  '', data = {}){
     this.status = status;
     this.message = msg;
     this.data = data;
 }
}

module.exports = Response;
const request = require('supertest');
const app = require('../app')
const posts=require('./Posts.json')
const user1={
    name:'shubham',
    email:'sh2@gmail.com',
    password:'1234'
}
describe('User', function() {
    it('should send tokens or message or status',async function(done) {
      const data=request(app)
        .post('/User/Register')
        .send(user1)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(async function(err, res) {
        const data= await  res.text
        //console.log(res.status,res.text)
        expect(res.status).toBe(200)
        setTimeout(() => {
            done()
        }, 500);
        });
    });
    it('should login in user', function(done) {
        const data=request(app)
          .post('/User/Login')
          .send({email:user1.email,password:user1.password})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .end(async function(err, res) {
            const data= await (res.text)
            const d=JSON.parse(data)
            //console.log(d,res.status)
            expect(d.data.email).toStrictEqual(user1.email)
            expect(d.data.name).toEqual(user1.name)
            expect(res.status).toBe(200)
             setTimeout(() => {
                 done()
             }, 500);
           });
      });
  });
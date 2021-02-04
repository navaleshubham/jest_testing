const request = require('supertest');
const app = require('../app')
const posts=require('./Posts.json')
describe('posts', function() {
    it('should send all posts',async function(done) {
      const data=request(app)
        .get('/Post/Posts')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(async function(err, res) {
           const data= await  res.text
           const d=JSON.parse(data)
           expect(d).toEqual(posts.data)
           //console.log(d)
            setTimeout(() => {
                done()
            }, 500);
          });
    });
    it('should send only specific posts', function(done) {
        const data=request(app)
          .get('/Post/Myposts/shubham.navale12@gmail.com')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .end(async function(err, res) {
            const data= await (res.text)
            const d=JSON.parse(data)
            //console.log(d)
            expect(d).toStrictEqual(posts.shubhamnavale12)
             setTimeout(() => {
                 done()
             }, 500);
           });
      });
      it('should delete only specific posts', function(done) {
        const data=request(app)
          .delete('/Post/Delete/5f3ee62c2513ce0017c2eb58')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .end(async function(err, res) {
            const data= await (res.text)
            console.log(data)
            expect(data).toBeTruthy()
             setTimeout(() => {
                 done()
             }, 500);
           });
      });
  });
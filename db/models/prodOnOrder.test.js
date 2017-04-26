'use strict'

const db = require('APP/db')
    , { ProdOnOrder } = db
    , {expect} = require('chai')

/* global describe it before afterEach */

describe('User', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('poO tests', () => {
    it('successfully creates product on orders row, given price qty and product_id', () =>
      ProdOnOrder.create({ price: 123, qty: 5, })// foreign key constrant issue here if you have a proudct_id... so why does it work for the rest of your code?
        .then(poO => {if(poO) return true})
        .then(result => expect(result).to.be.true))

    it("given order_id and product_id, after calling the classIncrement Class Method with those values, expect new poO to be created if no matches were found", () =>
      ProdOnOrder.classIncrement(1, 2)
        .then(newPoO => {console.log('*************',newPoO);return newPoO})// foriegn key constrant issue here too
        .then(newPoO => newPoO.authenticate('ok'))
        .then(result => expect(result).to.be.true))
  })
})

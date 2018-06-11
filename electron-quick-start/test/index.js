'use strict'

const Application = require('spectron').Application
const electron = require('electron')
const setup = require('./setup')

const pg =  require('pg')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

const path = require('path')

chai.should()
chai.use(chaiAsPromised)


console.log('Testing ...')

//const timeout = process.env.CI ? 30000 : 10000
const timeout = 30000


describe('Elmina App', function () {
    this.timeout(timeout)

    let app

    const startApp = () => {
        app = new Application({
            path: electron,
            args: [
                path.join(__dirname, '..')
            ],
            waitTimeout: timeout
        })
        
        return app.start().then((ret) => {
            setup.setupApp(ret)
        })
    }

    const restartApp = () => {
        return app.restart().then((ret) => {
          setup.setupApp(ret)
        })
      }

    before(() => {
        return startApp()
    })

    after(() => {
        if (app && app.isRunning()){
            return app.stop()
        }
    })

    it('checks hardcoded path for userData is correct', function () {
        return app.client.execute(() => {
          return require('electron').remote.app.getPath('userData')
        }).then((result) => {
            console.log(setup.getUserDataPath())
          return result.value
        }).should.eventually.equal(setup.getUserDataPath())
      }) 

      it('opens a window displaying the login page', function () {
        return app.client.getWindowCount().should.eventually.equal(1)
          .browserWindow.isMinimized().should.eventually.be.false
          .browserWindow.isDevToolsOpened().should.eventually.be.false
          .browserWindow.isVisible().should.eventually.be.true
          //.browserWindow.isFocused().should.eventually.be.true
          .browserWindow.getBounds().should.eventually.have.property('width').and.be.above(0)
          .browserWindow.getBounds().should.eventually.have.property('height').and.be.above(0)    
        
      })

    describe('Check login page', function (){
        it('it shows the login inputs and submit button', function() {
            
        })
    })

      
})
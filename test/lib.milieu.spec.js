/* globals describe it beforeEach afterEach */
/* eslint-disable no-new */

const fs = require('fs')
const path = require('path')
const assert = require('assert')
const sinon = require('sinon')
const Milieu = require('../lib/milieu')

global.__testYaml__ = require('js-yaml')
global.__testIni__ = require('ini')
global.__testPlatform__ = 'darwin'
global.__testEnv__ = {
  APPLICATION__E0: 'e0',
  APPLICATION___F0: 'F0',
  HOME: path.join('/home/user')
}
global.__testArgv__ = [
  'node',
  path.join('/path/to/script'),
  '--a0',
  'a0'
]
global.__testCwd__ = path.join('/home/user/developer/project/dist')

describe('Milieu', () => {
  beforeEach(() => {
    sinon.stub(fs, 'existsSync')

      .withArgs(path.join('/home/user/.applicationrc'))
      .returns(true)

      .withArgs(path.join('/home/user/.application/config'))
      .returns(true)

      .withArgs(path.join('/home/user/.config/application'))
      .returns(true)

      .withArgs(path.join('/home/user/.config/application/config.json'))
      .returns(true)

      .withArgs(path.join('/etc/applicationrc.yaml'))
      .returns(true)

      .withArgs(path.join('/etc/application/config.ini'))
      .returns(true)

      .withArgs(path.join('/home/user/developer/project/dist/.applicationrc'))
      .returns(true)

      .withArgs(path.join('/home/user/developer/project/.applicationrc'))
      .returns(true)

      .withArgs(path.join('/home/user/developer/.applicationrc'))
      .returns(true)

    sinon.stub(fs, 'statSync')
      .returns({ isFile () { return true } })

    sinon.stub(fs, 'readFileSync')

      .withArgs(path.join('/home/user/.applicationrc'))
      .returns('{ "c1": "c1" }')

      .withArgs(path.join('/home/user/.application/config'))
      .returns('c2: c2')

      .withArgs(path.join('/home/user/.config/application'))
      .returns('c3 = c3')

      .withArgs(path.join('/home/user/.config/application/config.json'))
      .returns('{ "c4": "c4" }')

      .withArgs(path.join('/etc/applicationrc.yaml'))
      .returns('c5: c5')

      .withArgs(path.join('/etc/application/config.ini'))
      .returns('c6 = c6')

      .withArgs(path.join('/home/user/developer/project/dist/.applicationrc'))
      .returns('{ "c7": "c7" }')

      .withArgs(path.join('/home/user/developer/project/.applicationrc'))
      .returns('{ "c8": "c8" }')

      .withArgs(path.join('/home/user/developer/.applicationrc'))
      .returns('{ "c9": "c9" }')
  })

  afterEach(() => {
    fs.existsSync.restore()
    fs.statSync.restore()
    fs.readFileSync.restore()
  })

  it('throws if you don\'t provide an application name', () => {
    assert.throws(() => {
      new Milieu()
    })
  })

  it('throws if you don\'t provide a default config object', () => {
    assert.throws(() => {
      new Milieu('testapp')
    })
  })

  it('does not throw if you omit the opts object', () => {
    new Milieu('testApp', {})
  })

  describe('#explain', () => {
    it('correctly compiles the explanation and returns it', () => {
      const explanation = (new Milieu('application', {
        c0: 'c0'
      })).explain()

      assert.deepStrictEqual(explanation, {
        e0: { val: 'e0', src: 'environment' },
        F0: { val: 'F0', src: 'environment' },
        a0: { val: 'a0', src: 'flag' },
        c0: { val: 'c0', src: 'defaults' },
        c1: { val: 'c1', src: path.join('../../../.applicationrc') },
        c2: { val: 'c2', src: path.join('../../../.application/config') },
        c3: { val: 'c3', src: path.join('../../../.config/application') },
        c4: { val: 'c4', src: path.join('../../../.config/application/config.json') },
        c5: { val: 'c5', src: path.join('/etc/applicationrc.yaml') },
        c6: { val: 'c6', src: path.join('/etc/application/config.ini') },
        c7: { val: 'c7', src: '.applicationrc' },
        c8: { val: 'c8', src: path.join('../.applicationrc') },
        c9: { val: 'c9', src: path.join('../../.applicationrc') }
      })
    })
  })

  describe('#toObject', () => {
    it('correctly compiles the config and returns it', () => {
      const config = (new Milieu(
        'application',
        { c0: 'c0' }
      )).toObject()

      assert.deepStrictEqual(config, {
        e0: 'e0',
        F0: 'F0',
        a0: 'a0',
        c0: 'c0',
        c1: 'c1',
        c2: 'c2',
        c3: 'c3',
        c4: 'c4',
        c5: 'c5',
        c6: 'c6',
        c7: 'c7',
        c8: 'c8',
        c9: 'c9'
      })
    })
  })
})

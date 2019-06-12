import milieu from './'

const config = milieu('myapp', {
  foo: 'bar'
})

console.log(config.foo)

const explaination = config.explain()

console.log(explaination.foo)

const object = config.toObject()

console.log(object.foo)

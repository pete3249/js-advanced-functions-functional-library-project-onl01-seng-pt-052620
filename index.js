const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection)

      for (let i=0; i < newCollection.length; i++) {
        callback(newCollection[i], i, newCollection)
      }
      return collection
    },

    map: function(collection, callback) {
      const newCollection = (collection instanceof Array)? collection.slice() : Object.values(collection)
      let alteredValues = []

      for (let i=0; i< newCollection.length; i++) {
        alteredValues.push(callback(newCollection[i], i, newCollection))
      }
      return alteredValues
    },

    reduce: function(c = [], callback = () => {}, acc) {
      let collection = c.slice()

      if (!acc) {
        acc = collection[0]
        collection = collection.slice(1)
      }

      for (let i=0; i<collection.length; i++) {
        acc = callback(acc, collection[i], collection)
      }
      return acc
    },

    find: function(collection, predicate) {
      if (!(collection instanceof Array)) {
        collection = Object.values(collection)
      }
      
      for (let i=0; i < collection.length; i++) {
        if (predicate(collection[i])) return collection[i]
      }  
      return undefined
    },

    filter: function(collection, predicate) {
      let newCollection = []

      if (!(collection instanceof Array)) {
        collection = Object.values(collection)
      }

      for(let i=0; i < collection.length; i++) {
        if (predicate(collection[i])) {
          newCollection.push(collection[i])
        }
      }
      return newCollection
    },

    size: function(collection) {
      if (!(collection instanceof Array)) {
        collection = Object.values(collection)
      }
      return collection.length
    },

    first: function(array, n) {
      if (!n) return array[0]

      let newArray = []
      for(let i=0; i < n; i++) {
        newArray.push(array[i])
      }
      return newArray
    },

    last: function(array, n) {
      if (!!n) {
        return array.splice(-n)
      }
      return array[(array.length - 1)]
    },

    compact: function(array) {
      let newArray = []

      for (let i=0; i < array.length; i++) {
        if(!!(array[i])) {
          newArray.push(array[i])
        }
      }
      return newArray
    },

    sortBy: function(collection, callback) {
      let newArray = [...collection]
  
      return newArray.sort(function(a,b) {
        return callback(a) - callback(b)
      })
    },

    flatten: function(collection, shallow, newArray = []) {
      if (!Array.isArray(collection)) return newArray.push(collection)

      if (shallow === true) {
        newArray = collection.flat()
      } else {
        newArray = collection.flat(Infinity)
      }
      return newArray
    },

    uniqSorted: function(collection, callback) {
      const sorted = [collection[0]]
      for (let i = 1; i < collection.length; i++) {
        if (sorted[i-1] !== collection[i])
          sorted.push(collection[i])
      }
      return sorted
    },

    uniq: function(collection, isSorted = false, callback = false) {
      if (isSorted) {
        return fi.uniqSorted(collection, callback)
      } else if (!callback) {
        return Array.from(new Set(collection))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = callback(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },

    keys: function(obj) {
      const objKeys = []
      for(let key in obj) {
        objKeys.push(key)
      }
      return objKeys
    },

    values: function(obj) {
      const objValues = []
      for(let key in obj) {
        objValues.push(obj[key])
      }
      return objValues
    },
    functions: function(obj) {
      const functionNames = []

      for (let key in obj) {
        if (typeof obj[key] === "function"){
          functionNames.push(key)
        }
      }

      return functionNames.sort()
    }
  }
})()

const isFunction = (value: unknown): value is Function => {
  return value !== null && typeof value === 'function'
}

const isObject = (value: unknown): value is object => {
  return value !== null && typeof value === 'object'
}

const valueEquals = <T extends object>(value1: T, value2: T): boolean => {
  for (const propName in value1) {
    const prop1 = value1[propName]
    const prop2 = value2[propName]

    if (isFunction(prop1)) {
      continue
    }

    if (isObject(prop1) && isObject(prop2)) {
      if (valueEquals(prop1, prop2)) {
        continue
      }
    }

    if (prop1 !== prop2) {
      return false
    }
  }
  return true
}

export default valueEquals
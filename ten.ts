/// <reference path="node_modules/@types/jquery/index.d.ts" />

interface EventTarget {
  id: string,
  value: any
}

const operations = [
  {
    string: '+',
    operation: (a: number, b: number) => a + b
  },
  {
    string: '-',
    operation: (a: number, b: number) => a - b
  },
  {
    string: '*',
    operation: (a: number, b: number) => a * b
  },
  {
    string: '/',
    operation: (a: number, b: number) => {
      if (b == 0 || a % b > 0) {
        return null
      } else {
        return a / b
      }
    }
  }
]

const unshift = (item: number, arr: Array<number>) => {
  let newArray = arr.slice()
  newArray.unshift(item)
  return newArray
}

const calculate = (values: Array<number>, equation = '') : string => {
  if (values.length === 1) {
    if (values[0] === 10) {
      return equation
    }
  } else {
    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < values.length; j++) {
        if (i === j) {
          continue
        }

        let vals = Array()
        for (let q = 0; q < values.length; q++) {
          if (q !== i && q != j) {
            vals.push(values[q])
          }
        }

        for (let q = 0; q < operations.length; q++) {
          let sum = operations[q].operation(values[i], values[j])
          let eq = values[i] + " " + operations[q].string + " " + values[j] + " = " + operations[q].operation(values[i], values[j]) + " <br />"

          if (sum != null) {
            return calculate(unshift(sum, vals), equation + eq)
          }
        }
      }
    }
  }
}

const boxIsSelected = (box: EventTarget) : boolean => box.id[0] === 'n'
const getSelectedBoxID = (box: EventTarget): number => parseInt(box.id[1])
const isDeletePressed = (event: KeyboardEvent): boolean => (
  event.key === 'Backspace' || event.key === 'Delete'
)
const setFocusedBox = (box: number) => document.getElementById('n' + box).focus()
const getElements = () => [0, 1, 2, 3].map(i => document.getElementById('n' + i))

window.onkeyup = (event: KeyboardEvent) => {
  if (boxIsSelected(event.target)) {
    let selectedBox = getSelectedBoxID(event.target)

    if (isDeletePressed(event)) {
      selectedBox = (selectedBox - 1) > 0 ? selectedBox - 1 : 0
    } else {
      selectedBox = selectedBox + 1 < 3 ? selectedBox + 1 : 3
    }
    
    setFocusedBox(selectedBox)

    if (event.target.value.length > 1) {
      event.target.value = event.target.value.slice(0, 1)
    }

    const elements = getElements()

    if (elements.filter(element => element.value).length > 0) {
      let result = calculate(Array(...elements.map(element => parseInt(element.value))))

      if (typeof result === 'undefined') {
        result = 'No combination found.'
      }
      document.getElementById('result').innerHTML = result
    }
  }
}
import {
  convertMaskToPlaceholder,
  findCharacter,
  isAcceptableCharacter,
  tokenize
} from './utilities.js'
import {placeholderCharacter} from './constants.js'

export default function insertCharactersIntoMask(characterPositions = [], mask = '') {
  let currentArea = 0
  let currentPosition = 0
  let canAdvanceToNextArea = false

  return tokenize(convertMaskToPlaceholder(mask)).map((character, index) => {
    if (character === placeholderCharacter) {
      const userInputCharacter = findCharacter(characterPositions, {
        area: currentArea,
        position: currentPosition
      })

      currentPosition++
      canAdvanceToNextArea = true

      if (isAcceptableCharacter(userInputCharacter, mask[index]) === false) {
        return character
      }

      return userInputCharacter || character
    } else if (canAdvanceToNextArea) {
      currentArea++
      currentPosition = 0
      canAdvanceToNextArea = false
    }

    return character
  }).join('')
}
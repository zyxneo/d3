// @flow

export type ArrowObjectParams = {
  context: any;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  headLength: number;
  offset: number;
}

/* eslint-disable func-names */
const drawLink = function (arrowObject: ArrowObjectParams) {
  const {
    context,
    fromX,
    fromY,
    toX,
    toY,
    headLength,
    offset,
  } = arrowObject

  const angle = Math.atan2(toY - fromY, toX - fromX)

  const offsetX = offset * Math.cos(angle - Math.PI)
  const offsetY = offset * Math.sin(angle - Math.PI)

  // starting path of the arrow from the start square to the end square and drawing the stroke
  // context.beginPath()
  context.moveTo(fromX, fromY)
  context.lineTo(toX - (offset - headLength) * Math.cos(angle - Math.PI), toY - (offset - headLength) * Math.sin(angle - Math.PI))

  // starting a new path from the head of the arrow to one of the sides of the point
  // context.beginPath()
  context.moveTo(toX - offsetX, toY - offsetY)
  context.lineTo(toX - headLength * Math.cos(angle - Math.PI / 7) - offsetX, toY - headLength * Math.sin(angle - Math.PI / 7) - offsetY)

  // path from the side point of the arrow, to the other side point
  context.lineTo(toX - headLength * Math.cos(angle + Math.PI / 7) - offsetX, toY - headLength * Math.sin(angle + Math.PI / 7) - offsetY)

  // path from the side point back to the tip of the arrow, and then again to the opposite side point
  context.lineTo(toX - offsetX, toY - offsetY)
  context.lineTo(toX - headLength * Math.cos(angle - Math.PI / 7) - offsetX, toY - headLength * Math.sin(angle - Math.PI / 7) - offsetY)
}

export default drawLink

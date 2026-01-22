function knightMoves(startCoordinate, destinationCoordinate) {
    if(!withinBounds(startCoordinate)) {
        throw new Error(`Starting [x, y] coordinates out of bounds: [${startCoordinate.x}, ${startCoordinate.y}]`)
    }
    if(!withinBounds(destinationCoordinate)) {
        throw new Error(`Destination [x, y] coordinates out of bounds: [${destinationCoordinate.x}, ${destinationCoordinate.y}]`)
    }
    
    // Dijkstra's algorithm
    const visitedCoordinates = []
    const fringe = [{coordinate: startCoordinate, prev: null, cost: 0}]
    let shortestPath = null
    while(fringe.length != 0) {
        const searchNode = pollLowestCost(fringe)
        const coordinate = searchNode.coordinate
        if(!isVisited(visitedCoordinates, coordinate)) {
            visitedCoordinates.push(coordinate)
            coordinate.prev = searchNode.prev
            if(coordinate.x === destinationCoordinate.x && coordinate.y === destinationCoordinate.y) {
                shortestPath = coordinate
                break
            }
            for(let validCoordinate of getValidMoves(coordinate)) {
                if(!isVisited(visitedCoordinates, validCoordinate)) {
                    fringe.push({coordinate: validCoordinate, prev: coordinate, cost: searchNode.cost + 1})
                }
            }
        }
    }
    return shortestPath
}

function withinBounds(coordinate) {
    // Chess board is 8x8
    return coordinate.x >= 0 && coordinate.x <= 7 && coordinate.y >= 0 && coordinate.y <= 7
}

function getValidMoves(coordinate) {
    const validMoves = []
    
    const move1 = {x: coordinate.x-1, y: coordinate.y-2}
    const move2 = {x: coordinate.x+1, y: coordinate.y-2}
    const move3 = {x: coordinate.x+2, y: coordinate.y-1}
    const move4 = {x: coordinate.x+2, y: coordinate.y+1}
    const move5 = {x: coordinate.x+1, y: coordinate.y+2}
    const move6 = {x: coordinate.x-1, y: coordinate.y+2}
    const move7 = {x: coordinate.x-2, y: coordinate.y+1}
    const move8 = {x: coordinate.x-2, y: coordinate.y-1}

    if(withinBounds(move1)) validMoves.push(move1)
    if(withinBounds(move2)) validMoves.push(move2)
    if(withinBounds(move3)) validMoves.push(move3)
    if(withinBounds(move4)) validMoves.push(move4)
    if(withinBounds(move5)) validMoves.push(move5)
    if(withinBounds(move6)) validMoves.push(move6)
    if(withinBounds(move7)) validMoves.push(move7)
    if(withinBounds(move8)) validMoves.push(move8)

    return validMoves
}

function pollLowestCost(fringe) {
    if(fringe.length === 0) {
        return null
    }
    let lowestCostNode = fringe[0]
    let lowestCostIndex = 0
    for(let i = 0; i < fringe.length; i++) {
        const currentNode = fringe[i]
        if(currentNode.cost < lowestCostNode.cost) {
            lowestCostIndex = i
            lowestCostNode = currentNode
        }
    }
    fringe.splice(lowestCostIndex, 1)
    return lowestCostNode
}

function isVisited(visitedCoordinates, coordinate) {
    if(visitedCoordinates.length === 0) {
        return false
    }
    for(let visited of visitedCoordinates) {
        if(visited.x === coordinate.x && visited.y === coordinate.y) {
            return true
        }
    }
    return false;
}

function logPath(path) {
    const movesTaken = []
    while(path != null) {
        movesTaken.unshift(`[${path.x},${path.y}]`)
        path = path.prev
    }
    console.log(`You made it in ${movesTaken.length} moves! Here's your shortest path:`)
    movesTaken.forEach(move => console.log(move))
}

const shortestPath = knightMoves({x: 3, y: 3}, {x: 4, y: 3})
logPath(shortestPath)

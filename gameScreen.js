import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native'
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const cells = [
  { id: 1, color: 'red' },
  { id: 2, color: 'black' },
  { id: 3, color: 'red' },
  { id: 4, color: 'black' },
  { id: 5, color: 'red' },
  { id: 6, color: 'black' },
  { id: 7, color: 'red' },
  { id: 8, color: 'black' },
  { id: 9, color: 'red' },
  { id: 10, color: 'black' },
  { id: 11, color: 'black' },
  { id: 12, color: 'red' },
  { id: 13, color: 'black' },
  { id: 14, color: 'red' },
  { id: 15, color: 'black' },
  { id: 16, color: 'red' },
  { id: 17, color: 'black' },
  { id: 18, color: 'red' },
  { id: 19, color: 'red' },
  { id: 20, color: 'black' },
  { id: 21, color: 'red' },
  { id: 22, color: 'black' },
  { id: 23, color: 'red' },
  { id: 24, color: 'black' },
  { id: 25, color: 'red' },
  { id: 26, color: 'black' },
  { id: 27, color: 'red' },
  { id: 28, color: 'black' },
  { id: 29, color: 'black' },
  { id: 30, color: 'red' },
  { id: 31, color: 'black' },
  { id: 32, color: 'red' },
  { id: 33, color: 'black' },
  { id: 34, color: 'red' },
  { id: 35, color: 'black' },
  { id: 36, color: 'red' },
]

const cellsThird = [{ id: '1st 12' }, { id: '2st 12' }, { id: '3st 12' }]
const cellsHalf = [
  { id: '1st 18' },
  { id: 'EVEN' },
  { id: 'RED' },
  { id: 'BLACK' },
  { id: 'ODD' },
  { id: '2st 18' },
]
export default function GameScreen() {
  const [bet, setBet] = useState('')
  const [betColor, setBetColor] = useState('')
  const [randBet, setRandBet] = useState('')
  const [randColor, setRandColor] = useState('')
  const [randRange12, setRandRange12] = useState('')
  const [randRange18, setRandRange18] = useState('')
  const [randParity, setRandParity] = useState('')
  const [win, setWin] = useState('')
  const [winX, setWinX] = useState('')

  function renderCells({ item }) {
    return (
      <TouchableOpacity
        style={{ borderWidth: 1, borderColor: '#fff', borderStyle: 'solid' }}
        onPress={() => {
          setBet(item.id)
          setBetColor(item.color)
        }}
      >
        <View
          style={[
            styles.tableCell,
            { backgroundColor: item.color, borderRadius: 100 },
          ]}
        >
          <Text
            style={[
              styles.cellText,
              { color: item.color == 'black' ? '#fff' : '#000' },
            ]}
          >
            {item.id}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  function renderCellsThird({ item }) {
    return (
      <TouchableOpacity
        onPress={() => {
          setBet(item.id)
          setBetColor('#399802')
        }}
      >
        <View style={styles.cellThird}>
          <Text style={styles.cellThirdText}>{item.id}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  function renderCellsHalf({ item }) {
    return (
      <TouchableOpacity
        onPress={() => {
          setBet(item.id)
          if (item.id == 'RED') {
            setBetColor('red')
          } else if (item.id == 'BLACK') {
            setBetColor('black')
          } else {
            setBetColor('#399802')
          }
        }}
      >
        <View style={styles.cellHalf}>
          <Text style={styles.cellHalfText}>{item.id}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  function startGame() {
    let rand
    if (bet || +bet == 0) {
      rand = Math.floor(Math.random() * (36 - 0 + 1) + 0)
      console.log(rand)
      setRandBet(rand)
      if (+rand == 0) {
        setRandColor('#399802')
      } else {
        setRandColor(cells[rand - 1].color)
      }
      if (+rand <= 18) {
        setRandRange18(1)
      } else {
        setRandRange18(2)
      }
      if (+rand >= 1 && +rand <= 12) {
        setRandRange12(1)
      } else if (+rand > 24) {
        setRandRange12(3)
      } else {
        setRandRange12(2)
      }
      if (+rand % 2 == 0) {
        setRandParity('EVEN')
      } else {
        setRandParity('ODD')
      }
    } else {
      ToastAndroid.show('Make your bet!', ToastAndroid.SHORT)
    }

    setWin('')
    setWinX('')
    if (+bet >= 0 && +bet <= 36) {
      if (+rand == +bet) {
        setWin(bet)
        setWinX(36)
      }
    }
    if (bet == '1st 12' && +rand >= 1 && +rand <= 12) {
      console.log('qwertyuiop')
      setWin('1st 12')
      setWinX(3)
    } else if (bet == '2st 12' && +rand >= 13 && +rand <= 24) {
      setWin('2st 12')
      setWinX(3)
    } else if (bet == '3st 12' && +rand >= 25 && +rand <= 36) {
      setWin('3st 12')
      setWinX(3)
    }
    if (bet == '1st 18' && +rand >= 1 && +rand <= 18) {
      setWin('1st 18')
      setWinX(2)
    } else if (bet == '2st 18' && +rand >= 19 && +rand <= 36) {
      setWin('2st 18')
      setWinX(2)
    }
    if (bet == 'EVEN' && rand % 2 == 0) {
      setWin('EVEN')
      setWinX(2)
    } else if (bet == 'ODD' && rand % 2 != 0) {
      setWin('ODD')
      setWinX(2)
    }
    if (rand > 0) {
      if (bet == 'RED' && cells[rand - 1].color == 'red') {
        setWin('RED')
        setWinX(2)
      } else if (bet == 'BLACK' && cells[rand - 1].color == 'black') {
        setWin('BLACK')
        setWinX(2)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text>{win}</Text>
      <View style={styles.header}>
        <View style={[styles.outputBet, { backgroundColor: betColor }]}>
          <Text
            style={{
              fontSize: 16,
              color: betColor == 'black' ? '#fff' : '#000',
            }}
          >
            Your bet:
          </Text>
          <Text
            style={[
              styles.outputBetText,
              { color: betColor == 'black' ? '#fff' : '#000' },
            ]}
          >
            - {bet} -
          </Text>
        </View>
        <View style={styles.random}>
          <View
            style={{
              width: '50%',
              height: '100%',
              backgroundColor: randColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: randColor == 'black' ? '#fff' : '#000',
                fontSize: 50,
              }}
            >
              {randBet}
            </Text>
          </View>
          <View style={{ width: '50%' }}>
            <View style={[styles.small, { backgroundColor: randColor }]}>
              <Text
                style={{
                  fontSize: 14,
                  color: randColor == 'black' ? '#fff' : '#000',
                }}
              >
                {randColor.toUpperCase()}
              </Text>
            </View>
            <View style={[styles.small, { backgroundColor: '#30000F' }]}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#fff',
                }}
              >
                {randParity}
              </Text>
            </View>
            <View style={[styles.small, { backgroundColor: '#9B440F' }]}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#fff',
                }}
              >
                {randRange12}st 12
              </Text>
            </View>
            <View style={[styles.small, { backgroundColor: '#0D4D87' }]}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#fff',
                }}
              >
                {randRange18}st 18
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.table}>
        <TouchableOpacity
          onPress={() => {
            setBet(0)
            setBetColor('#399802')
          }}
        >
          <View
            style={[
              styles.tableHorisont,
              { borderTopRightRadius: 100, borderTopLeftRadius: 100 },
            ]}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
              0
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <FlatList
            numColumns={3}
            data={cells}
            renderItem={renderCells}
            keyExtractor={(item) => item.id}
          />
          <FlatList
            numColumns={1}
            data={cellsThird}
            renderItem={renderCellsThird}
            keyExtractor={(item) => item.id}
          />

          <FlatList
            numColumns={1}
            data={cellsHalf}
            renderItem={renderCellsHalf}
            keyExtractor={(item) => item.id}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            startGame()
          }}
        >
          <View style={styles.game}>
            <Text style={styles.gameText}>Game</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#399802',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    width: width * 0.8,
    height: 80,
    justifyContent: 'space-between',
  },
  random: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',

    alignItems: 'center',
    borderTopEndRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  small: {
    width: '100%',
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    width: width * 0.95,
  },
  tableHorisont: {
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    flexDirection: 'row',
  },
  tableCell: {
    width: (width * 0.96) / 5,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  outputBet: {
    width: '50%',
    justifyContent: 'center',

    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  outputBetText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  cellThird: {
    width: (width * 0.9) / 5,
    height: 36 * 4,
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellThirdText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    transform: [{ rotate: '90deg' }],
  },
  cellHalf: {
    width: (width * 0.9) / 5,
    height: 18 * 4,
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellHalfText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    transform: [{ rotate: '90deg' }],
  },
  game: {
    backgroundColor: '#FDA402',
    height: 40,
    paddingHorizontal: 20,
    width: width * 0.95,
    borderBottomEndRadius: 100,
    borderBottomStartRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#fff',
    borderStyle: 'solid',
    borderTopWidth: 1,
    elevation: 5,
  },
  gameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

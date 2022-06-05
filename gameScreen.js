import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  ScrollView,
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

const cellsThird = [{ id: '1st 12' }, { id: '2nd 12' }, { id: '3rd 12' }]
const cellsHalf = [
  { id: '1st 18' },
  { id: 'EVEN' },
  { id: 'RED' },
  { id: 'BLACK' },
  { id: 'ODD' },
  { id: '2nd 18' },
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
  const [inputCoin, setInputCoin] = useState(0)
  const [outputCoin, setoutputCoin] = useState(0)
  const [wonCoin, setWonCoin] = useState(0)
  const [cash, setCash] = useState(1000)
  const [lastGames, setLastGames] = useState([])

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

  function renderLastGames({ item }) {
    return (
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: item == '0' ? '#399802' : cells[+item - 1].color,
          margin: 1,
          elevation: 3,
        }}
      >
        <Text
          style={[
            {
              color:
                item == '0'
                  ? '#000'
                  : cells[+item - 1].color == 'black'
                  ? '#fff'
                  : '#000',
            },
          ]}
        >
          {item}
        </Text>
      </View>
    )
  }

  function startGame() {
    let rand
    if (bet != '' && +inputCoin != 0) {
      let winX = 0
      let betGot = +inputCoin

      setInputCoin(0)
      setoutputCoin(betGot)
      rand = Math.floor(Math.random() * (36 - 0 + 1) + 0)
      setRandBet(rand)
      if (+rand == 0) {
        setRandColor('#399802')
      } else {
        setRandColor(cells[rand - 1].color)
      }
      if (+rand <= 18) {
        setRandRange18('1st 18')
      } else {
        setRandRange18('2nd 18')
      }
      if (+rand >= 1 && +rand <= 12) {
        setRandRange12('1st 12')
      } else if (+rand > 24) {
        setRandRange12('3rd 12')
      } else {
        setRandRange12('2nd 12')
      }
      if (+rand % 2 == 0) {
        setRandParity('EVEN')
      } else {
        setRandParity('ODD')
      }

      setLastGames((LastGames) => [...LastGames, rand])
      setWin('')
      winX = 0
      if (+bet >= 0 && +bet <= 36) {
        if (+rand == +bet) {
          setWin(bet)
          winX = 36
        }
      }
      if (bet == '1st 12' && +rand >= 1 && +rand <= 12) {
        setWin('1st 12')
        winX = 3
      } else if (bet == '2nd 12' && +rand >= 13 && +rand <= 24) {
        setWin('2nd 12')
        winX = 3
      } else if (bet == '3rd 12' && +rand >= 25 && +rand <= 36) {
        setWin('3rd 12')
        winX = 3
      }
      if (bet == '1st 18' && +rand >= 1 && +rand <= 18) {
        setWin('1st 18')
        winX = 2
      } else if (bet == '2nd 18' && +rand >= 19 && +rand <= 36) {
        setWin('2nd 18')
        winX = 2
      }
      if (bet == 'EVEN' && rand % 2 == 0) {
        setWin('EVEN')
        winX = 2
      } else if (bet == 'ODD' && rand % 2 != 0) {
        setWin('ODD')
        winX = 2
      }
      if (rand > 0) {
        if (bet == 'RED' && cells[rand - 1].color == 'red') {
          setWin('RED')
          winX = 2
        } else if (bet == 'BLACK' && cells[rand - 1].color == 'black') {
          setWin('BLACK')
          winX = 2
        }
      }
      if (+winX != 0) {
        setWonCoin(+betGot * +winX)
        setCash(cash - +betGot + +betGot * +winX)
      } else {
        setCash(cash - betGot)
      }
    } else {
      ToastAndroid.show('Make your bet!', ToastAndroid.SHORT)
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'column' }}>
          <Text
            style={{
              fontSize: 14,
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              width: width * 0.35,
            }}
          >
            Your last bet was:
          </Text>
          <Text
            style={{
              fontSize: 25,
              color: '#50000D',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {outputCoin}
          </Text>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Text
            style={{
              fontSize: 14,
              alignItems: 'center',
              justifyContent: 'center',
              width: width * 0.35,
              textAlign: 'center',
            }}
          >
            You won:
          </Text>
          <Text
            style={{
              fontSize: 25,
              color: '#D99B24',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {wonCoin}
          </Text>
        </View>
        <View style={styles.cashBlock}>
          <Text>Cash:</Text>
          <Text>{cash}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
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
                  fontSize: 40,
                }}
              >
                {randBet}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: randColor == 'black' ? '#fff' : '#000',
                }}
              >
                {randColor.toUpperCase()}
              </Text>
            </View>
            <View style={{ width: '50%' }}>
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
                  {randRange12}
                </Text>
              </View>
              <View style={[styles.small, { backgroundColor: '#0D4D87' }]}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#fff',
                  }}
                >
                  {randRange18}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bet}>
          <Text>Your bet:</Text>
          <Text style={styles.betText}>{inputCoin}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
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
        <View style={styles.coinBlock}>
          <TouchableOpacity
            onPress={() => {
              if (inputCoin + 50 <= +cash) {
                let i = inputCoin + 50
                setInputCoin(i)
              } else {
                ToastAndroid.show(
                  'You don`t have enough cash!',
                  ToastAndroid.SHORT
                )
              }
            }}
          >
            <View style={[styles.coin, { borderColor: '#703495' }]}>
              <Text style={styles.coinText}>50</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (inputCoin + 25 <= +cash) {
                let i = inputCoin + 25
                setInputCoin(i)
              } else {
                ToastAndroid.show(
                  'You don`t have enough cash!',
                  ToastAndroid.SHORT
                )
              }
            }}
          >
            <View style={[styles.coin, { borderColor: '#C6881A' }]}>
              <Text style={styles.coinText}>25</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (inputCoin + 5 <= +cash) {
                let i = inputCoin + 5
                setInputCoin(i)
              } else {
                ToastAndroid.show(
                  'You don`t have enough cash!',
                  ToastAndroid.SHORT
                )
              }
            }}
          >
            <View style={[styles.coin, { borderColor: '#770523' }]}>
              <Text style={styles.coinText}>5</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (inputCoin + 1 <= +cash) {
                let i = inputCoin + 1
                setInputCoin(i)
              } else {
                ToastAndroid.show(
                  'You don`t have enough cash!',
                  ToastAndroid.SHORT
                )
              }
            }}
          >
            <View style={[styles.coin, { borderColor: '#16608A' }]}>
              <Text style={styles.coinText}>1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              let i = 0
              setInputCoin(i)
            }}
          >
            <View style={styles.clear}>
              <Text style={styles.clearText}>Clear</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: width * 0.95,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <Text>Last games:</Text>
        <FlatList
          horizontal={true}
          numColumns={1}
          data={lastGames}
          renderItem={renderLastGames}
          keyExtractor={() => Math.random()}
        />
        {/* <ScrollView>
          {lastGames.map((item) => renderLastGames(item))}
        </ScrollView> */}
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
    width: width * 0.7,
    height: 70,
    justifyContent: 'space-between',
  },
  cashBlock: {
    width: width * 0.2,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FCE561',
    borderStyle: 'solid',
    borderRadius: 20,
  },
  random: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',

    alignItems: 'center',
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  small: {
    width: '100%',
    height: '33.33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bet: {
    borderRadius: 20,
    backgroundColor: '#FCE561',
    width: width * 0.2,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  betText: {
    fontSize: 40,
    color: '#320500',
  },
  table: {
    width: width * 0.7,
  },
  tableHorisont: {
    width: '100%',
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    flexDirection: 'row',
  },
  tableCell: {
    width: (width * 0.7) / 5 - 2,
    height: 32,
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
    borderBottomLeftRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  outputBetText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  cellThird: {
    width: (width * 0.7) / 5,
    height: 34 * 4,
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
    width: (width * 0.7) / 5,
    height: 17 * 4,
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellHalfText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    transform: [{ rotate: '90deg' }],
  },
  game: {
    backgroundColor: '#FDA402',
    height: 40,
    paddingHorizontal: 20,
    width: '100%',
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
  coinBlock: {
    width: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coin: {
    borderRadius: 100,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3.13,
    borderStyle: 'dashed',
    backgroundColor: '#fff',
    margin: 5,
  },
  coinText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  clear: {
    width: 70,
    height: 40,
    backgroundColor: '#000',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearText: {
    fontSize: 20,
    color: '#fff',
  },
})

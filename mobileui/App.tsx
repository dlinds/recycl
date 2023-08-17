import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native'

const callApi = async (item: string, state: string) => {
  const response = await fetch(
    `https://dlinds.ngrok.dev/CanIRecycle?state=${state}&item=${item}`
  )
  const json = await response
    .json()
    .then(res => {
      return res
    })
    .catch(err => {
      console.log({ err })
    })

  return json
}

function App(): JSX.Element {
  const [toDisplay, setToDisplay] = useState<any>()

  const makeCall = () => {
    console.log('calling')
    callApi(item, usState)
      .then(res => {
        console.log({ res })
        setToDisplay(res.isRecyclable)
      })
      .catch(err => {
        console.log({ err })
      })
  }

  const [usState, setUsState] = useState('')
  const [item, setItem] = useState('')

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={styles.backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.sectionTitle}>What state are you in?</Text>
        <TextInput style={styles.input} onChangeText={setUsState} />
        <Text style={styles.sectionTitle}>
          What item do yo want to recycle?
        </Text>
        <TextInput style={styles.input} onChangeText={setItem} />
        <Pressable style={styles.submitButton} onPressIn={() => makeCall()}>
          <Text style={{ color: styles.sectionTitle.color }}>Check!</Text>
        </Pressable>

        <Text>{toDisplay === true ? 'Yes!' : 'No!'}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#333',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginBottom: 32,
    marginTop: 8,
    paddingHorizontal: 24,
    backgroundColor: 'lightgrey',
    height: 48,
    width: '90%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  submitButton: {
    zIndex: 10,
    backgroundColor: '#2f5a9e',
    borderRadius: 24,
    elevation: 4,
    height: 48,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default App

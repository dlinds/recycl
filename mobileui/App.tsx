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
  ActivityIndicator,
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
  const [isRecyclable, setIsRecyclable] = useState<boolean | undefined>()
  const [alternativeUses, setAlternativeUses] = useState<string[] | undefined>()

  const [isLoading, setIsLoading] = useState(false)

  const makeCall = () => {
    console.log('calling')
    setIsLoading(true)
    callApi(item, usState)
      .then(res => {
        console.log({ res })
        setIsRecyclable(res.isRecyclable)
        setAlternativeUses(res.alternativeUses)
        setIsLoading(false)
      })
      .catch(err => {
        console.log({ err })
      })
  }

  const handleSetItem = (itemIn: string) => {
    setIsRecyclable(undefined)
    setItem(itemIn)
    if (itemIn.length && usState.length) {
      setSubmitButtonColor('#2f5a9e')
    } else {
      setSubmitButtonColor('#23457a')
    }
  }

  const handleSetUSState = (state: string) => {
    setIsRecyclable(undefined)
    setUsState(state)
    if (state.length && item.length) {
      setSubmitButtonColor('#2f5a9e')
    } else {
      setSubmitButtonColor('#23457a')
    }
  }

  const handlePressIn = () => {
    makeCall()
    setSubmitButtonColor('#23457a')
  }

  const [usState, setUsState] = useState('')
  const [item, setItem] = useState('')

  const [submitButtonColor, setSubmitButtonColor] = useState('#23457a')

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
        <TextInput style={styles.input} onChangeText={handleSetUSState} />
        <Text style={styles.sectionTitle}>
          What item do yo want to recycle?
        </Text>
        <TextInput style={styles.input} onChangeText={handleSetItem} />
        <Pressable
          style={{ ...styles.submitButton, backgroundColor: submitButtonColor }}
          onPressIn={handlePressIn}
          onPressOut={() => setSubmitButtonColor('#2f5a9e')}
          disabled={usState === '' || item === ''}
        >
          <Text style={{ color: styles.sectionTitle.color }}>Check!</Text>
        </Pressable>

        {isLoading ? (
          <ActivityIndicator style={styles.activityIndicator} />
        ) : (
          <>
            <Text style={styles.resultText}>
              {isRecyclable !== undefined
                ? isRecyclable === true
                  ? `Yes! ${item} is recyclable in the state of ${usState}`
                  : `No, ${item} is not recyclable in the state of ${usState}`
                : ''}
            </Text>
            {isRecyclable === false && (
              <>
                <Text style={styles.otherUsesHeader}>
                  Here is how you can re-purpose it instead
                </Text>
                <View style={styles.otherUsesTextContainer}>
                  {alternativeUses?.map((use, idx) => (
                    <Text key={idx} style={styles.otherUsesText}>
                      - {use}
                    </Text>
                  ))}
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 32,
  },
  otherUsesTextContainer: {
    marginTop: 8,
    paddingHorizontal: 24,
    width: '90%',
  },
  otherUsesHeader: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  otherUsesText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  resultText: {
    marginTop: 32,
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
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
    borderRadius: 24,
    elevation: 4,
    height: 48,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default App

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
  Image,
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
  const darkButtonColor = '#006f00'
  const lightButtonColor = '#009900'

  const [isRecyclable, setIsRecyclable] = useState<boolean | undefined>()
  const [alternativeUses, setAlternativeUses] = useState<string[] | undefined>()

  const [isLoading, setIsLoading] = useState(false)

  const makeCall = () => {
    console.log('calling API')
    setIsLoading(true)
    callApi(item, location)
      .then(res => {
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
    if (itemIn.length && location.length) {
      setSubmitButtonColor(lightButtonColor)
    } else {
      setSubmitButtonColor(darkButtonColor)
    }
  }

  const handleSetLocation = (state: string) => {
    setIsRecyclable(undefined)
    setLocation(state)
    if (state.length && item.length) {
      setSubmitButtonColor(lightButtonColor)
    } else {
      setSubmitButtonColor(darkButtonColor)
    }
  }

  const handlePressIn = () => {
    makeCall()
    setSubmitButtonColor(darkButtonColor)
  }

  const [location, setLocation] = useState('')
  const [item, setItem] = useState('')

  const [submitButtonColor, setSubmitButtonColor] = useState(darkButtonColor)

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
        <Image
          source={require('./assets/images/transparent-recycle-logo.png')}
          style={{ width: 120, height: 120 }}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.sectionTitle}>
            What location do you want to search?
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleSetLocation}
            textAlign="center"
          />
          <Text style={styles.sectionTitle}>
            What item do you want to recycle?
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleSetItem}
            textAlign="center"
          />
        </View>
        <Pressable
          style={{ ...styles.submitButton, backgroundColor: submitButtonColor }}
          onPressIn={handlePressIn}
          onPressOut={() => setSubmitButtonColor(lightButtonColor)}
          disabled={location === '' || item === ''}
        >
          <Text style={{ color: styles.sectionTitle.color }}>Check!</Text>
        </Pressable>

        <View style={styles.resultsContainer}>
          {isLoading ? (
            <ActivityIndicator
              style={styles.activityIndicator}
              size="large"
              color={darkButtonColor}
            />
          ) : (
            <>
              <Text style={styles.resultText}>
                {isRecyclable !== undefined
                  ? isRecyclable === true
                    ? `Yes! ${item} is recyclable in ${location}`
                    : `No, ${item} is not recyclable in ${location}`
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
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  resultsContainer: {
    height: 250,
  },
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
  inputContainer: {
    height: 200,
    marginTop: 32,
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  input: {
    marginBottom: 32,
    marginTop: 8,
    paddingHorizontal: 24,
    backgroundColor: 'lightgrey',
    height: 40,
    width: '100%',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
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

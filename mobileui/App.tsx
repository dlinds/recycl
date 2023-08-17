import React from 'react'
import { SafeAreaView, StatusBar, ScrollView, StyleSheet } from 'react-native'

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={styles.backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}
      ></ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#333',
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
})

export default App

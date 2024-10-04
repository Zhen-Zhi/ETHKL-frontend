import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Link, Redirect } from 'expo-router'

const index = () => {  
  return <Redirect href={'/home'} />
}

export default index

const styles = StyleSheet.create({})
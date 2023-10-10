import React from 'react'
import { TextInput } from 'react-native-paper'

export default function SecondRegister({ description, setDescription }) {
  return (
    <>
        <TextInput multiline={true} numberOfLines={10} style={{width: "100%", height: 200, margin: 10 }} mode="outlined" placeholder={"Description"} onChangeText={setDescription} value={description}/>
    </>
  )
}
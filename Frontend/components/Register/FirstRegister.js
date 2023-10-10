import React from 'react'
import { TextInput } from 'react-native-paper'

export default function FirstRegister({ email, setEmail, password, setPassword, name, setName }) {
  return (
    <>
        <TextInput style={{width: "100%", margin: 10 }} mode="outlined" placeholder={"Email"} onChangeText={setEmail} value={email}/>
        <TextInput secureTextEntry={true} style={{width: "100%" }} mode="outlined" placeholder={"Password"} onChangeText={setPassword} value={password}/>
        <TextInput style={{width: "100%", margin: 10 }} mode="outlined" placeholder={"Name"} onChangeText={setName} value={name}/>
    </>
  )
}
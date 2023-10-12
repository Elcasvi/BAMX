import { Input } from '@ui-kitten/components'
import React from 'react'

export default function FirstRegister({ email, setEmail, password, setPassword, name, setName }) {
  return (
    <>
      <Input size="large" status="primary" label="Name" style={{width: "100%" }} placeholder={"Name"} onChangeText={setName} value={name}/>
      <Input size="large" status="primary" label="E-Mail" style={{width: "100%", margin: 10 }} placeholder={"E-Mail"} onChangeText={setEmail} value={email}/>
      <Input size="large" status="primary" label="Password" secureTextEntry={true} style={{width: "100%"}} placeholder={"Password"} onChangeText={setPassword} value={password}/>
    </>
  )
}
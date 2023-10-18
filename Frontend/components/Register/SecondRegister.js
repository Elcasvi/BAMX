import { Input } from '@ui-kitten/components'
import React from 'react'

export default function SecondRegister({ description, setDescription }) {
  return (
    <>
        <Input size="large" status="primary" label="Personal descripción" textStyle={{minHeight: 175}} multiline={true} style={{width: "100%"}} placeholder={"Personal descripción"} onChangeText={setDescription} value={description}/>
    </>
  )
}
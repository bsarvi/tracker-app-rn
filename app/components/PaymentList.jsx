import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HistoryItem from './HistoryItem'
import { COLORS, FONT } from '../constants'

const PaymentList = ({payments,handleDeletePayment}) => {
  return (<>
    {payments.length == 0 ? (
        <Text
          style={{
            color: COLORS.white,
            ...FONT.regular,
            fontSize: 19,
            textAlign: "center",
          }}
        >
          No payments recorded yet
        </Text>
      ) : (
        payments.map((payment) => (
          <HistoryItem
            key={payment.id}
            item={payment}
            onDelete={handleDeletePayment}
          />
        ))
      )}</>
  )
}

export default PaymentList

const styles = StyleSheet.create({})
import React from 'react'
import { useParams } from 'react-router-dom'

export default function PartnerLogin() {
  const { provider } = useParams();
  return (
    <div>
      <h3>PartnerLogin</h3>
      <div>{provider}</div>
    </div>
  )
}

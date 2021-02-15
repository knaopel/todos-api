import React from 'react'
import { useParams } from 'react-router-dom'

function MsLogin() {
  const { provider } = useParams();
  return (
    <div>
      <h3>MSLogin</h3>
      <div>{provider}</div>
    </div>
  )
}

export default MsLogin

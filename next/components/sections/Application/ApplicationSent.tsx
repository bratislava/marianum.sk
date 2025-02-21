import React from 'react'

import { CheckIcon } from '@/assets/icons'
import Button from '@/components/atoms/Button'

const ApplicationSent = () => {
  return (
    <div className="grid grow place-content-center p-4">
      <div className="flex max-w-2xl flex-col items-center">
        <div className="mb-8 grid h-24 w-24 place-content-center rounded-full bg-primary-dark text-white">
          <CheckIcon className="scale-150" />
        </div>
        <h1 className="mb-4 text-h3">Vaša žiadosť bola úspešne odoslaná</h1>
        <span className="mb-8 block">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris.
        </span>
        <Button href="/">Späť na domovskú stránku</Button>
      </div>
    </div>
  )
}

export default ApplicationSent

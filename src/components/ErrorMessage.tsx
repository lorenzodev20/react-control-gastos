import { type PropsWithChildren } from 'react'

export default function ErrorMessage({ children }: Readonly<PropsWithChildren>) {
  return (
    <p className='bg-red-600 p-2 text-white font-bold text-sm text-center'>{children}</p>
  )
}

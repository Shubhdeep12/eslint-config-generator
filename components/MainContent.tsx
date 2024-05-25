import { ReactNode } from "react"

export default function MainContent({children}: {children: ReactNode}) {
  return (
    <main className="min-h-screen">{children}</main>
  )
}

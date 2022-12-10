import HeaderNav from '../Navbar/HeaderNav'

export default function MainLayout({ children }) {
  return (
    <>
      <HeaderNav />

      <div className="container">
        {children}
      </div>
    </>
  )
}

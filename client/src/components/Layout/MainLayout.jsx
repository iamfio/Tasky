import HeaderNav from '../Navbar/HeaderNav'

export default function MainLayout({ children }) {
  return (
    <>
      <HeaderNav />

      <section className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">{children}</div>
      </section>
    </>
  )
}

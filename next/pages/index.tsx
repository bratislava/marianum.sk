import Navigation from '../components/molecules/Navigation/Navigation'
import SectionExample from '../components/sections/SectionExample'

const Home = () => {
  return (
    <>
      <Navigation phoneNumber="+421 987 654 321" faqLink="/faq" />
      <div>Hello from new Marianum website!</div>
      <SectionExample />
    </>
  )
}

export default Home

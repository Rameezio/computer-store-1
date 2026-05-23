import React from 'react'
import Hero from '../components/Hero'
import ShopByCategory from '../components/ShopByCategory'
import FeaturedProducts from '../components/FeaturedProducts'
import BuildYourSetup from '../components/BuildYourSetup'
import WhyChooseUs from '../components/WhyChooseUs'
import ConsoleGames from '../components/ConsoleGames'
import FinalCTA from '../components/FinalCTA'

const Home = () => {
  return (
    <main className="bg-white">
      <Hero />
      <ShopByCategory />
      <FeaturedProducts />
      <BuildYourSetup />
      <WhyChooseUs />
      <ConsoleGames />
      <FinalCTA />
    </main>
  )
}

export default Home

import Hero from '@/components/home/Hero'
import WebHostingPlan from '@/components/home/WebHostingPlan'
import React from 'react'

const HomePage = () => {

  // To Train on Midddelware : 1
  console.log("Home Page is called");

  return (
    <section className='home-page'>
      <Hero />
      <h2 className="title"> Choose Your Web Hosting Plan</h2>
      <div className='container content-webPlan'>
        <WebHostingPlan />
        <WebHostingPlan />
        <WebHostingPlan />
      </div>
    </section>
  )
}

export default HomePage
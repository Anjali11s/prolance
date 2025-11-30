import { useState } from 'react'
import Particles from '../components/ui/background'
import { LayoutTextFlip } from '../components/ui/layout-text-flip'
import { TimelineDemo } from '../components/ui/timelineProps'
import FeaturesSection from '../components/ui/features-section'
import PopularCategories from '../components/ui/categories-section'
import CTASection from '../components/ui/cta-section'
import Footer from '../components/ui/footer'
import '../App.css'

function Home() {
    return (
        <>
            {/* Hero Section with Particles Background */}
            <div style={{ width: '100%', height: '600px', position: 'absolute' }}>
                <Particles
                    particleColors={['#b2ffc8', '#b2ffc8']}
                    particleCount={1000}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>

            {/* Hero - Text Flip Animation */}
            <div>
                <LayoutTextFlip />
            </div>

            {/* How It Works Timeline */}
            <div className="mt-20">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        How It Works
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Three simple steps to get your project done
                    </p>
                </div>
                <TimelineDemo />
            </div>

            {/* Features Section */}
            <FeaturesSection />

            {/* Popular Categories */}
            <PopularCategories />

            {/* CTA Section */}
            <CTASection />

            {/* Footer */}
            <Footer />
        </>
    )
}

export default Home

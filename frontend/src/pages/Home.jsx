import { useState } from 'react'
import Particles from '../components/ui/background'
import { LayoutTextFlip } from '../components/ui/layout-text-flip'
import { TimelineDemo } from '../components/ui/timelineProps'
import DualSection from '../components/ui/dual-section'
import Footer from '../components/ui/footer'
import ClickSpark from '../components/ClickSpark'

import '../App.css'

function Home() {
    return (
        <>

            {/* Hero Section with Particles Background */}
            <div style={{ width: '100%', height: '600px', position: 'absolute' }}>
                <Particles
                    particleColors={['#b2ffc8', '#b2ffc8']}
                    particleCount={100}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>
            <ClickSpark sparkColor="#000000ff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400} easing="ease-out" extraScale={1.0}>
                {/* Hero - Text Flip Animation */}
                <div>
                    <LayoutTextFlip />
                </div>

                {/* How It Works Timeline */}
                <div className="mt-20">
                    <TimelineDemo />
                </div>

                {/* Dual Section - For Freelancers & Clients */}
                <DualSection />

            </ClickSpark>
            {/* Footer */}
            <Footer />
        </>
    )
}

export default Home

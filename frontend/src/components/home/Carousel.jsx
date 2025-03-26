import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const carouselItems = [
  {
    id: 1,
    title: 'Summer Collection 2024',
    description: 'Discover the latest trends in summer fashion',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    link: '/shop'
  },
  {
    id: 2,
    title: 'New Arrivals',
    description: 'Check out our latest collection of premium clothing',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    link: '/shop'
  },
  {
    id: 3,
    title: 'Exclusive Deals',
    description: 'Up to 50% off on selected items',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    link: '/shop'
  }
]

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(timer)
  }, [currentSlide])

  const handlePrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <div className="relative h-[600px] overflow-hidden">
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {carouselItems.map((item) => (
          <div
            key={item.id}
            className="relative w-full h-full flex-shrink-0"
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                    {item.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-8 animate-fade-in-delay">
                    {item.description}
                  </p>
                  <Link
                    to={item.link}
                    className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300 animate-fade-in-delay-2"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white w-4' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel 
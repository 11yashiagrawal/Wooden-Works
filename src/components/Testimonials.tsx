import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'Portland, OR',
    rating: 5,
    text: 'The craftsmanship of these wooden items is exceptional. The attention to detail and quality of the wood makes each piece a true work of art. I\'ve purchased multiple items and they\'ve all exceeded my expectations.',
    imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Austin, TX',
    rating: 5,
    text: 'I received the custom wooden dining table last week and it\'s absolutely stunning. The natural grain of the wood is showcased beautifully, and the table is both functional and a piece of art. Worth every penny!',
    imageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    location: 'Chicago, IL',
    rating: 4,
    text: 'The wooden kitchen utensils I purchased have been a joy to use. They\'re beautifully crafted, comfortable to hold, and have held up well to daily use. The only reason for 4 stars instead of 5 is that one spoon had a small imperfection.',
    imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 4,
    name: 'David Thompson',
    location: 'Seattle, WA',
    rating: 5,
    text: 'The decorative wooden wall pieces I ordered are absolutely magnificent. The intricate carving work and the natural wood finish have made them the centerpiece of my living room. Everyone who visits asks about them!',
    imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 5,
    name: 'Amanda Foster',
    location: 'Denver, CO',
    rating: 5,
    text: 'I ordered a custom wooden jewelry box and it\'s beyond perfect. The attention to detail in the design, the smooth finish, and the beautiful wood grain pattern make it a true heirloom piece. Their customer service was exceptional too!',
    imageUrl: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };
  
  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="py-12 sm:py-16 bg-amber-800 text-amber-50 relative overflow-hidden">
      {/* Wood grain background */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="font-cursive text-2xl sm:text-3xl md:text-4xl text-center mb-2 font-bold">
          What Our Customers Say
        </h2>
        <p className="text-amber-200 text-center max-w-2xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base px-4">
          Hear from people who have experienced the quality and beauty of our wooden products
        </p>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-2 sm:px-4">
                  <div className="bg-amber-900/50 rounded-lg p-4 sm:p-6 md:p-8 border border-amber-700/50">
                    <div className="flex items-center mb-4">
                      <img 
                        src={testimonial.imageUrl} 
                        alt={testimonial.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover mr-3 sm:mr-4 border-2 border-amber-600 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-base sm:text-lg">{testimonial.name}</h4>
                        <p className="text-amber-300 text-xs sm:text-sm">{testimonial.location}</p>
                      </div>
                      <div className="flex flex-shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            size={14}
                            className={`sm:w-4 sm:h-4 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-amber-600"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-amber-100 italic text-sm sm:text-base">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 sm:-ml-4 md:ml-0 bg-amber-700 hover:bg-amber-600 rounded-full p-2 text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 sm:-mr-4 md:mr-0 bg-amber-700 hover:bg-amber-600 rounded-full p-2 text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                  i === activeIndex ? 'bg-amber-400' : 'bg-amber-700 hover:bg-amber-600'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
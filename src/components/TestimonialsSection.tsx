import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

const testimonials = [
  {
    name: 'James Mubanga',
    role: 'Property Owner',
    location: 'Lusaka',
    content: 'Found a tenant within 3 days of listing! No commission fees and direct communication made the process incredibly smooth. I saved over K3,000 compared to using an agent.',
    rating: 5,
    savings: 'K3,200',
  },
  {
    name: 'Grace Chanda',
    role: 'Tenant',
    location: 'Ndola',
    content: 'Finally found my dream apartment without dealing with brokers who wanted 2 months rent as commission. The verification system gave me confidence that the listing was genuine.',
    rating: 5,
    savings: 'K5,600',
  },
  {
    name: 'Peter Kasongo',
    role: 'Investor',
    location: 'Kitwe',
    content: 'The market insights helped me make informed investment decisions. I bought two properties through PropertyZM and the process was transparent from start to finish.',
    rating: 5,
    savings: 'K15,000',
  },
  {
    name: 'Mutinta Sililo',
    role: 'Student',
    location: 'Lusaka',
    content: 'As a UNZA student, finding affordable boarding was always stressful. PropertyZM helped me find a verified boarding house 5 minutes from campus at a great price.',
    rating: 5,
    savings: 'K800',
  },
  {
    name: 'Robert Phiri',
    role: 'Business Owner',
    location: 'Lusaka',
    content: 'We found our perfect office space in the CBD within a week. The commercial listings are detailed and the direct contact with landlords saved us time and money.',
    rating: 5,
    savings: 'K8,500',
  },
  {
    name: 'Esther Banda',
    role: 'Property Owner',
    location: 'Livingstone',
    content: 'Listed my guesthouse near Victoria Falls and started getting inquiries the same day. The platform reaches buyers I never could have found on my own.',
    rating: 5,
    savings: 'K12,000',
  },
];

export function TestimonialsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const currentTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
          <div>
            <span className="text-sm font-semibold text-[#007786] uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              Trusted by Thousands Across Zambia
            </h2>
            <p className="text-gray-600 mt-2 max-w-lg">
              Real stories from real users who found their perfect property
            </p>
          </div>

          {/* Rating summary */}
          <div className="mt-6 lg:mt-0 bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">4.9</div>
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            <div className="border-l border-gray-200 pl-4">
              <div className="text-sm text-gray-900 font-semibold">2,400+ Reviews</div>
              <div className="text-xs text-gray-500">Average savings of K5,200</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {currentTestimonials.map((testimonial, index) => (
                <Card key={testimonial.name} className="border border-gray-100 hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Quote className="w-8 h-8 text-[#52a447]/20 mb-3" />
                    <div className="flex items-center mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 flex-1 leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Savings badge */}
                    <div className="mt-4 bg-[#52a447]/5 rounded-lg px-3 py-2 inline-flex items-center">
                      <span className="text-xs text-[#52a447] font-semibold">
                        Saved {testimonial.savings} in broker fees
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-100">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                        style={{ backgroundColor: index % 2 === 0 ? '#52a447' : '#007786' }}
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.role} &bull; {testimonial.location}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-8 space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full w-10 h-10 p-0"
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentPage === i ? 'bg-[#52a447] w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentPage(i)}
                />
              ))}
              <Button
                variant="outline"
                size="sm"
                className="rounded-full w-10 h-10 p-0"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage === totalPages - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

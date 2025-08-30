import { Card, CardContent } from './ui/card';
import { featuresData } from '../constants/data';

export function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose PropertyZM?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience a transparent, commission-free way to find your perfect property in Zambia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow border border-gray-200">
              <CardContent className="p-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
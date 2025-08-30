import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CheckCircle, DollarSign, Users, TrendingUp, ArrowRight, Calculator, FileText, Camera } from 'lucide-react';
import { PageType } from '../App';

interface SellPageProps {
  onNavigate: (page: PageType) => void;
}

export function SellPage({ onNavigate }: SellPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Sell Your Property in Zambia
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            Get the best value for your property with our verified buyer network. 
            No hidden fees, maximum exposure, guaranteed results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 px-8"
              onClick={() => onNavigate('post-property')}
            >
              List Your Property
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-primary px-8"
            >
              Get Free Valuation
            </Button>
          </div>
        </div>
      </section>

      {/* Why Sell With Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Sell With PropertyZM?
            </h2>
            <p className="text-xl text-gray-600">
              Maximum exposure, verified buyers, and transparent process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: 'Verified Buyers',
                description: 'Access to our network of 10,000+ verified buyers actively looking for properties',
                color: '#52a447'
              },
              {
                icon: DollarSign,
                title: 'Best Price',
                description: 'Get market-leading prices with our competitive bidding system',
                color: '#007786'
              },
              {
                icon: TrendingUp,
                title: 'Fast Sales',
                description: 'Average sale completion in 45 days with our proven marketing system',
                color: '#52a447'
              },
              {
                icon: CheckCircle,
                title: 'Secure Process',
                description: 'End-to-end secure transaction with legal support and escrow service',
                color: '#007786'
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Sell Your Property
            </h2>
            <p className="text-xl text-gray-600">
              Simple 4-step process to sell your property quickly and securely
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                icon: FileText,
                title: 'List Property',
                description: 'Create detailed listing with photos and accurate information',
                action: 'Start listing'
              },
              {
                step: 2,
                icon: Calculator,
                title: 'Get Valuation',
                description: 'Receive professional property valuation and pricing recommendations',
                action: 'Free valuation'
              },
              {
                step: 3,
                icon: Users,
                title: 'Buyer Matching',
                description: 'We connect you with verified, pre-qualified buyers in your area',
                action: 'View buyers'
              },
              {
                step: 4,
                icon: CheckCircle,
                title: 'Close Deal',
                description: 'Secure transaction with legal support and payment protection',
                action: 'Close safely'
              }
            ].map((step, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-primary text-white">Step {step.step}</Badge>
                    <step.icon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0">
                    {step.action} <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              No hidden fees, pay only when you sell successfully
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Basic Listing',
                price: 'K50',
                period: '30 days',
                features: [
                  'Property listing for 30 days',
                  'Up to 10 photos',
                  'Basic property details',
                  'Contact form inquiries',
                  'Mobile app visibility'
                ],
                popular: false
              },
              {
                name: 'Featured Listing',
                price: 'K150',
                period: '30 days',
                features: [
                  'Everything in Basic',
                  'Featured placement',
                  'Up to 20 photos',
                  'Virtual tour capability',
                  'Priority customer support',
                  'Social media promotion'
                ],
                popular: true
              },
              {
                name: 'Premium Listing',
                price: 'K300',
                period: '30 days',
                features: [
                  'Everything in Featured',
                  'Professional photography',
                  'Property video',
                  'Dedicated sales agent',
                  'Market analysis report',
                  'Buyer pre-qualification'
                ],
                popular: false
              }
            ].map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-primary">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/ {plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-6 ${plan.popular ? 'bg-primary' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => onNavigate('post-property')}
                  >
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Transaction Fee */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Success Fee</h3>
              <div className="text-3xl font-bold text-blue-700 mb-2">2.5%</div>
              <p className="text-blue-800">
                Only charged on successful property sales. No sale, no fee!
              </p>
              <p className="text-sm text-blue-600 mt-2">
                Includes legal support, payment protection, and transaction facilitation
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Sell Your Property?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of sellers who have successfully sold their properties on PropertyZM
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100 px-8"
            onClick={() => onNavigate('post-property')}
          >
            Start Selling Today
          </Button>
        </div>
      </section>
    </div>
  );
}
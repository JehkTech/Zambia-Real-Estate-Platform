import { Card, CardContent } from './ui/card';
import { Shield, Users, CheckCircle, TrendingUp, Zap, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: Shield,
    title: 'KYC Verified Properties',
    description: 'Every property and owner goes through strict KYC verification. Your safety is our priority.',
    stat: '100%',
    statLabel: 'Properties Verified',
    color: '#52a447',
  },
  {
    icon: Users,
    title: 'Direct Owner Contact',
    description: 'Connect directly with property owners via call, WhatsApp, or in-app messaging. No middlemen.',
    stat: 'K0',
    statLabel: 'Broker Fees',
    color: '#007786',
  },
  {
    icon: Zap,
    title: 'Instant Matching',
    description: 'Our smart algorithm matches you with perfect properties based on your preferences and budget.',
    stat: '3 Days',
    statLabel: 'Avg. Match Time',
    color: '#52a447',
  },
  {
    icon: TrendingUp,
    title: 'Market Intelligence',
    description: 'Access real-time pricing data, neighborhood insights, and property value trends across Zambia.',
    stat: '15+',
    statLabel: 'Cities Covered',
    color: '#007786',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-[#52a447] uppercase tracking-wider">Why PropertyZM</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            The Smarter Way to Find Property
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Join 12,000+ Zambians who save money and time by connecting directly with property owners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="text-center hover:shadow-xl transition-all duration-300 border border-gray-100 group h-full hover:-translate-y-1">
                <CardContent className="p-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{feature.description}</p>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="text-2xl font-bold" style={{ color: feature.color }}>
                      {feature.stat}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{feature.statLabel}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useTranslation } from 'react-i18next';
import { Target, Compass } from 'lucide-react';
import './AboutUs.css';

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-emerald-900 py-24 border-b border-emerald-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-md">
            {t('about.title')}
          </h1>
        </div>
      </div>

      {/* History */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">{t('about.history_title')}</h2>
              <div className="w-16 h-1 bg-emerald-300 rounded-full"></div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('about.history_desc')}
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop" 
                alt="Our History" 
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Image Carousel (Simplified for now with a grid) */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=800&auto=format&fit=crop" alt="Farm" className="rounded-xl h-48 w-full object-cover shadow-sm hover-grow" referrerPolicy="no-referrer" />
            <img src="https://images.unsplash.com/photo-1573246123716-6b1782bfc499?q=80&w=800&auto=format&fit=crop" alt="Trucking" className="rounded-xl h-48 w-full object-cover shadow-sm hover-grow" referrerPolicy="no-referrer" />
            <img src="https://images.unsplash.com/photo-1557844352-761f2565b576?q=80&w=800&auto=format&fit=crop" alt="Vegetables" className="rounded-xl h-48 w-full object-cover shadow-sm hover-grow" referrerPolicy="no-referrer" />
            <img src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=800&auto=format&fit=crop" alt="Fruits" className="rounded-xl h-48 w-full object-cover shadow-sm hover-grow" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* Mission & Vision (Minimalist) */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Mission */}
            <div className="text-center space-y-6 p-10 rounded-3xl bg-emerald-50/50 border border-emerald-100 shadow-xl shadow-emerald-900/5 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t('about.mission_title')}</h2>
              <p className="text-gray-600 leading-relaxed">
                {t('about.mission_desc')}
              </p>
            </div>

            {/* Vision */}
            <div className="text-center space-y-6 p-10 rounded-3xl bg-teal-50/50 border border-teal-100 shadow-xl shadow-teal-900/5 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <Compass className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t('about.vision_title')}</h2>
              <p className="text-gray-600 leading-relaxed">
                {t('about.vision_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

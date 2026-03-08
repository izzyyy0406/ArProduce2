import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit
    alert('Message sent successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-600 font-light">
            {t('contact.subtitle')}
          </p>
          <div className="w-24 h-1 bg-emerald-300 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form_name')}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-gray-50"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form_email')}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-gray-50"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form_subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-gray-50"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form_message')}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-gray-50 resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center py-4 px-8 border border-transparent rounded-full shadow-[0_0_20px_rgba(52,211,153,0.5)] text-lg font-bold text-white bg-emerald-400 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Send className="w-5 h-5 mr-2" />
                {t('contact.form_submit')}
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-10">
            <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('contact.info_title')}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">{t('contact.address')}</p>
                    <p className="text-gray-500">Los Angeles, CA</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">{t('contact.phone')}</p>
                    <p className="text-gray-500">Mon-Fri 8am-5pm PST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">{t('contact.email')}</p>
                    <p className="text-gray-500">Online support 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-3xl overflow-hidden h-80 shadow-inner relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gray-300 flex items-center justify-center opacity-50">
                <MapPin className="w-16 h-16 text-gray-500" />
              </div>
              <p className="relative z-10 text-gray-600 font-semibold text-lg bg-white px-6 py-2 rounded-full shadow-md">
                Google Maps Integration
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client'
import React from 'react';
import { Sparkles, TrendingUp, Shield, Zap, Camera, Brain, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">     
     {/* Main Content */}
      <main className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Nutrition Analysis</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Know What You Eat,
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Live Healthier
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Transform your nutrition journey with our advanced AI technology. Simply upload a photo of your meal and get instant insights about calories, nutrients, and personalized health recommendations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/classifier" className="group px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center space-x-2">
                <span>Start Analyzing</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/how-it-works" className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl hover:shadow-lg transition-all border-2 border-gray-200">
                Learn More
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                86.96%
              </div>
              <p className="text-gray-600 font-medium">Accuracy Rate</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                34+
              </div>
              <p className="text-gray-600 font-medium">Food Items Recognized</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                &lt;2s
              </div>
              <p className="text-gray-600 font-medium">Analysis Time</p>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How Smart Dietitian Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Three simple steps to understand your food better
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Upload Photo</h3>
                  <p className="text-gray-600">
                    Take or upload a clear photo of your meal. Our AI works with any food image.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">2. AI Analysis</h3>
                  <p className="text-gray-600">
                    Our trained model identifies the food and calculates precise nutritional values.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">3. Get Insights</h3>
                  <p className="text-gray-600">
                    Receive detailed nutrition facts and personalized health recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Smart Dietitian?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Powerful features designed to help you make better food choices
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Results</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get comprehensive nutrition analysis in under 2 seconds with our advanced AI model trained on thousands of food images.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Recommendations</h3>
                <p className="text-gray-600 leading-relaxed">
                  Receive personalized advice powered by AI that considers your health goals and dietary preferences.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy First</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your food photos are analyzed securely and never stored. We prioritize your privacy and data security.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Nutrition?
            </h2>
            <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are making smarter food choices with Smart Dietitian AI
            </p>
            <Link href="/classifier" className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all">
              <span>Try Smart Dietitian Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

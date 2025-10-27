'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Upload, Loader2, AlertCircle, ChefHat, Sparkles, Flame } from 'lucide-react';

interface PredictionResult {
  label: string;
  confidence: number;
}

export default function FoodClassifier() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [calories, setCalories] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [topK, setTopK] = useState(5);

  // Session checking
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-emerald-700 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!session) {
    return null;
  }

  const handleImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      setPredictions([]);
      setCalories(null);
      setError(null);
    }
  }, []);

  const classifyImage = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setPredictions([]);
    setCalories(null);

    try {
      const { Client } = await import('@gradio/client');
      
      const client = await Client.connect('jahanmeem0/food-nsu-calories');
      const result = await client.predict('/predict_image', {
        image: selectedFile,
        top_k: topK,
      });

      console.log('Raw result:', result);

      const data = result.data;
      
      if (data && Array.isArray(data) && data.length > 0) {
        const responseObj = data[0];
        
        if (responseObj.confidences && Array.isArray(responseObj.confidences)) {
          let parsedPredictions: PredictionResult[] = responseObj.confidences.map((item: any) => ({
            label: item.label,
            confidence: item.confidence
          }));

          parsedPredictions = parsedPredictions.slice(0, topK);
          setPredictions(parsedPredictions);
        } else {
          setError('Unexpected response format from model.');
          console.error('Response object:', responseObj);
        }

        // Extract calories from data[1]
        if (data.length > 1 && typeof data[1] === 'string') {
          const caloriesText = data[1];
          // Remove emoji and extract just the number
          const caloriesMatch = caloriesText.match(/(\d+\.?\d*)\s*kcal/i);
          if (caloriesMatch) {
            setCalories(caloriesMatch[1]);
          } else {
            setCalories(caloriesText.replace(/[^0-9.]/g, ''));
          }
        }
      } else {
        setError('No predictions returned from model.');
        console.error('Data:', data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to classify image');
      console.error('Classification error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      setPredictions([]);
      setCalories(null);
      setError(null);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">  
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 mt-12 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Upload className="w-6 h-6" />
                  Upload Food Image
                </h2>
                <p className="text-emerald-50 mt-1">Drop your image or click to browse</p>
              </div>

              <div className="p-6">
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="relative border-3 border-dashed border-emerald-300 rounded-2xl p-8 hover:border-emerald-500 transition-all"
                >
                  {selectedImage ? (
                    <div className="relative group">
                      <img
                        src={selectedImage}
                        alt="Selected food"
                        className="w-full h-80 object-cover rounded-xl shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                        <label className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold cursor-pointer hover:bg-gray-100 transition-colors">
                          Change Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-gradient-to-br from-emerald-100 to-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-12 h-12 text-emerald-600" />
                      </div>
                      <p className="text-gray-700 font-semibold mb-2">
                        Drop your image here
                      </p>
                      <p className="text-gray-500 text-sm mb-4">
                        or
                      </p>
                      <label className="inline-block bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold cursor-pointer hover:shadow-lg hover:scale-105 active:scale-95 transition-all">
                        Browse Files
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="hidden"
                        />
                      </label>
                      <p className="text-gray-400 text-xs mt-3">
                        Supports: JPG, PNG, WEBP
                      </p>
                    </div>
                  )}
                </div>

                {/* Top K Slider */}
                <div className="mt-6 bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Number of Predictions: <span className="text-emerald-600">{topK}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={topK}
                    onChange={(e) => setTopK(Number(e.target.value))}
                    className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>

                {/* Classify Button */}
                <button
                  onClick={classifyImage}
                  disabled={!selectedFile || loading}
                  className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6" />
                      Classify Food
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            
            {/* Predictions Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden min-h-[500px]">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  Predictions
                </h2>
                <p className="text-emerald-50 mt-1">AI-powered food recognition results</p>
              </div>

              <div className="p-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-900">Error</p>
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {loading && (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-emerald-200 rounded-full"></div>
                      <div className="w-20 h-20 border-4 border-emerald-600 rounded-full border-t-transparent animate-spin absolute top-0"></div>
                    </div>
                    <p className="mt-4 text-gray-600 font-medium">Analyzing your food...</p>
                  </div>
                )}

                {!loading && !error && predictions.length === 0 && (
                  <div className="text-center py-16">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ChefHat className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">
                      Upload an image to see predictions
                    </p>
                  </div>
                )}

                {predictions.length > 0 && (
                  <div className="space-y-3">
                    {predictions.map((pred, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
                              {index + 1}
                            </div>
                            <span className="font-bold text-gray-900 text-lg">
                              {pred.label}
                            </span>
                          </div>
                          <span className="text-emerald-600 font-bold text-lg">
                            {(pred.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-green-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${pred.confidence * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Calories Card */}
            {calories && (
              <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Flame className="w-6 h-6" />
                    Estimated Calories
                  </h2>
                </div>
                <div className="p-6">
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border-2 border-emerald-200">
                    <div className="flex items-center justify-center gap-3">
                      <Flame className="w-10 h-10 text-emerald-500" />
                      <div className="text-center">
                        <p className="text-5xl font-bold text-gray-900">{calories}</p>
                        <p className="text-xl text-gray-600 font-semibold mt-1">kcal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
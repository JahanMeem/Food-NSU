import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import LogoutButton from "@/components/LogoutButton";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  // Fetch user data
  const userData = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user?.email!))
    .limit(1);

  const user = userData[0];

  // Calculate BMI
  const heightInMeters = user.height / 100;
  const bmi = (user.weight / (heightInMeters * heightInMeters)).toFixed(1);

  let bmiCategory = "";
  let bmiColor = "";

  if (parseFloat(bmi) < 18.5) {
    bmiCategory = "Underweight";
    bmiColor = "text-blue-600";
  } else if (parseFloat(bmi) < 25) {
    bmiCategory = "Normal weight";
    bmiColor = "text-green-600";
  } else if (parseFloat(bmi) < 30) {
    bmiCategory = "Overweight";
    bmiColor = "text-yellow-600";
  } else {
    bmiCategory = "Obese";
    bmiColor = "text-red-600";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mt-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user.name}! 👋
          </h2>
          <p className="text-gray-600">
            Let's continue your journey to a healthier lifestyle
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">Age</h3>
              <span className="text-2xl">🎂</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{user.age}</p>
            <p className="text-gray-500 text-sm mt-1">years old</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">Height</h3>
              <span className="text-2xl">📏</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{user.height}</p>
            <p className="text-gray-500 text-sm mt-1">centimeters</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">Weight</h3>
              <span className="text-2xl">⚖️</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{user.weight}</p>
            <p className="text-gray-500 text-sm mt-1">kilograms</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">Gender</h3>
              <span className="text-2xl">
                {user.gender === "male" ? "👨" : user.gender === "female" ? "👩" : "🧑"}
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-800 capitalize">{user.gender}</p>
          </div>
        </div>

        {/* BMI Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Your BMI</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-5xl font-bold text-gray-800 mb-2">{bmi}</p>
              <p className={`text-xl font-semibold ${bmiColor}`}>{bmiCategory}</p>
            </div>
            <div className="text-6xl">💪</div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              BMI is calculated as weight (kg) divided by height squared (m²)
            </p>
          </div>
        </div>

        {/* Medical Condition */}
        {user.medicalCondition && (
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Medical Condition</h3>
            <p className="text-blue-700">{user.medicalCondition}</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition">
            <div className="text-4xl mb-4">🥗</div>
            <h3 className="text-xl font-bold mb-2">Meal Plans</h3>
            <p className="text-green-100">View your personalized meal plans</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Track Progress</h3>
            <p className="text-blue-100">Monitor your diet and fitness goals</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold mb-2">Nutrition Tips</h3>
            <p className="text-purple-100">Get expert dietary advice</p>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
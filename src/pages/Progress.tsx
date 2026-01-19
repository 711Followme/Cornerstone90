import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Calendar, TrendingUp, Flame, Award, Target } from 'lucide-react';
import { getUserProgress } from '@/data/journeyData';
import { getCompletionHistory, getVision } from '@/data/disciplinesData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Progress = () => {
  const progress = getUserProgress();
  const vision = getVision();
  const history = getCompletionHistory(7);
  const progressPercentage = (progress.day / progress.duration) * 100;
  const daysRemaining = progress.duration - progress.day;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-green-600 bg-gradient-to-r from-green-50/50 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <TrendingUp className="text-green-600" size={32} />
            <div>
              <CardTitle className="text-3xl text-cornerstone-charcoal">Your Progress</CardTitle>
              <CardDescription className="text-base">Track your journey to transformation</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cornerstone-blue/10 rounded-lg">
                <Calendar className="text-cornerstone-blue" size={24} />
              </div>
              <div>
                <p className="text-sm text-cornerstone-stone">Current Day</p>
                <p className="text-3xl font-bold text-cornerstone-blue">{progress.day}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Award className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-cornerstone-stone">Days Completed</p>
                <p className="text-3xl font-bold text-green-600">{progress.daysCompleted}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cornerstone-gold/10 rounded-lg">
                <Flame className="text-cornerstone-gold" size={24} />
              </div>
              <div>
                <p className="text-sm text-cornerstone-stone">Current Streak</p>
                <p className="text-3xl font-bold text-cornerstone-gold">{progress.streak}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Target className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-cornerstone-stone">Days Remaining</p>
                <p className="text-3xl font-bold text-purple-600">{daysRemaining}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Journey Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-cornerstone-charcoal">Journey Progress</CardTitle>
          <CardDescription>Your path to rebuilding on the Rock</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-cornerstone-charcoal">Overall Progress</span>
                <span className="text-cornerstone-stone">{progressPercentage.toFixed(1)}%</span>
              </div>
              <ProgressBar value={progressPercentage} className="h-4" />
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-cornerstone-blue">{progress.day}</p>
                <p className="text-xs text-cornerstone-stone">Days In</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{progressPercentage.toFixed(0)}%</p>
                <p className="text-xs text-cornerstone-stone">Complete</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-cornerstone-gold">{daysRemaining}</p>
                <p className="text-xs text-cornerstone-stone">To Go</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Discipline Completion Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-cornerstone-charcoal">Last 7 Days - Discipline Completion</CardTitle>
          <CardDescription>Your consistency over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="rate" fill="#D97706" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Vision Reminder */}
      {vision && (
        <Card className="border-l-4 border-l-cornerstone-gold bg-gradient-to-r from-cornerstone-gold/5 to-transparent">
          <CardHeader>
            <CardTitle className="text-cornerstone-charcoal">Your Vision</CardTitle>
            <CardDescription>Remember why you started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-cornerstone-stone mb-1">YOUR WHY:</p>
              <p className="text-base text-cornerstone-charcoal italic">"{vision.why}"</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-cornerstone-stone mb-2">YOUR GOALS:</p>
              <ul className="space-y-1">
                {vision.goals.map((goal, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-cornerstone-charcoal">
                    <span className="text-cornerstone-gold">•</span>
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="text-cornerstone-charcoal">Milestones</CardTitle>
          <CardDescription>Celebrate your achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { day: 7, label: 'First Week Complete', achieved: progress.day >= 7 },
              { day: 14, label: 'Two Weeks Strong', achieved: progress.day >= 14 },
              { day: 30, label: 'One Month Milestone', achieved: progress.day >= 30 },
              { day: 45, label: 'Halfway There', achieved: progress.day >= 45 },
              { day: 60, label: 'Two Months In', achieved: progress.day >= 60 },
              { day: 75, label: 'Three Quarters Done', achieved: progress.day >= 75 },
              { day: 90, label: 'Journey Complete!', achieved: progress.day >= 90 },
            ].map((milestone) => (
              <div
                key={milestone.day}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  milestone.achieved
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  {milestone.achieved ? (
                    <Award className="text-green-600" size={24} />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                  )}
                  <div>
                    <p className={`font-semibold ${milestone.achieved ? 'text-green-800' : 'text-gray-600'}`}>
                      {milestone.label}
                    </p>
                    <p className="text-sm text-gray-500">Day {milestone.day}</p>
                  </div>
                </div>
                {milestone.achieved && (
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                    ACHIEVED
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Progress;

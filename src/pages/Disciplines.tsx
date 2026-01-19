import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { getTodayDisciplines, getTodayCompletion, markDisciplineComplete, getTodayCompletionRate } from '@/data/disciplinesData';
import { ListChecks, TrendingUp } from 'lucide-react';

const Disciplines = () => {
  const [disciplines, setDisciplines] = useState(getTodayDisciplines());
  const [completion, setCompletion] = useState(getTodayCompletion());
  const [completionRate, setCompletionRate] = useState(getTodayCompletionRate());

  const handleToggle = (disciplineId: string, checked: boolean) => {
    markDisciplineComplete(disciplineId, checked);
    setCompletion(getTodayCompletion());
    setCompletionRate(getTodayCompletionRate());
  };

  const categoryColors: Record<string, string> = {
    spiritual: 'border-l-cornerstone-blue',
    physical: 'border-l-cornerstone-gold',
    mental: 'border-l-purple-500',
    relational: 'border-l-green-500'
  };

  const categoryBgColors: Record<string, string> = {
    spiritual: 'bg-cornerstone-blue/10',
    physical: 'bg-cornerstone-gold/10',
    mental: 'bg-purple-50',
    relational: 'bg-green-50'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-cornerstone-blue bg-gradient-to-r from-cornerstone-blue/5 to-transparent">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <ListChecks className="text-cornerstone-blue" size={32} />
                <div>
                  <CardTitle className="text-3xl text-cornerstone-charcoal">Daily Disciplines</CardTitle>
                  <CardDescription className="text-base">Build your life one habit at a time</CardDescription>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-5xl font-bold text-cornerstone-blue">{completionRate}%</p>
              <p className="text-sm text-cornerstone-stone">Complete</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cornerstone-charcoal">
            <TrendingUp className="text-green-600" size={24} />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={completionRate} className="h-3" />
            <p className="text-sm text-cornerstone-stone">
              {Object.values(completion).filter(Boolean).length} of {disciplines.length} disciplines completed
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Disciplines by Category */}
      {['spiritual', 'physical', 'mental', 'relational'].map((category) => {
        const categoryDisciplines = disciplines.filter(d => d.category === category);
        if (categoryDisciplines.length === 0) return null;

        return (
          <Card key={category} className={`border-l-4 ${categoryColors[category]}`}>
            <CardHeader className={categoryBgColors[category]}>
              <CardTitle className="text-lg capitalize text-cornerstone-charcoal">
                {category} Disciplines
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {categoryDisciplines.map((discipline) => (
                  <div
                    key={discipline.id}
                    className="flex items-start gap-4 p-4 bg-white border border-cornerstone-stone/10 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <Checkbox
                      id={discipline.id}
                      checked={completion[discipline.id] || false}
                      onCheckedChange={(checked) => handleToggle(discipline.id, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={discipline.id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <span className="text-2xl">{discipline.icon}</span>
                        <div>
                          <h4 className={`font-semibold ${completion[discipline.id] ? 'line-through text-cornerstone-stone' : 'text-cornerstone-charcoal'}`}>
                            {discipline.name}
                          </h4>
                          <p className="text-sm text-cornerstone-stone">{discipline.description}</p>
                        </div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Motivational Footer */}
      <Card className="bg-gradient-to-br from-cornerstone-gold/10 to-cornerstone-gold/5 border-2 border-cornerstone-gold/20">
        <CardContent className="p-6 text-center">
          <p className="text-lg font-semibold text-cornerstone-charcoal mb-2">
            {completionRate === 100
              ? "Outstanding! All disciplines complete today. 🏛️"
              : completionRate >= 75
              ? "Excellent progress! Keep building on the Rock."
              : completionRate >= 50
              ? "You're halfway there. Finish strong!"
              : "Every step forward is progress. Keep going!"}
          </p>
          <p className="text-sm text-cornerstone-stone">
            "Discipline is the bridge between goals and accomplishment."
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Disciplines;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Target, Plus, X } from 'lucide-react';
import { saveVision } from '@/data/disciplinesData';
import { useToast } from '@/hooks/use-toast';

const VisionSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [why, setWhy] = useState('');
  const [who, setWho] = useState('');
  const [goals, setGoals] = useState<string[]>(['', '', '']);
  const [obstacles, setObstacles] = useState<string[]>(['', '']);
  const [commitment, setCommitment] = useState('');

  const handleGoalChange = (index: number, value: string) => {
    const newGoals = [...goals];
    newGoals[index] = value;
    setGoals(newGoals);
  };

  const addGoal = () => {
    setGoals([...goals, '']);
  };

  const removeGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const handleObstacleChange = (index: number, value: string) => {
    const newObstacles = [...obstacles];
    newObstacles[index] = value;
    setObstacles(newObstacles);
  };

  const addObstacle = () => {
    setObstacles([...obstacles, '']);
  };

  const removeObstacle = (index: number) => {
    setObstacles(obstacles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!why.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your 'why' - your deeper motivation.",
        variant: "destructive"
      });
      return;
    }

    const filteredGoals = goals.filter(g => g.trim());
    if (filteredGoals.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please enter at least one goal.",
        variant: "destructive"
      });
      return;
    }

    saveVision({
      why: why.trim(),
      who: who.trim(),
      goals: filteredGoals.map(g => g.trim()),
      obstacles: obstacles.filter(o => o.trim()).map(o => o.trim()),
      commitment: commitment.trim()
    });

    toast({
      title: "Vision Set! 🎯",
      description: "Your vision has been saved. Let's build on the Rock!",
    });

    navigate('/');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card className="border-l-4 border-l-cornerstone-gold bg-gradient-to-r from-cornerstone-gold/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Target className="text-cornerstone-gold" size={32} />
            <div>
              <CardTitle className="text-3xl text-cornerstone-charcoal">Set Your Vision</CardTitle>
              <CardDescription className="text-base">
                Before you build, know why you're building
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Why */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-cornerstone-charcoal">What's Your WHY?</CardTitle>
            <CardDescription>
              Your deeper motivation. Not just "get fit" but "be healthy for my kids" or "honor God with my body"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              placeholder="I'm doing this because..."
              className="min-h-[120px]"
              required
            />
          </CardContent>
        </Card>

        {/* Who */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-cornerstone-charcoal">Who Are You Becoming?</CardTitle>
            <CardDescription>
              Describe the man you want to be at the end of these 90 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={who}
              onChange={(e) => setWho(e.target.value)}
              placeholder="In 90 days, I will be a man who..."
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        {/* Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-cornerstone-charcoal">Your Goals</CardTitle>
            <CardDescription>
              Specific, measurable outcomes you want to achieve
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {goals.map((goal, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={goal}
                  onChange={(e) => handleGoalChange(index, e.target.value)}
                  placeholder={`Goal ${index + 1}`}
                  className="flex-1"
                />
                {goals.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeGoal(index)}
                  >
                    <X size={20} />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addGoal}
              className="w-full"
            >
              <Plus size={16} className="mr-2" />
              Add Another Goal
            </Button>
          </CardContent>
        </Card>

        {/* Obstacles */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-cornerstone-charcoal">Expected Obstacles</CardTitle>
            <CardDescription>
              What might try to stop you? Plan ahead.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {obstacles.map((obstacle, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={obstacle}
                  onChange={(e) => handleObstacleChange(index, e.target.value)}
                  placeholder={`Obstacle ${index + 1}`}
                  className="flex-1"
                />
                {obstacles.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeObstacle(index)}
                  >
                    <X size={20} />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addObstacle}
              className="w-full"
            >
              <Plus size={16} className="mr-2" />
              Add Another Obstacle
            </Button>
          </CardContent>
        </Card>

        {/* Commitment */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-cornerstone-charcoal">Your Commitment</CardTitle>
            <CardDescription>
              Write your commitment statement. Make it personal and powerful.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={commitment}
              onChange={(e) => setCommitment(e.target.value)}
              placeholder="I commit to..."
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            className="bg-cornerstone-gold hover:bg-cornerstone-gold-dark px-12"
          >
            <Target className="mr-2" size={20} />
            Set My Vision
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VisionSetup;

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, MessageCircle, Shield } from 'lucide-react';
import BrotherhoodChat from '@/components/BrotherhoodChat';
import { profileService } from '@/services/profileService';
import { Profile } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const Brotherhood: React.FC = () => {
  const [members, setMembers] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const profiles = await profileService.getAllProfiles();
      console.log('Loaded member profiles:', profiles);
      setMembers(profiles);
    } catch (error) {
      console.error('Error loading members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-l-4 border-l-cornerstone-blue bg-gradient-to-r from-cornerstone-blue/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Users className="text-cornerstone-blue" size={28} />
            Band of Brothers
          </CardTitle>
          <CardDescription className="text-base">
            Iron sharpens iron, and one man sharpens another. - Proverbs 27:17
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Members List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="text-cornerstone-gold" size={20} />
                Brothers in the Alliance
              </CardTitle>
              <CardDescription>
                {members.length} {members.length === 1 ? 'member' : 'members'} on this journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 bg-gray-100 animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : members.length === 0 ? (
                <div className="text-center py-8 text-cornerstone-stone">
                  <p className="text-sm">No members yet.</p>
                  <p className="text-xs mt-2">
                    {profile ? 'Be the first to chat!' : 'Complete your profile to join.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-cornerstone-blue text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {member.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-cornerstone-charcoal truncate">
                          {member.name}
                        </p>
                        <p className="text-xs text-cornerstone-stone">
                          Joined {new Date(member.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <BrotherhoodChat />
          </Card>
        </div>
      </div>

      {/* Values Card */}
      <Card className="border-l-4 border-l-cornerstone-gold">
        <CardHeader>
          <CardTitle className="text-lg">Alliance Code of Conduct</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-cornerstone-stone">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-cornerstone-blue rounded-full mt-2 flex-shrink-0" />
              <p><strong>Honor:</strong> Speak truth in love, no gossip or slander</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-cornerstone-blue rounded-full mt-2 flex-shrink-0" />
              <p><strong>Encouragement:</strong> Build each other up, never tear down</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-cornerstone-blue rounded-full mt-2 flex-shrink-0" />
              <p><strong>Confidentiality:</strong> What's shared here, stays here</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-cornerstone-blue rounded-full mt-2 flex-shrink-0" />
              <p><strong>Accountability:</strong> Challenge each other in grace</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Brotherhood;

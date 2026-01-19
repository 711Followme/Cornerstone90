import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, BellOff, CheckCircle2, AlertCircle, TestTube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import notificationService from '@/services/notificationService';

const NotificationSettings = () => {
  const { toast } = useToast();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    checkNotificationStatus();
  }, []);

  const checkNotificationStatus = () => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
      setIsEnabled(Notification.permission === 'granted');
    }
  };

  const handleEnableNotifications = async () => {
    setIsInitializing(true);

    try {
      // Initialize service
      const initialized = await notificationService.initialize();
      if (!initialized) {
        toast({
          title: "Notifications not supported",
          description: "Your browser doesn't support push notifications.",
          variant: "destructive"
        });
        setIsInitializing(false);
        return;
      }

      // Request permission
      const permitted = await notificationService.requestPermission();
      if (!permitted) {
        toast({
          title: "Permission denied",
          description: "Please enable notifications in your browser settings.",
          variant: "destructive"
        });
        setIsInitializing(false);
        return;
      }

      // Subscribe to push
      await notificationService.subscribeToPush();

      // Start scheduled notifications
      notificationService.startScheduledNotifications();

      setIsEnabled(true);
      setPermission('granted');

      toast({
        title: "Notifications enabled! 🎉",
        description: "You'll receive daily reminders at 5 AM (reading) and 6 PM (workout) Central Time.",
      });
    } catch (error) {
      console.error('Error enabling notifications:', error);
      toast({
        title: "Setup failed",
        description: "Could not enable notifications. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsInitializing(false);
    }
  };

  const handleDisableNotifications = () => {
    notificationService.stopScheduledNotifications();
    setIsEnabled(false);
    
    toast({
      title: "Notifications disabled",
      description: "You won't receive daily reminders.",
    });
  };

  const handleTestReading = async () => {
    if (!isEnabled) {
      toast({
        title: "Enable notifications first",
        description: "Turn on notifications to test them.",
        variant: "destructive"
      });
      return;
    }

    await notificationService.sendTestNotification('reading');
    toast({
      title: "Test notification sent!",
      description: "Check for the daily reading notification.",
    });
  };

  const handleTestWorkout = async () => {
    if (!isEnabled) {
      toast({
        title: "Enable notifications first",
        description: "Turn on notifications to test them.",
        variant: "destructive"
      });
      return;
    }

    await notificationService.sendTestNotification('workout');
    toast({
      title: "Test notification sent!",
      description: "Check for the workout reminder notification.",
    });
  };

  const getPermissionMessage = () => {
    switch (permission) {
      case 'granted':
        return {
          icon: <CheckCircle2 className="text-green-600" size={20} />,
          text: "Notifications enabled",
          color: "text-green-600"
        };
      case 'denied':
        return {
          icon: <AlertCircle className="text-red-600" size={20} />,
          text: "Notifications blocked - enable in browser settings",
          color: "text-red-600"
        };
      default:
        return {
          icon: <BellOff className="text-cornerstone-stone" size={20} />,
          text: "Notifications not enabled",
          color: "text-cornerstone-stone"
        };
    }
  };

  const permissionStatus = getPermissionMessage();

  return (
    <Card className="border-2 border-cornerstone-blue/20 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cornerstone-blue/10 rounded-lg">
              <Bell className="text-cornerstone-blue" size={24} />
            </div>
            <div>
              <CardTitle className="text-cornerstone-charcoal">Push Notifications</CardTitle>
              <CardDescription className="text-cornerstone-stone">
                Daily reminders for readings and workouts
              </CardDescription>
            </div>
          </div>
          <Switch
            checked={isEnabled}
            onCheckedChange={(checked) => {
              if (checked) {
                handleEnableNotifications();
              } else {
                handleDisableNotifications();
              }
            }}
            disabled={isInitializing || permission === 'denied'}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status */}
        <div className="flex items-center gap-2">
          {permissionStatus.icon}
          <span className={`text-sm font-medium ${permissionStatus.color}`}>
            {permissionStatus.text}
          </span>
        </div>

        {/* Schedule Info */}
        {isEnabled && (
          <div className="bg-cornerstone-blue/5 p-4 rounded-lg border border-cornerstone-blue/20">
            <p className="text-sm font-semibold text-cornerstone-charcoal mb-2">
              Notification Schedule (Central Time):
            </p>
            <ul className="text-sm space-y-1 text-cornerstone-stone">
              <li>📖 <strong>5:00 AM</strong> - Daily Scripture reading reminder</li>
              <li>💪 <strong>6:00 PM</strong> - Daily workout reminder</li>
            </ul>
          </div>
        )}

        {/* Test Buttons */}
        {isEnabled && (
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-cornerstone-charcoal">Test Notifications:</Label>
            <div className="flex gap-2">
              <Button
                onClick={handleTestReading}
                variant="outline"
                size="sm"
                className="flex-1 border-cornerstone-blue/30 hover:bg-cornerstone-blue/5"
              >
                <TestTube className="mr-2" size={16} />
                Test Reading
              </Button>
              <Button
                onClick={handleTestWorkout}
                variant="outline"
                size="sm"
                className="flex-1 border-cornerstone-gold/30 hover:bg-cornerstone-gold/5"
              >
                <TestTube className="mr-2" size={16} />
                Test Workout
              </Button>
            </div>
          </div>
        )}

        {/* Help Text */}
        {permission === 'denied' && (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-sm text-red-700">
              <strong>Notifications are blocked.</strong> To enable them:
            </p>
            <ol className="text-xs text-red-600 mt-2 ml-4 list-decimal space-y-1">
              <li>Click the lock icon in your browser's address bar</li>
              <li>Find "Notifications" in the permissions list</li>
              <li>Change it from "Block" to "Allow"</li>
              <li>Refresh this page</li>
            </ol>
          </div>
        )}

        {!isEnabled && permission !== 'denied' && (
          <p className="text-xs text-cornerstone-stone">
            Enable notifications to receive daily reminders for your Scripture reading and workout. 
            You can disable them at any time.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;

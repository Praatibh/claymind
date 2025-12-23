import { motion } from "motion/react";
import { Shield, Clock, Star, Brain, TrendingUp } from "lucide-react";
import { Card3D } from "../../../app/components/3d-card";

export function ParentDashboard() {
  const childStats = {
    name: "Alex",
    level: 8,
    totalTime: "24 hours",
    lessonsCompleted: 24,
    projectsCreated: 8,
    badgesEarned: 12,
  };

  const weeklyActivity = [
    { day: "Mon", hours: 1.5 },
    { day: "Tue", hours: 2 },
    { day: "Wed", hours: 1 },
    { day: "Thu", hours: 2.5 },
    { day: "Fri", hours: 1.5 },
    { day: "Sat", hours: 3 },
    { day: "Sun", hours: 2 },
  ];

  const maxHours = Math.max(...weeklyActivity.map(d => d.hours));

  const skillsProgress = [
    { skill: "AI Fundamentals", progress: 85, color: "purple" },
    { skill: "App Development", progress: 60, color: "blue" },
    { skill: "Creative AI Tools", progress: 45, color: "pink" },
    { skill: "Critical Thinking", progress: 70, color: "amber" },
  ];

  const recentActivity = [
    { action: "Completed lesson: Creating a Chatbot", time: "2 hours ago" },
    { action: "Earned badge: AI Explorer", time: "1 day ago" },
    { action: "Created project: My First Chatbot", time: "2 days ago" },
    { action: "Started module: Build an App with AI", time: "3 days ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Parent Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Track {childStats.name}'s learning journey
          </p>
        </motion.div>

        {/* Overview Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Current Level", value: childStats.level, icon: <Star className="w-6 h-6" />, color: "purple" },
            { label: "Total Time", value: childStats.totalTime, icon: <Clock className="w-6 h-6" />, color: "blue" },
            { label: "Lessons Done", value: childStats.lessonsCompleted, icon: <Brain className="w-6 h-6" />, color: "amber" },
            { label: "Projects", value: childStats.projectsCreated, icon: <TrendingUp className="w-6 h-6" />, color: "pink" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card3D variant="default">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${stat.color}-400 to-${stat.color}-500 flex items-center justify-center text-white`}>
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Weekly Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card3D variant="default" hover={false}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Activity</h2>
              
              <div className="space-y-4">
                <div className="flex items-end justify-between gap-2 h-48">
                  {weeklyActivity.map((day, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <motion.div
                        className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg"
                        initial={{ height: 0 }}
                        animate={{ height: `${(day.hours / maxHours) * 100}%` }}
                        transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                      />
                      <span className="text-sm text-gray-600">{day.day}</span>
                      <span className="text-xs text-gray-500">{day.hours}h</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>Average:</strong> 2 hours per day this week
                  </p>
                </div>
              </div>
            </Card3D>
          </motion.div>

          {/* Skills Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card3D variant="default" hover={false}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills Progress</h2>
              
              <div className="space-y-6">
                {skillsProgress.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">{skill.skill}</span>
                      <span className="text-gray-600">{skill.progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r from-${skill.color}-400 to-${skill.color}-500 rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.progress}%` }}
                        transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card3D>
          </motion.div>
        </div>

        {/* Recent Activity & Safety */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card3D variant="default" hover={false}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card3D>
          </motion.div>

          {/* Safety Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card3D variant="accent" hover={false}>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Safety</h2>
                </div>

                <div className="space-y-4 text-white/90">
                  <div className="flex items-center justify-between pb-3 border-b border-white/20">
                    <span>Content Filter</span>
                    <span className="text-green-300">✓ Active</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/20">
                    <span>Time Limits</span>
                    <span className="text-green-300">✓ Set</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/20">
                    <span>Activity Monitoring</span>
                    <span className="text-green-300">✓ On</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Safe Mode</span>
                    <span className="text-green-300">✓ Enabled</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <p className="text-sm text-white/80">
                    All safety features are active. Your child is learning in a secure environment.
                  </p>
                </div>
              </div>
            </Card3D>
          </motion.div>
        </div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card3D variant="gradient" hover={false}>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                {childStats.name} is Making Great Progress! 🌟
              </h3>
              <p className="text-white/90 text-lg">
                Consistent learning and active engagement with AI concepts. Keep encouraging their curiosity!
              </p>
            </div>
          </Card3D>
        </motion.div>
      </div>
    </div>
  );
}

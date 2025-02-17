
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <Button asChild size="lg">
          <Link to="/study_activities" className="flex items-center gap-2">
            Start Studying
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 glass hover-scale">
          <h3 className="text-sm font-medium text-muted-foreground">
            Success Rate
          </h3>
          <p className="text-2xl font-bold">80%</p>
        </Card>
        <Card className="p-6 glass hover-scale">
          <h3 className="text-sm font-medium text-muted-foreground">
            Study Sessions
          </h3>
          <p className="text-2xl font-bold">4</p>
        </Card>
        <Card className="p-6 glass hover-scale">
          <h3 className="text-sm font-medium text-muted-foreground">
            Active Groups
          </h3>
          <p className="text-2xl font-bold">3</p>
        </Card>
        <Card className="p-6 glass hover-scale">
          <h3 className="text-sm font-medium text-muted-foreground">
            Study Streak
          </h3>
          <p className="text-2xl font-bold">4 days</p>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 glass">
          <h2 className="text-lg font-semibold mb-4">Last Study Session</h2>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Activity: Basic Vocabulary
            </p>
            <p className="text-sm text-muted-foreground">Time: 2 hours ago</p>
            <p className="text-sm">
              Score: <span className="text-green-600">8</span> correct,{" "}
              <span className="text-red-600">2</span> wrong
            </p>
          </div>
        </Card>

        <Card className="p-6 glass">
          <h2 className="text-lg font-semibold mb-4">Study Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Total Words Studied</span>
                <span>3/124</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: "2%" }}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Current Mastery: <span className="font-medium">2%</span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;

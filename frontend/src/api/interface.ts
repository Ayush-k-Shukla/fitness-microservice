export interface IActivityRequest extends IBaseActivity {
  userId?: string;
}

export interface IActivityResponse extends IActivityRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRecommendation {
  id: string;
  activityId: string;
  userId: string;
  activityType: string;
  recommendation: string;
  improvements: string[];
  suggestions: string[];
  safety: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IBaseActivity {
  activityType: string;
  duration?: number;
  caloriesBurned?: number;
  startedAt?: string;
  additionalMetrics?: Map<string, string>;
}

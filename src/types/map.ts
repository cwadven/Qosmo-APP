export interface Map {
  id: number;
  name: string;
  description: string;
  icon_image: string;
  background_image: string;
  subscriber_count: number;
  view_count: number;
  is_subscribed: boolean;
  created_by: {
    id: number;
    nickname: string;
  };
  created_at: string;
  updated_at: string;
  progress?: {
    percentage: number;
    completed_node_count: number;
    total_node_count: number;
    recent_activated_nodes: {
      id: number;
      name: string;
      activated_at: string;
      map_play_title: string;
    }[];
  };
  total_node_count: number;
}

export interface MapListResponse {
  maps: Map[];
  next_cursor: string | null;
  has_more: boolean;
}

export interface MapGraphMeta {
  id: number;
  title: string;
  description: string;
  stats: {
    total_nodes: number;
    completed_nodes: number;
    learning_period: {
      start_date: string;
      days: number;
    } | null;
    total_questions: number;
    solved_questions: number;
  };
  layout: {
    min_x: number;
    max_x: number;
    min_y: number;
    max_y: number;
    grid_size: number;
  };
  theme: {
    background_color: string;
    grid_color: string;
    node: {
      completed: NodeTheme;
      in_progress: NodeTheme;
      locked: NodeTheme;
    };
    arrow: {
      completed: string;
      in_progress: string;
      locked: string;
    };
  };
  version: string;
  map_play_title?: string;
}

interface NodeTheme {
  background: string;
  border: string;
  text: string;
  icon: string;
}

export interface MapPlayMember {
  id: number;
  title: string;
  role: 'participant' | 'admin';
  joined_at: string;
  completed_node_count: number;
  recent_activated_nodes: Array<{
    node_id: number;
    node_name: string;
    activated_at: string;
  }>;
}

export interface MapPlayMembersResponse {
  status_code: string;
  data: {
    plays: MapPlayMember[];
  };
}

interface JoinPlayResponse {
  status_code: string;
  data: {
    id: number;
    map_play_id: number;
    member_id: number;
    role: string;
    deactivated: boolean;
    deactivated_reason: string;
    created_at: string;
    updated_at: string;
  };
}

export interface Item {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemInput {
  title: string;
  description?: string | null;
}

export interface UpdateItemInput {
  title?: string;
  description?: string | null;
}

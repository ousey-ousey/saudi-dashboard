// Common types and interfaces for the application

export const NavigationItem = {
  id: String,
  label: String,
  icon: String,
  path: String,
  children: Array,
};

export const Project = {
  id: String,
  name: String,
  status: String,
  progress: Number,
  startDate: Date,
  endDate: Date,
  budget: Number,
};

export const User = {
  id: String,
  name: String,
  email: String,
  role: String,
  avatar: String,
  isActive: Boolean,
};

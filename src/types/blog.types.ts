export interface Blog {
  _id: string;
  blogTitle: string;
  blogShortDesc: string;
  blogDescription: string;
  blogImage: string;
  blogTags: string[];
  // Using Date for objects, or string if it's raw JSON from an API
  createdAt: Date | string;
  updatedAt: Date | string;
}

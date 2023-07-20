export type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  authorId: string;
};

export type MyAllNotesResponse = {
  status: 'Success';
  results: number;
  notes: Note[];
};
